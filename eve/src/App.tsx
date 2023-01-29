import { Tab } from "@headlessui/react";
import "./App.scss";

function App() {
  const handleOnClick = () => {
    let fileReader = new FileReader();
  };

  return (
    <div className="app">
      <div className="page-content">
        <p>This is an attempted hacker's viewpoint...</p>
        <Tab.Group>
          <Tab.List>
            <Tab className="tab-btn">Attack #1</Tab>
            <Tab className="tab-btn">Attack #2</Tab>
          </Tab.List>

          <Tab.Panels style={{ border: "1px green solid", marginTop: "-1px" }}>
            <Tab.Panel>
              <h4>
                Attack 1 - Automatically sending a series of images to the
                backend
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
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
            <Tab.Panel>Content 2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default App;
