import React, { useRef, useState, useEffect } from "react";
import "./Speaking_test1.css";

const Speaking_test1C15 = () => {
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 phút (2400 giây)
  const [isRunning, setIsRunning] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false); // Trạng thái đã nộp bài

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

  return (
    <div className="speaking-wrapper">
      <div className="container-speaking">
        <div className="speaking-container">
          <h1 className="speaking-header">SPEAKING</h1>

          {/* Part 1 */}
          <div className="speaking-part">
            <h2 className="part-title">PART 1</h2>
            <p>
              The examiner asks the candidate about him/herself, his/her home,
              work or studies and other familiar topics.
            </p>

            <h3 className="sub-title">EXAMPLE</h3>
            <p className="title">Email</p>
            <ul className="question-list">
              <li>
                What kinds of emails do you receive about your work or studies?
              </li>
              <li>
                Do you prefer to email, phone or text your friends? [Why?]
              </li>
              <li>
                Do you reply to emails and messages as soon as you receive them?
                [Why/Why not?]
              </li>
              <li>
                Are you happy to receive emails that are advertising things?
                [Why/Why not?]
              </li>
            </ul>
          </div>

          {/* Part 2 */}
          <div className="speaking-part">
            <h2 className="part-title">PART 2</h2>
            <div className="cue-card">
              <h3 className="sub-title">Describe a hotel that you know.</h3>
              <p>You should say:</p>
              <ul className="question-list">
                <li>where this hotel is</li>
                <li>what this hotel looks like</li>
                <li>what facilities this hotel has</li>
              </ul>
              <p className="explanation">
                and explain whether you think this is a nice hotel to stay in.
              </p>
            </div>

            <p className="note">
              You will have to talk about the topic for one to two minutes. You
              have one minute to think about what you are going to say. You can
              make some notes to help you if you wish.
            </p>
          </div>

          {/* Part 3 */}
          <div className="speaking-part">
            <h2 className="part-title">PART 3</h2>
            <h3 className="discussion-title">Discussion topics:</h3>

            <div className="discussion-section">
              <h4 className="discussion-topic">Staying in hotels</h4>
              <p className="example-text">Example questions:</p>
              <ul className="question-list">
                <li>
                  What things are important when people are choosing a hotel?
                </li>
                <li>Why do some people not like staying in hotels?</li>
                <li>
                  Do you think staying in a luxury hotel is a waste of money?
                </li>
              </ul>
            </div>

            <div className="discussion-section">
              <h4 className="discussion-topic">Working in a hotel</h4>
              <p className="example-text">Example questions:</p>
              <ul className="question-list">
                <li>Do you think hotel work is a good career for life?</li>
                <li>
                  How does working in a big hotel compare with working in a
                  small hotel?
                </li>
                <li>
                  What skills are needed to be a successful hotel manager?
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speaking_test1C15;
