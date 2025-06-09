import React, { useState } from "react";
import Tesseract from "tesseract.js";
import axios from "axios";
import "./AIcheckwritingtask1.css";

const AIcheckwritingtask1 = () => {
  const [topic, setTopic] = useState("");
  const [report, setReport] = useState("");
  const [fileName, setFileName] = useState("");
  const [imageText, setImageText] = useState("");
  const [result, setResult] = useState(null);
  const [bandScore, setBandScore] = useState({
    task: 0,
    coherence: 0,
    lexical: 0,
    grammar: 0,
    overall: 0,
  });
  const [loading, setLoading] = useState(false);

  const wordCount = report.trim().split(/\s+/).filter(Boolean).length;

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      Tesseract.recognize(file, "eng", {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        setImageText(text);
      });
    }
  };

  const handleCheckReport = async () => {
    setLoading(true);
    setResult(null);
    setBandScore({
      task: 0,
      coherence: 0,
      lexical: 0,
      grammar: 0,
      overall: 0,
    });

    const prompt = `You are an IELTS examiner. Evaluate the following IELTS Academic Writing Task 1 based on official criteria (Task Achievement, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy). Provide a detailed assessment and a band score from 0 to 9.
Return response as JSON like this:

{
  "task": ...,
  "coherence": ...,
  "lexical": ...,
  "grammar": ...,
  "overall": ...,
  "vocabComplexity": "...",
  "grammarMistakes": "...",
  "vocabRepetition": "...",
  "feedback": "..."
}


Task Description: ${imageText}

Student's Report: ${report}`;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ielts-feedback",
        { prompt }
      );

      const reply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ No response from model.";
      const jsonMatch = reply.match(/{[\s\S]*}/);

      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          setBandScore(parsed);
          setResult(parsed.feedback || "✅ Feedback loaded.");
        } catch (e) {
          console.warn("Failed to parse JSON:", e);
          setResult(reply);
        }
      } else {
        setResult(reply);
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      setResult("❌ Error calling intermediate server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ielts-container">
      <h1 className="ielts-title">
        IELTS Academic Writing Task 1 Report Checker
      </h1>
      <div className="ielts-main">
        <div className="ielts-left">
          <h2>
            <strong>Topic Writing Task 1</strong>
          </h2>

          <textarea
            rows={2}
            placeholder="Enter the writing task question (topic)..."
            className="ielts-input"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{ resize: "vertical" }}
          />

          <div className="ielts-upload">
            <input type="file" id="imageUpload" onChange={handleFileChange} />
            <p className="ielts-image-note">
              <strong>Please upload a clear image</strong> of the chart, table,
              or map.
            </p>
          </div>
          <textarea
            rows={17}
            placeholder="Enter your IELTS Academic writing task 1 report..."
            className="ielts-textarea"
            value={report}
            onChange={(e) => setReport(e.target.value)}
            style={{ resize: "vertical" }}
          />

          <div className="ielts-meta">
            <span>Word Count: {wordCount}</span>
          </div>

          <div className="ielts-buttons">
            <button
              className="btn red"
              onClick={handleCheckReport}
              disabled={loading}
            >
              {loading ? "AI Checking..." : " AI Check Report"}
            </button>
          </div>

          {result && (
            <div className="ielts-feedback">
              <h2>AI Feedback</h2>
              <p style={{ whiteSpace: "pre-line" }}>{result}</p>
            </div>
          )}
        </div>

        <div className="ielts-right">
          <h2>Overall Band Score</h2>
          <h2 className="ielts-score">
            Band: {bandScore?.overall?.toFixed(1) ?? "0.0"}
          </h2>
          <div className="score-details">
            <div className="highlight yellow">
              Vocabulary Complexity:{" "}
              <strong>{bandScore?.vocabComplexity ?? "N/A"}</strong>
            </div>
            <div className="highlight red">
              Grammar Mistakes:{" "}
              <strong>{bandScore?.grammarMistakes ?? "N/A"}</strong>
            </div>
            <div className="highlight blue">
              Vocabulary Repetition:{" "}
              <strong>{bandScore?.vocabRepetition ?? "N/A"}</strong>
            </div>
          </div>

          <div className="criteria">
            <p>
              Task Response: <span>{bandScore?.task?.toFixed(1) ?? "0.0"}</span>
            </p>
            <p>
              Coherence & Cohesion:{" "}
              <span>{bandScore?.coherence?.toFixed(1) ?? "0.0"}</span>
            </p>
            <p>
              Lexical Resource:{" "}
              <span>{bandScore?.lexical?.toFixed(1) ?? "0.0"}</span>
            </p>
            <p>
              Grammatical Range & Accuracy:{" "}
              <span>{bandScore?.grammar?.toFixed(1) ?? "0.0"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIcheckwritingtask1;
