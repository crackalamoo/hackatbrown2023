import React, { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((err) => console.error("error:", err));
  };

  const paintToCanvas = () => {
    let video = videoRef.current;
  };

  return (
    <div>
      <button>Take a photo</button>
      <video ref={videoRef} />
    </div>
  );
}

export default App;
