import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./App.css";
import Biocaptcha from "./components/biocaptcha/Biocaptcha";

fetch("http://localhost:8000/hello")
.then(res => res.json())
.then(data => console.log(data));

function App() {
  return (
    <div>
      <Biocaptcha />
    </div>
  );
}

export default App;
