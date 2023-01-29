import { Tab } from "@headlessui/react";
import "./App.scss";
import React from "react";

var terminalTyping = "";

async function toDataUrl(url: string, callback: (dataUrl: string) => void) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    let reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result as string);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

function App() {
  const handleOnClick = () => {
    let url1 = "";
    let url2 = "";
    let url3 = "";

    toDataUrl(
      "http://localhost:3001/attack1-1.jpg",
      function (dataUrl: string) {
        url1 = dataUrl;
        toDataUrl(
          "http://localhost:3001/attack1-2.jpg",
          function (dataUrl: string) {
            url2 = dataUrl;
            toDataUrl(
              "http://localhost:3001/attack1-3.jpg",
              function (dataUrl: string) {
                url3 = dataUrl;

                submitImages([url1, url2, url3]);
              }
            )
          }
        );
      }
    );
  };

  const handleAttack2 = () => {
    var terminal = document.getElementById("terminal");
    if (terminal)
      terminal.innerHTML = "";
    terminalTyping = "const theRockImage = \"data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/..."+
    "\n// (full base64 image data not shown here)\nfetch(\"http://localhost:8000/secret\", {method: 'POST', body: JSON.stringify({image0:"+
    " theRockImage, image1: theRockImage, image2: theRockImage})})\n.then((data) => data.json()).then((data) => console.log(data));" +
    "\n\f\n{message: 'You are a verified human! Now you get to see the secret message. Here it is: \"I love Hack at Brown!\"', title: 'Congratulations! You Are Not a Robot!'}"+
    "\n// Eve is able to get a response with this request. However, what happens if she tries again?\n"+
    "fetch(\"http://localhost:8000/secret\", {method: 'POST', body: JSON.stringify({image0: theRockImage, image1: theRockImage, image2: theRockImage})})"+
    "\n.then((data) =>  data.json()).then((data) => console.log(data));\n\f\n"+
    "{message: \"Since you are not verified, you can't see the secret message.\", title: 'Oh no! You are not a verified human!'}"+
    "\n/* Although Eve is able to get a response with this request, she is not able to get the secret message.\nThis is because the server"+
    " stored the image of the Rock in a temporary database, and checked if the images that Eve sent are the same as the images in the database. */";
    updateTerminal();
  }

  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    terminalTyping = "";
    var terminal = document.getElementById("terminal");
    if (terminal)
      terminal.innerHTML = "";
  })

  function errorText(err: Error) {
    return err.name + ": " + err.message;
  }

  function submitImages(images: string[]) {
    var url = "http://localhost:8000/secret";
    terminalTyping = "";
    const options = {
      method: "POST",
      body: JSON.stringify({
        image0: images[0],
        image1: images[1],
        image2: images[2],
      }),
    };
    terminalTyping =
      'var url = "http://localhost:8000/secret";\nconst options = {\n\tmethod: "POST",\n\tbody: JSON.stringify({' +
      "\n\t\timage0: images[0],\n\t\timage1: images[1],\n\t\timage2: images[2]\n\t})\n};\nfetch(url, options)"+
      ".then((res) => res.json()).then((data) => console.log(data));\n\f\n";
    fetch(url, options)
      .then((data) => data.json())
      .then((data) => {
        terminalTyping += data.toString();
        updateTerminal();
      })
      .catch((err) => {
        terminalTyping +=
          err.name == "TypeError"
            ? "Error: Access to fetch at 'http://localhost:8000/secret' from origin 'http://localhost:3001'" +
              " has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.\n"
            : errorText(err) + "\n";
        updateTerminal();
      });
  }

  function updateTerminal() {
    var terminal = document.getElementById("terminal");
    let delay = 0;
    for (let i = 0; i < terminalTyping.length; i++) {
      setTimeout(() => {
        if (terminal)
          terminal.innerHTML = renderText(terminalTyping.slice(0, i + 1));
      }, 25 * delay);
      if (terminalTyping[i] === "\f") delay += 10;
      delay += 0.7 + Math.random() * 0.6;
    }
  }

  function renderText(text: string) {
    return text
      .replaceAll("\n", "<br />")
      .replaceAll("\t", "&nbsp;&nbsp;&nbsp;&nbsp;");
  }

  return (
    <div className="app">
      <div className="page-content">
        <h1>Evil Eve</h1>
        <p>This is an attempted hacker's viewpoint...</p>
        <Tab.Group>
          <Tab.List>
            <Tab className={`tab-btn ${tab == 0 ? "selected": ""}`} onClick={() => setTab(0)}>Attack #1</Tab>
            <Tab className={`tab-btn ${tab == 1 ? "selected": ""}`} onClick={() => setTab(1)}>Attack #2</Tab>
          </Tab.List>

          <Tab.Panels className="tab-panels">
            <Tab.Panel>
              <h4>
                Attack 1 - Automatically sending a series of images to the backend
              </h4>
              <div className="rock-container">
                <div className="attack1-img-container">
                  <img src="./attack1-1.jpg" className="attack1-img" />
                  <img src="./attack1-2.jpg" className="attack1-img" />
                  <img src="./attack1-3.jpg" className="attack1-img" />
                </div>

                <button className="submit-btn" onClick={handleOnClick}>
                  Submit images!
                </button>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <h4>Attack 2 - Using inspect element to send malicious JavaScript injections through Alice's website</h4>
              <div className="rock-container">
                <div className="attack1-img-container">
                  <img src="./attack1-2.jpg" className="attack1-img" />
                </div>

                <button className="submit-btn" onClick={handleAttack2}>
                  Submit image!
                </button>
              </div>

            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <br />
        <div className="terminal" id="terminal"></div>
      </div>
    </div>
  );
}

export default App;
