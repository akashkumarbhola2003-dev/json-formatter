import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!value.trim()) {
      setError("");
      setIsValid(false);
      return;
    }

    try {
      JSON.parse(value);
      setError("");
      setIsValid(true);
    } catch {
      setError("Invalid JSON");
      setIsValid(false);
    }
  };

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
      setIsValid(true);
    } catch {
      setOutput("");
      setError("Invalid JSON");
      setIsValid(false);
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
      setIsValid(true);
    } catch {
      setOutput("");
      setError("Invalid JSON");
      setIsValid(false);
    }
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    alert("Copied Successfully!");
  };

  const downloadJSON = () => {
    if (!output) return;

    const blob = new Blob([output], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted-json.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const loadExample = () => {
    const example = `{
  "name": "Akash Kumar Bhola",
  "course": "Java Full Stack",
  "skills": [
    "Java",
    "React",
    "SQL"
  ],
  "experience": "Fresher"
}`;

    setInput(example);
    setOutput("");
    setError("");
    setIsValid(true);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    setIsValid(false);
  };

  const lineCount = output ? output.split("\n").length : 0;
  const charCount = output.length;

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <h1>JSON Formatter & Validator</h1>

      <p className="subtitle">
        Format, Validate, Minify and Download JSON Instantly
      </p>

      <div className="top-actions">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="editor-section">
        <div className="box">
          <h2>Input JSON</h2>

          <textarea
            placeholder="Paste your JSON here..."
            value={input}
            onChange={handleInputChange}
          />
        </div>

        <div className="box">
          <h2>Output</h2>

          <textarea
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
          />
        </div>
      </div>

      <div className="buttons">
        <button onClick={formatJSON}>Format JSON</button>

        <button onClick={minifyJSON}>Minify JSON</button>

        <button onClick={copyOutput}>Copy Output</button>

        <button onClick={downloadJSON}>Download JSON</button>

        <button onClick={loadExample}>Load Example</button>

        <button onClick={clearAll}>Clear</button>
      </div>

      {isValid && (
        <div className="badge success-badge">
          ✅ VALID JSON
        </div>
      )}

      {!isValid && error && (
        <div className="badge error-badge">
          ❌ INVALID JSON
        </div>
      )}

      <div className="stats">
        <p>Characters: {charCount}</p>
        <p>Lines: {lineCount}</p>
      </div>

      <footer>
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
          className="digital-btn"
        >
          Built for Digital Heroes
        </a>

        <h3>Akash Kumar Bhola</h3>

        <p>akashkumarbhola2003@gmail.com</p>
      </footer>
    </div>
  );
}

export default App;