import React, { useRef, useState, useEffect } from "react";
import "./Speaking_test1.css";

const Speaking_test1C16 = () => {
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
            <p className="title">People you study/work with </p>
            <ul className="question-list">
              <li>Who do you spend most time studying/working with? [Why?]</li>
              <li>
                What kinds of things do you study/work on with other people?
                [Why?]
              </li>
              <li>
                Are there times when you study/work better by yourself? [Why/Why
                not?]
              </li>
              <li>
                Is it important to like the people you study/work with? [Why/Why
                not?]
              </li>
            </ul>
          </div>

          {/* Part 2 */}
          <div className="speaking-part">
            <h2 className="part-title">PART 2</h2>
            <div className="cue-card">
              <h3 className="sub-title">
                Describe a tourist attraction you enjoyed visiting.{" "}
              </h3>
              <p>You should say:</p>
              <ul className="question-list">
                <li>what this tourist attraction is</li>
                <li>when and why you visited it</li>
                <li>what you did there </li>
              </ul>
              <p className="explanation">
                and explain why you enjoyed visiting this tourist attraction.
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
              <h4 className="discussion-topic">
                Different kinds of tourist attractions
              </h4>
              <p className="example-text">Example questions:</p>
              <ul className="question-list">
                <li>
                  What are the most popular tourist attractions in your country?
                </li>
                <li>
                  How do the types of tourist attractions that younger people
                  like to visit compare with those that older people like to
                  visit?
                </li>
                <li>
                  Do you agree that some tourist attractions (e.g. national
                  museums/galleries) should be free to visit?
                </li>
              </ul>
            </div>

            <div className="discussion-section">
              <h4 className="discussion-topic">
                The importance of international tourism{" "}
              </h4>
              <p className="example-text">Example questions:</p>
              <ul className="question-list">
                <li>Why is tourism important to a country?</li>
                <li>
                  What are the benefits to individuals of visiting another
                  country as tourists?
                </li>
                <li>
                  How necessary is it for tourists to learn the language of the
                  country they're visiting?
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speaking_test1C16;
