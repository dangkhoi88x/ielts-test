import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListeningAnswers from "../../../hooks/Cambridge_15/Test_1/ListeningAnswers";
import "./Listening_test2.css";

const Listening_test2 = () => {
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
    "Cambridge_15",
    "TEST_2",
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
            src="../src/assets/Audio/cam15test2.mp3"
            controls
          />
        </div>
        <div className="listening-container">
          <div className="listening-left">
            <h1>PART 1 - Questions 1-4</h1>
            <h4>Questions 1-4</h4>
            <p>Complete the table below</p>
            <div className="timetable-section">
              <h3>Festival Information</h3>

              <table className="timetable">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type of Event</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>17th</td>
                    <td>A concert</td>
                    <td>Performers from Canada</td>
                  </tr>
                  <tr>
                    <td>18th</td>
                    <td>A ballet</td>
                    <td>
                      Company called{" "}
                      <strong> 1 ......................... </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>19th–20th (afternoon)</td>
                    <td>A play</td>
                    <td>
                      Type of play: A comedy called <em>Jemima</em> <br />
                      Has had a good{" "}
                      <strong> 2 ......................... </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>20th (evening)</td>
                    <td>
                      A <strong> 3 ......................... </strong> show
                    </td>
                    <td>
                      Show is called{" "}
                      <strong> 4 ......................... </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <h4>Questions 5-7</h4>
            <p>Complete the notes below</p>
            <h3>Workshops</h3>
            <ul>
              <li>
                Making <strong>5</strong> .................. food
              </li>
              <li>
                (Children only) Making <strong>6</strong> ..................
              </li>
              <li>
                (Adults only) Making toys from <strong>7</strong>{" "}
                .................. using various tools
              </li>
            </ul>

            <h3>Outdoor Activities</h3>
            <ul>
              <li>
                Swimming in the <strong>8</strong> ..................
              </li>
              <li>
                Walking in the woods, led by an expert on <strong>9</strong>{" "}
                ..................
              </li>
            </ul>

            <p>
              See the festival organiser’s <strong>10</strong>{" "}
              .................. for more information.
            </p>
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
            <h2>Minster Park</h2>

            <ul>
              <li>
                <strong>11.</strong> The park was originally established
              </li>
              <li>A. as an amenity provided by the city council.</li>
              <li>B. as land belonging to a private house.</li>
              <li>C. as a shared area set up by the local community.</li>
            </ul>

            <ul>
              <li>
                <strong>12.</strong> Why is there a statue of Diane Gosforth in
                the park?
              </li>
              <li>A. She was a resident who helped to lead a campaign.</li>
              <li>
                B. She was a council member responsible for giving the public
                access.
              </li>
              <li>C. She was a senior worker at the park for many years.</li>
            </ul>

            <ul>
              <li>
                <strong>13.</strong> During the First World War, the park was
                mainly used for
              </li>
              <li>A. exercises by troops.</li>
              <li>B. growing vegetables.</li>
              <li>C. public meetings.</li>
            </ul>

            <ul>
              <li>
                <strong>14.</strong> When did the physical transformation of the
                park begin?
              </li>
              <li>A. 2013</li>
              <li>B. 2015</li>
              <li>C. 2016</li>
            </ul>
            <p>
              <strong>Questions 15–20</strong>
            </p>
            <p>
              Label map below <br />
              Choose SIX answers from the box and write the correct letter, A–H,
              next to Questions 15–20.
            </p>
            <div className="chart-container">
              <img
                src="../src/assets/Picture/15-IELTS-Listening-Test-2-Q15-20.jpg"
                alt="Coffee and tea buying and drinking habits"
                className="chart-image"
              />
            </div>
            <br />

            <h3>Novels by Dickens</h3>
            <ul>
              <li>
                <strong>15.</strong> statue of Diane Gosforth
                .........................
              </li>
              <li>
                <strong>16.</strong> wooden sculptures
                ............................
              </li>
              <li>
                <strong>17.</strong> playground .........................
              </li>
              <li>
                <strong>18.</strong> maze ............................
              </li>
              <li>
                <strong>19.</strong> tennis courts .........................
              </li>
              <li>
                <strong>20.</strong> fitness area ............................
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
                <strong>21-22.</strong> Which TWO groups of people is the
                display primarily intended for?
              </p>
              <ul>
                <li>A. students from the English department</li>
                <li>B. residents of the local area</li>
                <li>C. the university’s teaching staff</li>
                <li>D. potential new students</li>
                <li>E. students from other departments</li>
              </ul>
            </div>
            <br />
            <h4>Questions 23 and 24</h4>
            <p>
              <strong>Choose TWO letters, A–E.</strong>
            </p>

            <div className="mcq-question">
              <p>
                <strong>23-24.</strong> What are Cathy and Graham’s TWO reasons
                for choosing the novelist Charles Dickens?
              </p>
              <ul>
                <li>
                  A. His speeches inspired others to try to improve society.
                </li>
                <li>
                  B. He used his publications to draw attention to social
                  problems.
                </li>
                <li>C. His novels are well-known now.</li>
                <li>D. He was consulted on a number of social issues.</li>
                <li>E. His reputation has changed in recent times.</li>
              </ul>
            </div>

            <p>
              <strong>Questions 25–30</strong>
            </p>
            <h4>
              What topic do Cathy and Graham choose to illustrate with each
              novel?
            </h4>
            <p>
              <strong>
                Choose SIX answers from the box and write the correct letter,
                A–H, next to Questions 25–30.
              </strong>
            </p>
            <br />

            <div className="traits-box">
              <h3>Topics</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>A</strong> poverty
                    </td>
                    <td>
                      <strong>E</strong> crime and the law
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>B</strong> education
                    </td>
                    <td>
                      <strong>F</strong> wealth
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>C</strong> Dickens’s travels
                    </td>
                    <td>
                      <strong>G</strong> medicine
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>D</strong> entertainment
                    </td>
                    <td>
                      <strong>H</strong> a woman’s life
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Novels by Dickens</h3>
            <ul>
              <li>
                <strong>25.</strong> The Pickwick Papers
                .........................
              </li>
              <li>
                <strong>26.</strong> Oliver Twist ............................
              </li>
              <li>
                <strong>27.</strong> Nicholas Nickleby .........................
              </li>
              <li>
                <strong>28.</strong> Martin Chuzzlewit
                ............................
              </li>
              <li>
                <strong>29.</strong> Bleak House .........................
              </li>
              <li>
                <strong>30.</strong> Little Dorrit ............................
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
              <h2>Agricultural programme in Mozambique</h2>

              <h3>How the programme was organised</h3>
              <ul>
                <li>
                  • It focused on a dry and arid region in Chicualacuala
                  district, near the Limpopo River.
                </li>
                <li>
                  • People depended on the forest to provide charcoal as a
                  source of income.
                </li>
                <li>
                  • <strong>31 ................</strong> was seen as the main
                  priority to ensure the supply of water.
                </li>
                <li>
                  • Most of the work organised by farmers’ associations was done
                  by <strong>32 ................</strong>.
                </li>
                <li>
                  • Fenced areas were created to keep animals away from crops.
                </li>
                <li>• The programme provided:</li>
                <ul>
                  <li>
                    – <strong>33 ................</strong> for the fences
                  </li>
                  <li>
                    – <strong>34 ................</strong> for suitable crops
                  </li>
                  <li>– water pumps.</li>
                </ul>
                <li>• The farmers provided:</li>
                <ul>
                  <li>– labour</li>
                  <li>
                    – <strong>35 ................</strong> for the fences on
                    their land.
                  </li>
                </ul>
              </ul>

              <h3>Further developments</h3>
              <ul>
                <li>
                  • The marketing of produce was sometimes difficult due to lack
                  of <strong>36 ................</strong>.
                </li>
                <li>
                  • Training was therefore provided in methods of food{" "}
                  <strong>37 ................</strong>.
                </li>
                <li>
                  • Farmers made special places where{" "}
                  <strong>38 ................</strong> could be kept.
                </li>
                <li>
                  • Local people later suggested keeping{" "}
                  <strong>39 ................</strong>.
                </li>
              </ul>

              <h3>Evaluation and lessons learned</h3>
              <ul>
                <li>
                  • Agricultural production increased, improving incomes and
                  food security.
                </li>
                <li>
                  • Enough time must be allowed, particularly for the{" "}
                  <strong>40 ................</strong> phase of the programme.
                </li>
              </ul>
            </div>
          </div>

          <div className="questions-listening">
            <p>
              <strong>Complete the notes below.</strong>
              <br />
              Write <em>ONE WORD ONLY</em> for each answer.
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
                  <span className="result">{result[index + 30]}</span>
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

export default Listening_test2;
