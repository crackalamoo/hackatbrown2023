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
  const [img, setImg] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleImageCapture = (imageSrc: string) => {
    console.log(imageSrc);
    setImg(imageSrc);
    imagesCaptured.push(imageSrc);
    if (imagesCaptured.length == NUM_IMAGES) {
      var url = props.sendDataUrl;
      for (let i = 0; i < imagesCaptured.length; i++) {
        url += i == 0 ? "?" : "&";
        url += "image" + i + "=" + imagesCaptured[i];
      }
      imagesCaptured = [];
      fetch(url).then(data => data.json()).then(data => props.onDataReceived(data));
      
      fetch('http://localhost:8000/hello').then(data => data.json()).then(data => console.log(data));
    }
  };

  const capture = useCallback(() => {
    function runner(repeats = NUM_IMAGES) {
      if (repeats > 0) {
        const imageSrc = webcamRef.current!.getScreenshot();
        handleImageCapture(imageSrc!);
        setTimeout(() => runner(repeats - 1), 500);
      } else {
        console.warn("done...");
      }
    }

    if (webcamRef.current) {
      runner();
    }
  }, [webcamRef]);

  return (
    <div>
      {/* {img === null ? (
        <>
          <Webcam
            audio={false}
            height={400}
            screenshotFormat="image/jpeg"
            width={400}
            videoConstraints={videoConstraints}
            ref={webcamRef}
          />
          <button onClick={capture}>Capture Photo</button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" />
          <button onClick={() => setImg(null)}>Retake</button>
        </>
      )} */}
      <div className="biocaptcha-container">
        <Webcam
          audio={false}
          height="100%"
          width="100%"
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          ref={webcamRef}
        />
        <button onClick={capture}>Capture Photo</button>
      </div>
    </div>
  );
}
