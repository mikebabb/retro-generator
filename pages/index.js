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
    <div>
      <h1>Retro Template Generator</h1>
      {/* form for user to input their retro theme, with a "generate" button */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="retroTheme">Retro Theme</label>
        <input
          type="text"
          id="retroTheme"
          value={retroTheme}
          onChange={(e) => setRetroTheme(e.target.value)}
          disabled={loading}
        />
      </form>
      <button type="submit" disabled={loading} onClick={handleSubmit}>
        ✨ Generate Retro
      </button>

      <section>
        {loading && <p>Generating your retro - please wait ⏳</p>}
        {!loading && retroInfo && (
          <>
            <h2>Your Generated Retro</h2>
            <p>{retroInfo}</p>
            <button onClick={handleCopyToClipboard}>
              📋 Copy to Clipboard
            </button>
            <button onClick={() => setRetroInfo("")}>🚮 Reset</button>
          </>
        )}
      </section>
    </div>
  );
}
