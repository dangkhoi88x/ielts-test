import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Listening_test1.css";
import ListeningAnswers from "../../../hooks/Cambridge_15/Test_1/ListeningAnswers";

const Listening_test1 = () => {
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
      // if (userAnswer === "") return "❌";

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
            src="../src/assets/Audio/cam15test1.mp3"
            controls
          />
        </div>
        <div className="listening-container">
          <div className="listening-left">
            <h1>PART 1 - Questions 1-10</h1>
            <h2>Bankside Recruitment Agency</h2>
            <ul>
              <li>
                <strong>Address of agency:</strong> 497 Eastside, Docklands
              </li>
              <li>
                <strong>Name of agent:</strong> Becky
                <span>
                  <strong>1</strong> ..................
                </span>
              </li>
              <li>
                <strong>Phone number:</strong> 07866 510333
              </li>
              <li>
                <strong>Best to call her in the</strong>
                <span>
                  <strong>2</strong> ..................
                </span>
              </li>
            </ul>

            <h3>Typical jobs</h3>
            <ul>
              <li>Clerical and admin roles, mainly in the finance industry</li>
              <li>
                Must have good
                <span>
                  <strong>3</strong> ..................
                </span>
                skills
              </li>
              <li>
                Jobs are usually for at least one
                <span>
                  <strong>4</strong> ..................
                </span>
              </li>
              <li>
                Pay is usually £
                <span>
                  <strong>5</strong> ..................
                </span>
                per hour
              </li>
            </ul>

            <h3>Registration process</h3>
            <ul>
              <li>
                Wear a
                <span>
                  <strong>6</strong> ..................
                </span>
                to the interview
              </li>
              <li>
                Must bring your
                <span>
                  <strong>7</strong> ..................
                </span>
                to the interview
              </li>
              <li>
                They will ask questions about each applicant’s
                <span>
                  <strong>8</strong> ..................
                </span>
              </li>
            </ul>

            <h3>Advantages of using an agency</h3>
            <ul>
              <li>
                The
                <span>
                  <strong>9</strong> ..................
                </span>
                you receive at interview will benefit you
              </li>
              <li>Will get access to vacancies which are not advertised</li>
              <li>
                Less
                <span>
                  <strong>10</strong> ..................
                </span>
                is involved in applying for jobs
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
                  <span className="result">{result[index + 0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="listening-container">
          <div className="listening-left">
            <h1>PART 2 - Questions 11-20</h1>
            <h3>Mattews Island Holidays</h3>
            <ul>
              <li>
                <strong>11.</strong> According to the speaker, the company
              </li>
              <li>
                A. has been in business for longer than most of its competitors.
              </li>
              <li>
                B. arranges holidays to more destinations than its competitors.
              </li>
              <li>C. has more customers than its competitors.</li>
            </ul>

            <ul>
              <li>
                <strong>12.</strong> Where can customers meet the tour manager
                before travelling to the Isle of Man?
              </li>
              <li>A. Liverpool</li>
              <li>B. Heysham</li>
              <li>C. Luton</li>
            </ul>

            <ul>
              <li>
                <strong>13.</strong> How many lunches are included in the price
                of the holiday?
              </li>
              <li>A. three</li>
              <li>B. four</li>
              <li>C. five</li>
            </ul>

            <ul>
              <li>
                <strong>14.</strong> Customers have to pay extra for
              </li>
              <li>A. guaranteeing themselves a larger room.</li>
              <li>B. booking at short notice.</li>
              <li>C. transferring to another date.</li>
            </ul>

            <div className="timetable-section">
              <h3>Questions 15–20</h3>

              <table className="timetable">
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Day 1 - Arrive</td>
                    <td>
                      Introduction by manager <br />
                      Hotel dining room has view of the
                      <strong> 15 ......................... </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Day 2 - Tynwald Exhibition and Peel</td>
                    <td>
                      Tynwald may have been founded in
                      <strong> 16 ......................... </strong> not 979.
                    </td>
                  </tr>
                  <tr>
                    <td>Day 3 - Trip to Snaefell</td>
                    <td>
                      Travel along promenade in a tram; train to Laxey; train to
                      the <strong> 17 ........................ </strong> of
                      Snaefell
                    </td>
                  </tr>
                  <tr>
                    <td>Day 4 - Free day</td>
                    <td>
                      Company provides a
                      <strong> 18 ........................ </strong> for local
                      transport and heritage sites.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Day 5 - Take the
                      <strong> 19 ........................ </strong> railway
                      train from Douglas to Port Erin
                    </td>
                    <td>
                      Free time, then coach to Castletown – former
                      <strong> 20 ........................ </strong> has old
                      castle.
                    </td>
                  </tr>
                  <tr>
                    <td>Day 6 - Leave</td>
                    <td>Leave the island by ferry or plane.</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
                  <span className="result">{result[index + 10]}</span>
                </div>
              ))}
            </div>
            <br />
            <p>Complete the table below.</p>
            <p>
              Write
              <em>
                <strong>ONE WORD AND/OR A NUMBER </strong>
              </em>
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
                  <span className="result">{result[index + 14]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="listening-container">
          <div className="listening-left">
            <h1>PART 3 - Questions 21-30</h1>
            <p>
              <strong>Questions 21–26</strong>
            </p>
            <h4>
              What did findings of previous research claim about the personality
              traits a child is likely to have because of their position in the
              family?
            </h4>
            <br />
            <div className="traits-box">
              <h3>Personality Traits</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>A</strong> outgoing
                    </td>
                    <td>
                      <strong>E</strong> introverted
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>B</strong> selfish
                    </td>
                    <td>
                      <strong>F</strong> co-operative
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>C</strong> independent
                    </td>
                    <td>
                      <strong>G</strong> caring
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>D</strong> attention-seeking
                    </td>
                    <td>
                      <strong>H</strong> competitive
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Position in family</h3>
            <ul>
              <li>
                <strong>21.</strong> the eldest child .........................
              </li>
              <li>
                <strong>22.</strong> a middle child ............................
              </li>
              <li>
                <strong>23.</strong> the youngest child
                .........................
              </li>
              <li>
                <strong>24.</strong> a twin ............................
              </li>
              <li>
                <strong>25.</strong> an only child .........................
              </li>
              <li>
                <strong>26.</strong> a child with much older siblings
                ........................
              </li>
            </ul>

            <h3>Questions 27 and 28</h3>
            <p>
              <strong>Choose the correct letter, A, B, or C.</strong>
            </p>
            <br />

            <div className="mcq-question">
              <p>
                <strong>27.</strong> What do the speakers say about the evidence
                relating to birth order and academic success?
              </p>
              <ul>
                <li>
                  A. Conflicting evidence about oldest children performing best.
                </li>
                <li>
                  B. Birth order has less influence than socio-economic status.
                </li>
                <li>C. Some studies ignored family size factor.</li>
              </ul>
            </div>

            <div className="mcq-question">
              <p>
                <strong>28.</strong> What does Ruth think is surprising about
                the difference in oldest children’s academic performance?
              </p>
              <ul>
                <li>A. Their role as teachers for younger siblings.</li>
                <li>
                  B. Advantages lead only to a small achievement difference.
                </li>
                <li>C. Extra parental attention has little effect.</li>
              </ul>
            </div>

            <h3>Questions 29 and 30</h3>
            <p>
              <strong>Choose two letter A, B, C, D, or E.</strong>
            </p>

            <div className="mcq-question">
              <p>
                <strong></strong> Which two expericences of siblings rivalry to
                the speakers agree has been valuable for them?
              </p>
              <ul>
                <li>A. learning to share</li>
                <li>B. learning to stand up for oneself</li>
                <li>C. learning to be a good loser</li>
                <li>D. learning to be tolerant</li>
                <li>D. learning to say sorry</li>
              </ul>
            </div>
          </div>
          <div className="questions-listening">
            <p>
              <strong>
                Choose <em>SIX</em> answers from the box and write the correct
                letter, <em>A–H</em>, next to Questions 21–26.
              </strong>
            </p>
            <br />
            <div className="question-list">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 21}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 20]}
                    onChange={(e) => handleChange(index + 20, e.target.value)}
                  />
                  <span className="result">{result[index + 20]}</span>
                </div>
              ))}
            </div>
            <h3> </h3>
            <p>
              <strong>Complete the notes below.</strong>
              <br />
              Write <em>ONE WORD AND/OR A NUMBER</em> for each answer.
            </p>
            <br />
            <div className="question-list">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 27}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 26]}
                    onChange={(e) => handleChange(index + 26, e.target.value)}
                  />
                  <span className="result">{result[index + 27]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="listening-container">
          <div className="listening-left">
            <h1>PART 4 - Questions 31-40</h1>
            <div className="notes-box">
              <h2>The Eucalyptus Tree in Australia</h2>
              <h3>Importance</h3>
              <ul>
                <li>
                  • it provides <strong> 31................</strong> and food
                  for a wide range of species
                </li>
                <li>
                  • its leaves provide <strong> 32................</strong> is
                  used to make a disinfectant
                </li>
              </ul>

              <h3>Reasons for present decline in number</h3>

              <h4>
                A) Diseases <br /> (i) ‘Mundulla Yellows’
              </h4>
              <ul>
                <li>
                  • Cause
                  <br />– lime used for making
                  <strong> 31................</strong> was absorbed <br />–
                  trees were unable to take in necessary iron through their
                  roots
                </li>
              </ul>

              <h4>(ii) ‘Bell-miner Associated Die-back’</h4>
              <ul>
                <li>
                  • Cause <br />– <strong> 34 ................</strong> feed on
                  eucalyptus leaves
                  <br />– they secrete a substance containing sugar <br />–
                  bell-miner birds are attracted by this and keep away other
                  species
                </li>
              </ul>

              <h4> B) Bushfires</h4>
              <h4>William Jackson’s theory:</h4>
              <ul>
                <li>
                  • high-frequency bushfires have impact on vegetation,
                  resulting in the growth of
                  <strong> 35 ................</strong>
                </li>
                <li>
                  • mid-frequency bushfires result in the growth of eucalyptus
                  forests, because they:
                </li>
                <ul>
                  <li>
                    – make more <strong> 36 ................</strong> available
                    to the trees
                  </li>
                  <li>
                    – maintain the quality of the
                    <strong> 37................</strong>
                  </li>
                </ul>
                <li>
                  • low-frequency bushfires result in the growth of
                  <strong> 38 ................</strong>
                  ‘rainforest’, which is:
                </li>
                <ul>
                  <li>
                    – a <strong> 39 ................</strong> ecosystem
                  </li>
                  <li>
                    – an ideal environment for the of
                    <strong> 40 ................</strong> the bell-miner
                  </li>
                </ul>
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

export default Listening_test1;
