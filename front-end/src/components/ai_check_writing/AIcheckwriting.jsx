import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AIcheckwriting.css";
import checkwriting from "../..//assets/Picture/screenshot.png";
import writingtask1check from "../..//assets/Picture/writingtask1check.jpg";
import writingtask2 from "../..//assets/Picture/writingtask2.png";

const AIcheckwriting = () => {
  const [writingText, setWritingText] = useState("");
  const [aiFeedback, setAiFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!writingText.trim()) return alert("Please enter your writing!");
    setLoading(true);
  };

  return (
    <div className="writing-correction">
      <div className="writing-content">
        {/* Tiêu đề và giới thiệu */}
        <img className="section-image" src={checkwriting} alt="Online Test" />
        <div className="writing-info">
          <h1>Check IELTS Writing, Correction, and Evaluation Service ✍️</h1>
          <ul>
            <li>✔ Estimate your band score before taking the real test</li>
            <li>✔ Discover your weaknesses</li>
            <li>✔ Use our suggestions to achieve your target score</li>
            <li>✔ Improve your writing skills in a better way</li>
            <li>✔ Score higher at the IELTS writing test</li>
          </ul>
          <br />

          <Link to="/" className="check-btn">
            📝 CHECK WRITING ACADEMIC
          </Link>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="writing-content">
        {/* Tiêu đề và giới thiệu */}
        <div className="writing-info-task">
          <img
            className="section-image"
            src={writingtask1check}
            alt="Online Test"
          />
          <img className="section-image" src={writingtask2} alt="Online Test" />
        </div>

        <Link to="/writing-check-task-1" className="check-btn-task">
          📝 CHECK WRITING TASK 1
        </Link>
        <Link to="/writing-check-task-2" className="check-btn-task">
          📝 CHECK WRITING TASK 2
        </Link>
      </div>

      <br />

      {/* Kết quả AI chấm bài */}
      {aiFeedback && (
        <div className="ai-feedback">
          <h3>AI Feedback & Band Score</h3>
          <p>
            <strong>Overall Band Score:</strong> {aiFeedback.bandScore}
          </p>
          <p>
            <strong>Word Count:</strong> {aiFeedback.wordCount} words
          </p>
          <p>
            <strong>Coherence & Cohesion:</strong> {aiFeedback.coherence}
          </p>
          <p>
            <strong>Lexical Resource:</strong> {aiFeedback.lexical}
          </p>

          <ul>
            {aiFeedback.feedback.map((item, index) => (
              <li
                key={index}
                className={item.includes("✖") ? "error" : "success"}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIcheckwriting;
