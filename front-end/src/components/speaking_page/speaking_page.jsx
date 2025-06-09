import React from "react";
import { Link } from "react-router-dom";
import "./speaking_page.css";
import speaking from "../..//assets/Picture/ielts-speaking-actual-full-test.png";

const speaking_page = () => {
  return (
    <div className="speaking-page">
      <h1 className="title">IELTS Speaking Tests 🎙️</h1>
      <div className="section">
        {/* Phần mô tả */}
        <div className="description">
          <p>
            Our IELTS Speaking tests are designed to help you practice real exam
            scenarios. They are based on Cambridge IELTS book format and include
            real questions.
          </p>
          <p>
            These tests are created by IELTS professionals and past exam takers
            to simulate the real speaking exam.
          </p>
          <p>
            Using our online tests, you can improve your speaking skills and get
            feedback on your performance.
          </p>
          <p>
            Our IELTS Speaking tests are always free. You can use them to
            prepare for study abroad, immigration, and job opportunities.
          </p>
        </div>

        {/* Ảnh minh họa */}
        <img className="section-image" src={speaking} alt="Online Test" />
      </div>
      <div className="speaking-instructions">
        <h3 className="instructions-title">INSTRUCTIONS TO CANDIDATES</h3>
        <ul className="instructions-list">
          <li>
            <strong>Answer all</strong> the questions clearly.
          </li>
          <li>You can ask the examiner to repeat the question if needed.</li>
          <li>Speak fluently and naturally. Avoid long pauses.</li>
          <li>The Speaking test consists of 3 parts.</li>
          <li>The test lasts around 11–14 minutes.</li>
          <li>Your responses are recorded and evaluated.</li>
        </ul>

        <h3 className="instructions-title">BREAKDOWN OF SPEAKING TEST</h3>
        <ul className="instructions-list">
          <li>
            <strong>Part 1 (Introduction & Interview)</strong> - Answer general
            questions about yourself (4–5 minutes).
          </li>
          <li>
            <strong>Part 2 (Long Turn)</strong> - Speak for 1–2 minutes on a
            given topic (Preparation: 1 minute).
          </li>
          <li>
            <strong>Part 3 (Discussion)</strong> - Answer deeper questions
            related to Part 2 topic (4–5 minutes).
          </li>
        </ul>
      </div>
      {/* Chọn bài thi Speaking */}
      <div className="test-selection">
        <h2>Select a Test</h2>
        <div className="test-buttons">
          <Link to="/speaking-cambridge-15-test-1" className="test-btn">
            Cambridge 15 Speaking Test 1
          </Link>
          <Link to="/speaking-cambridge-15-test-2" className="test-btn">
            Cambridge 15 Speaking Test 2
          </Link>
          <Link to="/speaking-cambridge-16-test-1" className="test-btn">
            Cambridge 16 Speaking Test 1
          </Link>
          {/* <Link to="/speaking-cambridge-16-test-1" className="test-btn">
            Cambridge 16 Speaking Test 1
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default speaking_page;
