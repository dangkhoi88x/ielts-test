import React from "react";
import { Link } from "react-router-dom";
import "./writing_page.css";
import writing from "../../assets/Picture/IELTS-Writing-Task-1-Topics.jpg";

const writing_page = () => {
  return (
    <div className="writing-page">
      {/* Tiêu đề */}
      <h1 className="title">IELTS Writing Tests ✍️</h1>
      <div className="section">
        {/* Mô tả bài thi */}
        <div className="description">
          <p>
            Our IELTS Writing tests are based on actual IELTS tests and follow
            the Cambridge IELTS book format.
          </p>
          <p>
            They are created by our community of IELTS teachers, previous IELTS
            examiners, and IELTS exam takers.
          </p>
          <p>
            Using our online tests for IELTS preparation is proven to help
            students improve by 0.5 - 1.5.
          </p>
          <p>
            Our online IELTS tests are always free. We are here to help users
            study abroad, immigrate, and find jobs.
          </p>
        </div>
        <img className="section-image" src={writing} alt="Online Test" />
      </div>
      {/* Thời gian bài thi */}
      <div className="writing-time">
        ⏳ <strong>Time:</strong> 60 minutes
      </div>
      {/* Hướng dẫn thí sinh */}
      <div className="writing-instructions">
        <h3 className="instructions-title">INSTRUCTIONS TO CANDIDATES</h3>
        <ul className="instructions-list">
          <li>
            <strong>Answer all</strong> the questions.
          </li>
          <li>You can change your answers at any time during the test.</li>
        </ul>

        <h3 className="instructions-title">INFORMATION FOR CANDIDATES</h3>
        <ul className="instructions-list">
          <li>There are 2 tasks in this test.</li>
          <li>Task 1 requires at least 150 words.</li>
          <li>Task 2 requires at least 250 words.</li>
          <li>Each task is assessed separately based on different criteria.</li>
          <li>
            The test clock will show you when there are 10 minutes and 5 minutes
            remaining.
          </li>
        </ul>
      </div>

      <div className="test-selection">
        <h2>Select a Test</h2>
        <div className="test-buttons">
          <Link to="/writing-cambridge-15-test-1" className="test-btn">
            Cambridge 15 Writing Test 1
          </Link>
          <Link to="/writing-cambridge-15-test-2" className="test-btn">
            Cambridge 15 Writing Test 2
          </Link>
          <Link to="/writing-cambridge-16-test-1" className="test-btn">
            Cambridge 16 Writing Test 1
          </Link>
        </div>
      </div>
    </div>
  );
};

export default writing_page;
