import { Button, Card, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { Box } from "@mui/system";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

import "./Biocaptcha.scss";

const videoConstraints = {
  width: 288,
  height: 162,
  facingMode: "user",
};

var imagesCaptured: string[] = [];
const NUM_IMAGES = 3;

interface BiocaptchaProps {
  sendDataUrl: string;
  onDataReceived: (data: any) => void;
}

export default function Biocaptcha(props: BiocaptchaProps) {
  //const [img, setImg] = useState<string | null>(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleImageCapture = (imageSrc: string) => {
    //setImg(imageSrc);
    imagesCaptured.push(imageSrc);
    if (imagesCaptured.length >= NUM_IMAGES) {
      var url = props.sendDataUrl;
      /* for (let i = 0; i < imagesCaptured.length; i++) {
        url += i == 0 ? "?" : "&";
        url += "image" + i + "=" + imagesCaptured[i];
      } */
      const options = {
        method: "POST",
        body: JSON.stringify({
          image0: imagesCaptured[0],
          image1: imagesCaptured[1],
          image2: imagesCaptured[2],
        }),
        /* headers: {
          'Content-Type': 'text/plain'
        } */
      };
      imagesCaptured = [];
      fetch(url, options)
        .then((data) => data.json())
        .then((data) => props.onDataReceived(data));

      fetch("http://localhost:8000/hello")
        .then((data) => data.json())
        .then((data) => console.log(data));
    }
  };

  const capture = useCallback(() => {
    function runner(repeats = NUM_IMAGES) {
      if (repeats > 0) {
        const imageSrc = webcamRef.current!.getScreenshot();
        handleImageCapture(imageSrc!);
        setTimeout(() => runner(repeats - 1), 500);
      }
    }

    if (webcamRef.current) {
      runner();
    }
  }, [webcamRef]);

  const renderWebcam = () => {
    if (webcamEnabled) {
      return (
        <>
          <Webcam
            audio={false}
            height="100%"
            width="100%"
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            ref={webcamRef}
            mirrored={true}
            className="biocaptcha-webcam-container"
          />
          <Box>
            <Button
              variant="outlined"
              onClick={() => setWebcamEnabled(false)}
              className="biocaptcha-capture-btn"
            >
              <Typography>Cancel</Typography>
            </Button>
            <Button
              variant="contained"
              onClick={capture}
              className="biocaptcha-capture-btn"
            >
              <Typography>Take Photo!</Typography>
            </Button>
          </Box>
        </>
      );
    } else {
      return (
        <Button
          onClick={() => setWebcamEnabled(!webcamEnabled)}
          variant="contained"
          sx={{ marginTop: "1rem" }}
        >
          Open Webcam
        </Button>
      );
    }
  };

  return (
    <Card className="biocaptcha-container">
      <Typography variant="h5">bioCAPTCHA</Typography>
      <Typography variant="body1">
        Please verify that you are a human by taking a selfie.
      </Typography>
      {renderWebcam()}
    </Card>
  );
}
