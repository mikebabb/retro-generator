/*
Create a text area with the following specifications:
1. a H1 with the text "Retro Template Generator"
2. a text area for users to enter their desired retro theme
3. a button for users to submit their requested retro theme, with the text "Generate Retro"
4. a section to display the generated retro information
5. a button for users to copy the generated retro information, with the text "Copy to Clipboard"
6. Get the data from this link: http://localhost:8080/openai/generateinfo
7. Name the component RetroTemplateGenerator
*/

// Path: pages/index.js
import { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  AppBar,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import RetroInfo from "../components/RetroInfo";

export default function RetroTemplateGenerator() {
  const [retroTheme, setRetroTheme] = useState("");
  const [retroInfo, setRetroInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateRetroInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/openai/generateinfo",
        {
          retroTheme,
        }
      );
      setRetroInfo(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(retroInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGenerateRetroInfo();
  };

  return (
    <>
      <AppBar
        position="static"
        style={{ marginBottom: "1rem", padding: "1rem 2rem" }}
      >
        <Typography component={"h1"} variant="h5">
          🤖 AI Retro Generator
        </Typography>
      </AppBar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component={"h2"}
            variant="h4"
            style={{ margin: "2rem 0" }}
          >
            Retro Template Generator
          </Typography>
          <Typography
            component="p"
            variant="body"
            style={{ marginBottom: "1.5rem" }}
          >
            Enter a theme in the field below to generate an exciting retro
            template for your team using the power of AI ✨
          </Typography>
          <div style={{ marginBottom: "1rem" }}>
            <form onSubmit={handleSubmit}>
              <TextField
                id="retroTheme"
                label="Retro Theme"
                value={retroTheme}
                onChange={(e) => setRetroTheme(e.target.value)}
                disabled={loading}
                style={{ width: "100%" }}
              />
            </form>
          </div>
          <Button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Generate Retro
          </Button>

          <section>
            {loading && (
              <p>
                Generating your wonderfully whimsical retro - please wait ⏳
              </p>
            )}
            {!loading && retroInfo && (
              <>
                <Typography
                  component={"h3"}
                  variant="h5"
                  style={{ margin: "2rem 0" }}
                >
                  Your Generated Retro
                </Typography>
                <RetroInfo data={retroInfo} />
                <Button
                  onClick={handleCopyToClipboard}
                  variant="contained"
                  style={{ marginRight: "1rem" }}
                >
                  Copy to Clipboard
                </Button>
                <Button
                  onClick={() => setRetroInfo("")}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                >
                  Reset
                </Button>
              </>
            )}
          </section>
        </Container>
        <Container maxWidth="sm" style={{ marginTop: "auto" }}>
          <footer>
            <Typography component={"p"} style={{ textAlign: "center" }}>
              Made with 🤷 by {<a href="https://mikebabb.com">Mike Babb</a>} to
              learn about the{" "}
              {<a href="https://platform.openai.com/">OpenAI API</a>}, with help
              from{" "}
              {
                <a href="https://github.blog/2023-07-25-how-to-build-a-gpt-3-app-with-nextjs-react-and-github-copilot/">
                  GitHub
                </a>
              }
            </Typography>
          </footer>
        </Container>
      </div>
    </>
  );
}
