/**
 * Create a component with the following specifications:
1. the component must split the received string data at /n/n or /n and return a Typography component for each string
2. the component must set a unique key for each Typography component
3. the component must return a div with the Typography components
4. the component must return null if the data is not a string
5. Name the component RetroInfo
6. Use the Paper Component from Material UI
 */

// Path: components/RetroInfo.js
import { Typography, Paper } from "@material-ui/core";

export default function RetroInfo({ data }) {
  if (typeof data !== "string") return null;
  const splitData = data.split(/\n\n|\n/);
  return (
    <Paper elevation={3} style={{ marginBottom: "1rem", padding: "1rem" }}>
      {splitData.map((item, index) => (
        <Typography key={index}>{item}</Typography>
      ))}
    </Paper>
  );
}
