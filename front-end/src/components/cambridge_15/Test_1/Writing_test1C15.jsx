import React, { useState, useEffect } from "react";
import "./Writing_test1.css";

const Writing_test1 = () => {
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [isRunning, setIsRunning] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [task1Essay, setTask1Essay] = useState("");
  const [task2Essay, setTask2Essay] = useState("");
  const [aiResult, setAIResult] = useState(null);
  const [aiFeedback, setAIFeedback] = useState("");
  const [feedbackTask1, setFeedbackTask1] = useState("");
  const [feedbackTask2, setFeedbackTask2] = useState("");

  const TASK1_TOPIC = `The chart below shows the results of a survey about people's coffee and tea buying and drinking habits in five Australian cities.`;
  const TASK2_TOPIC = `In some countries, owning a home rather than renting one is very important for people.\nWhy might this be the case?\nDo you think this is a positive or negative situation?`;

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const checkAnswers = async () => {
    setIsRunning(false);
    setIsSubmitted(true);

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
  "feedbackTask1": "...",
  "feedbackTask2": "...",
}

Writing Task 1 Topic:
${TASK1_TOPIC}

Essay:
${task1Essay}

Writing Task 2 Topic:
${TASK2_TOPIC}

Essay:
${task2Essay}`;

    try {
      const res = await fetch("http://localhost:5000/api/ielts-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
      const rawJson = codeBlockMatch
        ? codeBlockMatch[1]
        : text.match(/{[\s\S]*}/)?.[0];

      if (rawJson) {
        const parsed = JSON.parse(rawJson);
        setAIResult(parsed);
        setAIFeedback(parsed.feedback);
        setFeedbackTask1(parsed.feedbackTask1 || "");
        setFeedbackTask2(parsed.feedbackTask2 || "");
      } else {
        setAIFeedback("⚠️ Could not parse AI response.");
      }
    } catch (err) {
      console.error("AI error:", err);
      setAIFeedback("❌ AI service error.");
    }
  };

  return (
    <div className="writing-wrapper">
      <div className="container-writing">
        <div className="writing-container">
          <h1 className="writing-header">WRITING</h1>

          <h2 className="task-title">WRITING TASK 1</h2>
          <p className="task-time">
            You should spend about 20 minutes on this task.
          </p>

          <div className="task-box">
            <p>
              <strong>{TASK1_TOPIC}</strong>
            </p>
            <p>
              Summarise the information by selecting and reporting the main
              features, and make comparisons where relevant.
            </p>
          </div>

          <p className="word-count">
            Write at least <strong>150 words</strong>.
          </p>

          <div className="chart-container">
            <img
              src="../src/assets/Picture/ielts-writing-task-1-peoples-coffee-and-tea-buying-and-drinking-habits-768x649.png"
              alt="Coffee and tea buying and drinking habits"
              className="chart-image"
            />
          </div>

          <div className="writing-area">
            <h3>Your Answer:</h3>
            <textarea
              className="writing-input"
              placeholder="Write your answer here..."
              value={task1Essay}
              onChange={(e) => setTask1Essay(e.target.value)}
            />
          </div>

          <h2 className="task-title">WRITING TASK 2</h2>
          <p className="task-time">
            You should spend about 40 minutes on this task.
          </p>

          <div className="task-box">
            {TASK2_TOPIC.split("\n").map((line, idx) => (
              <p key={idx}>
                <i>{line}</i>
              </p>
            ))}
            <p>
              Give reasons for your answer and include any relevant examples
              from your own knowledge or experience.
            </p>
          </div>

          <p>Write at least 250 words.</p>

          <div className="writing-area">
            <h3>Your Answer:</h3>
            <textarea
              className="writing-input"
              placeholder="Write your answer here..."
              value={task2Essay}
              onChange={(e) => setTask2Essay(e.target.value)}
            />
          </div>

          {aiResult && (
            <div className="ai-feedback-section">
              <div className="ai-highlight yellow">
                <strong>Vocabulary Complexity:</strong>{" "}
                {aiResult.vocabComplexity}
              </div>
              <div className="ai-highlight red">
                <strong>Grammar Mistakes:</strong> {aiResult.grammarMistakes}
              </div>
              <div className="ai-highlight blue">
                <strong>Vocabulary Repetition:</strong>{" "}
                {aiResult.vocabRepetition}
              </div>

              <div className="ai-feedback">
                <h4>AI Feedback</h4>
                <p>
                  <strong>Task 1:</strong> {feedbackTask1}
                </p>
                <p>
                  <strong>Task 2:</strong> {feedbackTask2}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="exam-sidebar-writing">
          <h3>Thời gian còn lại:</h3>
          <p className="time">{formatTime(timeLeft)}</p>

          <button
            className="submit-btn"
            onClick={checkAnswers}
            disabled={isSubmitted}
          >
            {isSubmitted ? "Đã Nộp Bài" : "NỘP BÀI"}
          </button>
          <br />
          <br />
          <br />
          {aiResult && (
            <div className="ai-score-board">
              <h3>Overall Band Score</h3>
              <p className="ai-score">{aiResult.overall}</p>

              <div className="ai-detail">
                <p>
                  <strong>Task Response:</strong> {aiResult.task}
                </p>
                <p>
                  <strong>Coherence:</strong> {aiResult.coherence}
                </p>
                <p>
                  <strong>Lexical Resource:</strong> {aiResult.lexical}
                </p>
                <p>
                  <strong>Grammar:</strong> {aiResult.grammar}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Writing_test1;
