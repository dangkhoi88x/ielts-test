import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Listening_test1.css";
import ListeningAnswers from "../../../hooks/Cambridge_15/Test_1/ListeningAnswers";

const Listening_test1C16 = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 phút (2400 giây)
  const [isRunning, setIsRunning] = useState(true);
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false); // Hiển thị bảng kết quả
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [bandScore, setBandScore] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // Trạng thái đã nộp bài

  const { answers, isLoading } = ListeningAnswers(
    "Cambridge_16",
    "TEST_1",
    "LISTENING"
  );
  const [userAnswers, setUserAnswers] = useState(Array(40).fill(""));
  const [result, setResult] = useState(Array(40).fill(null));

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

  const handleChange = (index, value) => {
    setUserAnswers((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[index] = value;
      return updatedAnswers;
    });
  };

  const getIELTSBand = (score) => {
    if (score >= 39) return 9.0;
    if (score >= 37) return 8.5;
    if (score >= 35) return 8.0;
    if (score >= 32) return 7.5;
    if (score >= 30) return 7.0;
    if (score >= 26) return 6.5;
    if (score >= 23) return 6.0;
    if (score >= 18) return 5.5;
    if (score >= 16) return 5.0;
    if (score >= 13) return 4.5;
    if (score >= 10) return 4.0;
    if (score >= 7) return 3.5;
    if (score >= 5) return 3.0;
    if (score >= 3) return 2.5;
    return 2.0;
  };
  const checkAnswers = () => {
    if (isLoading || !answers) {
      alert("Dữ liệu chưa tải xong. Vui lòng thử lại.");
      return;
    }
    setIsRunning(false);
    setIsSubmitted(true);
    const allCorrectAnswers = [
      ...(answers.PART_1 || []),
      ...(answers.PART_2 || []),
      ...(answers.PART_3 || []),
      ...(answers.PART_4 || []),
    ];
    let correct = 0;
    let wrong = 0;

    const updatedResults = userAnswers.map((answer, index) => {
      const userAnswer = answer.trim().toLowerCase();
      const correctAnswer = allCorrectAnswers[index];

      if (!correctAnswer) {
        wrong++;
        return "❌";
      }

      let isCorrect = false;

      if (Array.isArray(correctAnswer)) {
        isCorrect = correctAnswer.some(
          (ans) => ans.trim().toLowerCase() === userAnswer
        );
      } else if (typeof correctAnswer === "string") {
        const validAnswers = correctAnswer
          .split("/")
          .map((ans) => ans.trim().toLowerCase());
        isCorrect = validAnswers.includes(userAnswer);
      }

      if (isCorrect) {
        correct++;
        return "✅";
      } else {
        wrong++;
        return "❌";
      }
    });

    setCorrectCount(correct);
    setWrongCount(wrong);
    setResult(updatedResults);
    setBandScore(getIELTSBand(correct));
    setShowResult(true);
  };

  return (
    <div className="listening-wrapper">
      <div className="container-listening">
        <div className="audio-container">
          <button
            className="play-btn"
            onClick={() => {
              if (audioRef.current.paused) {
                audioRef.current.play();
                setIsPlaying(true);
              } else {
                audioRef.current.pause();
                setIsPlaying(false);
              }
            }}
          >
            {isPlaying ? "⏸️ Pause" : "▶️ Play"}
          </button>
          <audio
            className="audio"
            ref={audioRef}
            src="../src/assets/Audio/cam16test1.mp3"
            controls
          />
        </div>
        <div className="listening-container">
          <div className="listening-left">
            <h1>PART 1 - Questions 1-10</h1>
            <h2>Children’s Engineering Workshops</h2>

            <h3>Tiny Engineers (ages 4–5)</h3>
            <ul>
              <li>
                Create a cover for an <strong>1</strong> .................. so
                they can drop it from a height without breaking it.
              </li>
              <li>
                Take part in a competition to build the tallest{" "}
                <strong>2</strong> ..................
              </li>
              <li>
                Make a <strong>3</strong> .................. powered by a
                balloon.
              </li>
            </ul>

            <h3>Junior Engineers (ages 6–8)</h3>
            <ul>
              <li>
                Build model cars, trucks and <strong>4</strong>{" "}
                .................. and learn how to program them so they can
                move.
              </li>
              <li>
                Take part in a competition to build the longest{" "}
                <strong>5</strong> .................. using card and wood.
              </li>
              <li>
                Create a short <strong>6</strong> .................. with
                special software.
              </li>
              <li>
                Build, <strong>7</strong> .................. and program a
                humanoid robot.
              </li>
            </ul>

            <h3>Cost and Schedule</h3>
            <ul>
              <li>Cost for a five-week block: £50</li>
              <li>
                Held on <strong>8</strong> .................. from 10 am to 11
                am
              </li>
            </ul>

            <h3>Location</h3>
            <ul>
              <li>
                Building 10A, <strong>9</strong> .................. Industrial
                Estate, Grasford
              </li>
              <li>
                Plenty of <strong>10</strong> .................. is available.
              </li>
            </ul>
          </div>

          <div className="questions-listening">
            <p>
              <strong>Complete the notes below.</strong>
              <br />
              Write <em>ONE WORD AND/OR A NUMBER</em> for each answer.
            </p>
            <br />
            <div className="question-list">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 1}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 0]}
                    onChange={(e) => handleChange(index + 0, e.target.value)}
                  />
                  <span className="result">{result[index + 0]}</span>{" "}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="listening-container">
          <div className="listening-left">
            <h1>PART 2 - Questions 11-20</h1>
            <h3>Questions 11–14</h3>
            <p>
              <em>
                Choose the correct letter, <strong>A, B or C.</strong>
              </em>
            </p>

            <ul>
              <li>
                <strong>11.</strong> Stevenson’s was founded in
              </li>
              <li>A. 1923.</li>
              <li>B. 1924.</li>
              <li>C. 1926.</li>
            </ul>

            <ul>
              <li>
                <strong>12.</strong> Originally, Stevenson’s manufactured goods
                for
              </li>
              <li>A. the healthcare industry.</li>
              <li>B. the automotive industry.</li>
              <li>C. the machine tools industry.</li>
            </ul>

            <ul>
              <li>
                <strong>13.</strong> What does the speaker say about the company
                premises?
              </li>
              <li>A. The company has recently moved.</li>
              <li>B. The company has no plans to move.</li>
              <li>C. The company is going to move shortly.</li>
            </ul>

            <ul>
              <li>
                <strong>14.</strong> The programme for the work experience group
                includes
              </li>
              <li>A. time to do research.</li>
              <li>B. meetings with a teacher.</li>
              <li>C. talks by staff.</li>
            </ul>

            <p>
              <strong>Questions 15–20</strong>
            </p>
            <p>
              Label map below <br />
              Write the correct letter, A-J, next to Questions 15-20.
            </p>
            <div className="chart-container">
              <img
                src="../src/assets/Picture/Listeningtest1.png"
                alt="Coffee and tea buying and drinking habits"
                className="chart-image"
              />
            </div>
            <br />
            <ul>
              <li>
                <strong>15.</strong> coffee room .........................
              </li>
              <li>
                <strong>16.</strong> warehouse ............................
              </li>
              <li>
                <strong>17.</strong> staff canteen .........................
              </li>
              <li>
                <strong>18.</strong> meeting room ............................
              </li>
              <li>
                <strong>19.</strong> human resources .........................
              </li>
              <li>
                <strong>20.</strong> boardroom ............................
              </li>
            </ul>
          </div>
          <div className="questions-listening">
            <p>
              <strong>Choose the corect letter A, B, C</strong>
              <br />
            </p>
            <br />
            <div className="question-list">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 11}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 10]}
                    onChange={(e) => handleChange(index + 10, e.target.value)}
                  />
                  <span className="result">{result[index + 10]}</span>{" "}
                </div>
              ))}
            </div>
            <br />
            <p>Complete the table below.</p>
            <p>
              Write{" "}
              <em>
                {" "}
                <strong>ONE WORD AND/OR A NUMBER </strong>{" "}
              </em>{" "}
              for each answer.
            </p>
            <br />
            <div className="question-list">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 15}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 14]}
                    onChange={(e) => handleChange(index + 14, e.target.value)}
                  />
                  <span className="result">{result[index + 14]}</span>{" "}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="listening-container">
          <div className="listening-left">
            <h1>PART 3 - Questions 21-30</h1>
            <h4>Questions 21 and 22</h4>
            <p>
              <strong>Choose TWO letters, A–E.</strong>
            </p>

            <div className="mcq-question">
              <p>
                <strong>21-22.</strong> Which TWO parts of the introductory
                stage to their art projects do Jess and Tom agree were useful?
              </p>
              <ul>
                <li>A. the Bird Park visit</li>
                <li>B. the workshop sessions</li>
                <li>C. the Natural History Museum visit</li>
                <li>D. the projects done in previous years</li>
                <li>E. the handouts with research sources</li>
              </ul>
            </div>

            <br />

            <h4>Questions 23 and 24</h4>
            <p>
              <strong>Choose TWO letters, A–E.</strong>
            </p>

            <div className="mcq-question">
              <p>
                <strong>23-24.</strong> In which TWO ways do both Jess and Tom
                decide to change their proposals?
              </p>
              <ul>
                <li>A. by giving a rationale for their action plans</li>
                <li>B. by being less specific about the outcome</li>
                <li>C. by adding a video diary presentation</li>
                <li>D. by providing a timeline and a mind map</li>
                <li>E. by making their notes more evaluative</li>
              </ul>
            </div>

            <p>
              <strong>Questions 25–30</strong>
            </p>
            <h4>
              Which personal meaning do the students decide to give to each of
              the following pictures?
            </h4>
            <h4>
              Choose <strong>SIX</strong> answers from the box and write the
              correct letter, <strong>A-H</strong> , next to Questions 25-30.{" "}
            </h4>
            <br />
            <div className="traits-box">
              <h3>Personal meanings </h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>A</strong> a childhood memory
                    </td>{" "}
                    <td>
                      <strong>E</strong> the power of colour
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>B</strong> hope for the future
                    </td>{" "}
                    <td>
                      <strong>F</strong> the continuity of life
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>C</strong> fast movement
                    </td>{" "}
                    <td>
                      <strong>G</strong> protection of nature
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>D</strong> a potential threat
                    </td>{" "}
                    <td>
                      <strong>H</strong> a confused attitude to nature
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Pictures</h3>
            <ul>
              <li>
                <strong>25.</strong> Falcon (Landseer) .......................
              </li>
              <li>
                <strong>26.</strong> Fish hawk (Audubon)
                .........................
              </li>
              <li>
                <strong>27.</strong> Kingfisher (van Gogh)
                ........................
              </li>
              <li>
                <strong>28.</strong> Portrait of William Wells
                ............................
              </li>
              <li>
                <strong>29.</strong> Vairumati (Gauguin)
                .........................
              </li>
              <li>
                <strong>30.</strong> Portrait of Giovanni de Medici
                ........................
              </li>
            </ul>
            <br />
          </div>
          <div className="questions-listening">
            <p>
              <strong>
                Choose <em>SIX</em> answers from the box and write the correct
                letter, <em>A–H</em>, next to Questions 21–30.
              </strong>
            </p>
            <br />
            <div className="question-list">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 21}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 20]}
                    onChange={(e) => handleChange(index + 20, e.target.value)}
                  />
                  <span className="result">{result[index + 20]}</span>{" "}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="listening-container">
          <div className="listening-left">
            <h1>PART 4 - Questions 31-40</h1>
            <div className="notes-box">
              <h2>Stoicism</h2>
              <p>
                Stoicism is still relevant today because of its{" "}
                <strong>31 ................</strong> appeal.
              </p>

              <h3>Ancient Stoics</h3>
              <ul>
                <li>Stoicism was founded over 2,000 years ago in Greece.</li>
                <li>
                  The Stoics’ ideas are surprisingly well known, despite not
                  being intended for
                  <strong> 32 ................</strong>.
                </li>
              </ul>

              <h3>Stoic principles</h3>
              <ul>
                <li>Happiness could be achieved by leading a virtuous life.</li>
                <li>Controlling emotions was essential.</li>
                <li>
                  Epictetus said that external events cannot be controlled but
                  the
                  <strong>33 ................</strong> people make in response
                  can be controlled.
                </li>
                <li>
                  A Stoic is someone who has a different view on experiences
                  which others would consider as{" "}
                  <strong>34 ................</strong>.
                </li>
              </ul>

              <h3>The influence of Stoicism</h3>
              <ul>
                <li>
                  George Washington organised a{" "}
                  <strong>35 ................</strong> about Cato to motivate
                  his men.
                </li>
                <li>The French artist Delacroix was a Stoic.</li>
                <li>
                  Adam Smith’s ideas on <strong>36 ................</strong>{" "}
                  were influenced by Stoicism.
                </li>
                <li>
                  Some of today’s political leaders are inspired by the Stoics.
                </li>
                <li>
                  Cognitive Behaviour Therapy (CBT)
                  <ul>
                    <li>
                      the treatment for <strong>37 ................</strong> is
                      based on ideas from Stoicism
                    </li>
                    <li>
                      people learn to base their thinking on{" "}
                      <strong>38 ................</strong>
                    </li>
                  </ul>
                </li>
                <li>
                  In business, people benefit from Stoicism by identifying
                  obstacles as
                  <strong>39 ................</strong>.
                </li>
              </ul>

              <h3>Relevance of Stoicism</h3>
              <ul>
                <li>
                  It requires a lot of <strong>40 ................</strong> but
                  Stoicism can help people to lead a good life.
                </li>
                <li>
                  It teaches people that having a strong character is more
                  important than anything else.
                </li>
              </ul>
            </div>
          </div>
          <div className="questions-listening">
            <p>
              <strong>Complete the notes below.</strong>
              <br />
              Write <em>ONE WORD AND/OR A NUMBER</em> for each answer.
            </p>
            <br />
            <div className="question-list">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 31}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 30]}
                    onChange={(e) => handleChange(index + 30, e.target.value)}
                  />
                  <span className="result">{result[index + 30]}</span>{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="exam-sidebar-listening">
        <h3>Thời gian còn lại:</h3>
        <p className="time">{formatTime(timeLeft)}</p>

        <button
          className="submit-btn"
          onClick={checkAnswers}
          disabled={isSubmitted}
        >
          {isSubmitted ? "Đã Nộp Bài" : "NỘP BÀI"}
        </button>

        {isSubmitted && (
          <button className="submit-btn" onClick={() => navigate("/listening")}>
            Quay Lại
          </button>
        )}
        <br />
        <br />
        <p className="note">
          <em>Chú ý: Click vào số thứ tự câu hỏi để đánh dấu review.</em>
        </p>
        {showResult && (
          <div className="result-modal">
            <div className="result-content">
              <h2>Kết Quả Bài Làm</h2>
              <p>
                ✅ Số câu đúng: <strong>{correctCount}</strong>
              </p>
              <p>
                ❌ Số câu sai: <strong>{wrongCount}</strong>
              </p>
              <p>
                🎯 Band Điểm IETLS Listening : <strong>{bandScore}</strong>
              </p>
              <button onClick={() => setShowResult(false)}>Đóng</button>
              {/* <button onClick={() => navigate("/listening")}>Quay Lại</button> */}
            </div>
          </div>
        )}
        <br />
        {/* Danh sách câu hỏi */}
        <div className="question-grid">
          <h3>Recording 1</h3>
          <div className="grid">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className={`question-box ${
                  userAnswers[index] ? "answered" : "unanswered"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <h3>Recording 2</h3>
          <div className="grid">
            {[...Array(10)].map((_, index) => (
              <div
                key={index + 10}
                className={`question-box ${
                  userAnswers[index + 10] ? "answered" : "unanswered"
                }`}
              >
                {index + 11}
              </div>
            ))}
          </div>
          <h3>Recording 3</h3>
          <div className="grid">
            {[...Array(10)].map((_, index) => (
              <div
                key={index + 20}
                className={`question-box ${
                  userAnswers[index + 20] ? "answered" : "unanswered"
                }`}
              >
                {index + 21}
              </div>
            ))}
          </div>
          <h3>Recording 4</h3>
          <div className="grid">
            {[...Array(10)].map((_, index) => (
              <div
                key={index + 30}
                className={`question-box ${
                  userAnswers[index + 30] ? "answered" : "unanswered"
                }`}
              >
                {index + 31}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listening_test1C16;
