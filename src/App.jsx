import { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const formatJSON = () => {
    if (!input.trim()) {
      toast.warning("Please enter JSON");
      return;
    }

    try {
      const parsed = JSON.parse(input);

      setOutput(JSON.stringify(parsed, null, 2));

      toast.success("JSON formatted successfully!");
    } catch (err) {
      setOutput(`❌ ERROR:\n\n${err.message}`);

      toast.error(err.message);
    }
  };

  const minifyJSON = () => {
    if (!input.trim()) {
      toast.warning("Please enter JSON");
      return;
    }

    try {
      const parsed = JSON.parse(input);

      setOutput(JSON.stringify(parsed));

      toast.success("JSON minified successfully!");
    } catch (err) {
      setOutput(`❌ ERROR:\n\n${err.message}`);

      toast.error(err.message);
    }
  };

  const copyOutput = () => {
    if (!output) {
      toast.warning("Nothing to copy");
      return;
    }

    navigator.clipboard.writeText(output);

    toast.success("Copied Successfully!");
  };

  const downloadJSON = () => {
    if (!output) {
      toast.warning("Nothing to download");
      return;
    }

    const blob = new Blob([output], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted-json.json";
    a.click();

    URL.revokeObjectURL(url);

    toast.success("Download started");
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

    toast.success("Example Loaded");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");

    toast.info("Cleared");
  };

  const lineCount = input ? input.split("\n").length : 0;
  const charCount = input.length;

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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default App;