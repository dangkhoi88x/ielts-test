import React, { useState } from "react";
import axios from "axios";
import "./AIcheckwritingtask2.css";

const AIcheckwritingtask2 = () => {
  const [topic, setTopic] = useState("");
  const [essay, setEssay] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [bandScore, setBandScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length;

  const handleCheckEssay = async () => {
    setLoading(true);
    setFeedback(null);
    setBandScore(null);

    const prompt = `You are an IELTS examiner. Evaluate the following IELTS Academic Writing Task 1 based on official criteria 
    (Task Achievement, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy). 
    Provide a detailed assessment and a band score from 0 to 9.Return response as JSON like this:

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

Topic: ${topic}

Essay: ${essay}`;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ielts-feedback",
        {
          prompt,
        }
      );

      const reply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ No response from AI model.";

      const jsonMatch = reply.match(/{[\s\S]*}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          setBandScore(parsed);
          setFeedback(parsed.feedback);
        } catch (err) {
          setFeedback(reply);
        }
      } else {
        setFeedback(reply);
      }
    } catch (error) {
      console.error("Error from AI server:", error);
      setFeedback("❌ Failed to connect to AI server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ielts-container">
      <h1 className="ielts-title">IELTS Writing Task 2 Essay Checker</h1>
      <p className="ielts-subtitle">
        Instantly and precisely evaluate your task 2 essay with detailed
        feedback
      </p>

      <div className="ielts-main">
        <div className="ielts-left">
          <h2>
            <strong>Topic Writing Task 2</strong>
          </h2>
          <textarea
            rows={3}
            placeholder="Enter the writing task question (topic)..."
            className="ielts-input"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <textarea
            rows={15}
            placeholder="Enter your IELTS writing task 2 essay..."
            className="ielts-textarea"
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            style={{ resize: "vertical" }}
          />

          <div className="ielts-meta">
            <span>Word Count: {wordCount}</span>
          </div>

          <div className="ielts-buttons">
            <button
              className="btn red"
              onClick={handleCheckEssay}
              disabled={loading}
            >
              {loading ? "Checking..." : "Check Essay"}
            </button>
          </div>

          {feedback && (
            <div className="ielts-feedback">
              <h2>AI Feedback</h2>
              <p style={{ whiteSpace: "pre-line" }}>{feedback}</p>
            </div>
          )}
        </div>

        <div className="ielts-right">
          <h2>Overall Band Score</h2>
          <p className="ielts-score">{bandScore?.overall ?? "0.0"}</p>

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
              Task Response: <span>{bandScore?.task ?? "0.0"}</span>
            </p>
            <p>
              Coherence & Cohesion: <span>{bandScore?.coherence ?? "0.0"}</span>
            </p>
            <p>
              Lexical Resource: <span>{bandScore?.lexical ?? "0.0"}</span>
            </p>
            <p>
              Grammatical Range & Accuracy:{" "}
              <span>{bandScore?.grammar ?? "0.0"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIcheckwritingtask2;
