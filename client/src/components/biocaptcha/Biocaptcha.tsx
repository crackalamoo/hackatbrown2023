import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

import "./Biocaptcha.scss";

const videoConstraints = {
  width: 288,
  height: 162,
  facingMode: "user",
};

export default function Biocaptcha() {
  const [img, setImg] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleImageCapture = (imageSrc: string) => {
    console.log(imageSrc);
    setImg(imageSrc);
  };

  const capture = useCallback(() => {
    function runner(repeats = 3) {
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
