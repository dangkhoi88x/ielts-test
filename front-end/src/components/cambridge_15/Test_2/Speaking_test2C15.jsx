import React, { useRef, useState, useEffect } from "react";
import "./Speaking_test2.css";

const Speaking_test2 = () => {
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
            <p className="email-title">Languages</p>
            <ul className="question-list">
              <li>How many languages can you speak? [Why/Why not?]</li>
              <li>
                How useful will English be to you in your future? [Why/Why not?]
              </li>
              <li>
                What do you remember about learning languages at school?
                [Why/Why not?]
              </li>
              <li>
                What do you think would be the hardest language for you to
                learn? [Why?]
              </li>
            </ul>
          </div>

          {/* Part 2 */}
          <div className="speaking-part">
            <h2 className="part-title">PART 2</h2>
            <div className="cue-card">
              <h3 className="sub-title">
                Describe a website that you bought something from.
              </h3>
              <p>You should say:</p>
              <ul className="question-list">
                <li>what the website is</li>
                <li>what you bought from this website</li>
                <li>how satisfied you were with what you bought</li>
              </ul>
              <p className="explanation">
                and explain what you liked or disliked about using this website.
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
              <h4 className="discussion-topic">Shopping online</h4>
              <p className="example-text">Example questions:</p>
              <ul className="question-list">
                <li>
                  What kinds of things do people in your country often buy from
                  online shops?
                </li>
                <li>
                  Why do you think online shopping has become so popular
                  nowadays?
                </li>
                <li>
                  What are some possible disadvantages of buying things from
                  online shops?
                </li>
              </ul>
            </div>

            <div className="discussion-section">
              <h4 className="discussion-topic">The culture of consumerism</h4>
              <p className="example-text">Example questions:</p>
              <ul className="question-list">
                <li>
                  Why do many people today keep buying things which they do not
                  need?
                </li>
                <li>
                  Do you believe the benefits of a consumer society outweigh the
                  disadvantages?
                </li>
                <li>How possible is it to avoid the culture of consumerism?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speaking_test2;
