import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Home.css";
export const Home = () => {
  const [input, setInput] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const textareaRef = useRef(null);
  async function generateExplanation() {
    setLoading(true);
    setError(null);

    const prompt = `Explain the following topic or notes in simple, beginner-friendly language — but keep the tone professional and informative, not childish or overly casual. Avoid unnecessary analogies like comparing to cooking or games unless truly helpful. Use clear structure with headings and bullet points where appropriate. The user's input may be in English or Roman Urdu — understand it either way and respond in the same clear, professional style.

Topic/Notes: ${input}`;

    try {
      const response = await fetch("/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt }),
});

const data = await response.json();
const resultText = data.candidates[0].content.parts[0].text;
      setText(resultText);
      setInput("");
      setInput("");
    } catch (err) {
      setError("Failed to fetch explanation");
    } finally {
      setLoading(false);
    }
  }
  const handleInputChange = (e) => {
  setInput(e.target.value);

  const textarea = textareaRef.current;
  textarea.style.height = "auto";

  if (textarea.scrollHeight > 500) {
    textarea.style.height = "500px";
    textarea.style.overflowY = "auto";
  } else {
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.style.overflowY = "hidden";
  }
};

  return (
    <div className="home-container">
      <div>
        <h1 className="page-heading">What would you like to understand today?</h1>
        <p className="page-subtitle">
          Paste your notes or type a topic name — I'll explain it in simple,
          clear language.
        </p>
      </div>

        
        {text && (
          <div className="result-box">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </div>
        )}
      

<div className = "input-section">
     <textarea
  ref={textareaRef}
  className="input-box"
  value={input}
  onChange={handleInputChange}
  placeholder="Paste your notes or type a topic name"
></textarea>

     <button className="primary-btn" onClick={generateExplanation} disabled={loading}>
  {loading ? <span className="spinner"></span> : "Explain"}
</button>

      {/* {loading && <p className="status-msg">Loading...</p>} */}
      {error && <p className="error-msg">{error}</p>}

    </div>
    </div>
  );
};
