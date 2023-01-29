import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./App.css";
import Biocaptcha from "./components/biocaptcha/Biocaptcha";

interface AppData {
  title: string,
  message: string
}

function App() {
  const getData = (data : AppData) => {
    console.log(data);
    console.log(data.title);
  }

  return (
    <div>
      <Biocaptcha sendDataUrl='http://localhost:8000/secret' onDataReceived={getData} />
    </div>
  );
}

export default App;
