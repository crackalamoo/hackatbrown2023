import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./App.css";
import Biocaptcha from "./components/biocaptcha/Biocaptcha";

fetch("http://localhost:8000/hello")
.then(res => res.json())
.then(data => console.log(data));

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
      <Biocaptcha onDataReceived={getData} />
    </div>
  );
}

export default App;
