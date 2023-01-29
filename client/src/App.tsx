import { Paper } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useState } from "react";
import "./App.scss";
import Biocaptcha from "./components/biocaptcha/Biocaptcha";

interface AppData {
  title: string;
  message: string;
}

function App() {
  const [human, setHuman] = useState(false);

  const getData = (data: AppData) => {
    console.log(data);
    console.log(data.title);
  };

  const renderProtectedContent = () => {
    if (human) {
      return (
        <Paper className="content">
          <Typography variant="h4">
            Congratulations! You Are Not a Robot!
          </Typography>

          <Box style={{ marginTop: "1rem" }}>
            <Typography variant="h6">Why bioCAPTCHA?</Typography>
            <ul style={{ margin: 0 }}>
              <li>
                <Typography variant="body1">
                  According to Barracuda Networks, malicious bots make up 40% of
                  internet traffic.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Bot-detection services like reCAPTCHA are contantly battling
                  hackers who circumvent verification systems.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Consequently, services like reCAPTCHA have traded increased
                  security for frustrating user experiences.
                </Typography>
              </li>
            </ul>
          </Box>

          <Divider className="mui-divider" />

          <Box style={{ marginTop: "1rem" }}>
            <Typography variant="h6">How is bioCAPTCHA different?</Typography>
            <ul style={{ margin: 0 }}>
              <li>
                <Typography variant="body1">
                  With one quick photo, our API can quickly identify a human and
                  allow access to the site{" "}
                  <mark>(No need to select all the buses in an image!)</mark>
                </Typography>
              </li>
            </ul>
          </Box>

          <Divider className="mui-divider" />

          <Box style={{ marginTop: "1rem" }}>
            <Typography variant="h6">Potential Future Applications</Typography>
            <ul style={{ margin: 0 }}>
              <li>
                <Typography variant="body1">
                  Built-in laptop fingerprint readers.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Gesture-based verification for improved security.
                </Typography>
              </li>
            </ul>
          </Box>

          <Typography variant="caption">
            NOTE: Only humans can see this page!
          </Typography>
        </Paper>
      );
    } else {
      return (
        <Biocaptcha
          sendDataUrl="http://localhost:8000/secret"
          onDataReceived={getData}
        />
      );
    }
  };

  return (
    <div className="app">
      <AppBar
        position="static"
        sx={{ backgroundColor: "#542c19", color: "#f5ad40" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hack@Brown 2023
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="page">{renderProtectedContent()}</div>
    </div>
  );
}

export default App;
