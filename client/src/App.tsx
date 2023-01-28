import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./App.css";
import Biocaptcha from "./components/biocaptcha/Biocaptcha";

function App() {
  return (
    <div>
      <Biocaptcha />
    </div>
  );
}

export default App;
