import React, { useRef, useState, useEffect } from "react";
import "./Writing_test1.css";

const Writing_test1C16 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 phút (2400 giây)
  const [isRunning, setIsRunning] = useState(true);

  const [showResult, setShowResult] = useState(false); // Hiển thị bảng kết quả
  const [isSubmitted, setIsSubmitted] = useState(false); // Trạng thái đã nộp bài

  // Đếm ngược thời gian
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // Format thời gian còn lại
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const checkAnswers = () => {
    setIsRunning(false);
    setIsSubmitted(true);

    setCorrectCount(correct);
    setWrongCount(wrong);
    setResult(updatedResults);
    setShowResult(true);
  };

  return (
    <div className="writing-wrapper">
      <div className="container-writing">
        <div className="writing-container">
          {/* Phần tiêu đề */}
          <h1 className="writing-header">WRITING</h1>
          <h2 className="task-title">WRITING TASK 1</h2>
          <p className="task-time">
            You should spend about 20 minutes on this task.
          </p>

          {/* Mô tả bài tập */}
          <div className="task-box">
            <p>
              <strong>
                The charts below show the changes in ownership of electrical
                appliances and amount of time spent doing housework in
                households in one country between 1920 and 2019.
              </strong>
            </p>
            <p>
              Summarise the information by selecting and reporting the main
              features, and make comparisons where relevant.
            </p>
          </div>

          <p className="word-count">
            Write at least <strong>150 words</strong>.
          </p>

          {/* Biểu đồ */}
          <div className="chart-container">
            <img
              src="../src/assets/Picture/cam16test1.png"
              alt="Percentage of  households with electrical appliances (1920-2019)"
              className="chart-image"
            />
          </div>

          {/* Khu vực nhập bài viết */}
          <div className="writing-area">
            <h3>Your Answer:</h3>
            <textarea
              className="writing-input"
              placeholder="Write your answer here..."
            ></textarea>
            {/* <button className="submit-btn">Submit</button> */}
          </div>

          <h2 className="task-title">WRITING TASK 2</h2>
          <p className="task-time">
            You should spend about 40 minutes on this task.
          </p>
          <div className="task-box">
            <p>
              <strong>
                In some countries, more and more people are becoming interested
                in finding out about the history of the house or building they
                live in. <br /> What are the reasons for this? <br /> How can
                people research this?
              </strong>
            </p>
            <p>
              <i>To what extent do you agree or disagree with this statement</i>
            </p>
            <p>
              Give reasons for your answer and include any relevant examples
              from your own knowledge or experience.
            </p>
          </div>

          <p className="word-count">
            Write at least <strong>250 words</strong>.
          </p>

          {/* Ô nhập bài viết */}
          <div className="writing-area">
            <h3>Your Answer:</h3>
            <textarea
              className="writing-input"
              placeholder="Write your answer here..."
            ></textarea>
            {/* <button className="submit-btn">Submit</button> */}
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default Writing_test1C16;
