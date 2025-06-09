import React from "react";
import { Link } from "react-router-dom";
import "./reading_page.css";
import reading from "../../assets/Picture/reading.jpg";

const reading_page = () => {
  const readingTests = [
    {
      id: 1,
      title: "Cambridge 15 - Reading Test 1",
      link: "/reading/cambridge-15-test-1", // Sử dụng đường dẫn hợp lệ trên React Router
    },
    {
      id: 2,
      title: "Cambridge 15 - Reading Test 2",
      link: "/reading/cambridge-15-test-2",
    },
    {
      id: 3,
      title: "Cambridge 16 - Reading Test 1",
      link: "/reading/cambridge-16-test-1",
    },
  ];
  return (
    <div className="reading-page">
      {/* Tiêu đề */}
      <h1 className="title">IELTS Reading Tests 🤓</h1>
      <div className="section">
        <div className="description">
          <p>
            Our IELTS Reading tests are based on actual IELTS tests and follow
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
        <img className="section-image" src={reading} alt="Online Test" />
      </div>

      <br />
      <p className="reading-time">⏳ Time: 60 minutes</p>

      {/* Ghi chú */}
      <div className="reading-instructions">
        <h3 className="instructions-title">INSTRUCTIONS TO CANDIDATES</h3>
        <ul className="instructions-list">
          <li>
            <strong>Answer all</strong> the questions.
          </li>
          <li>You can change your answers at any time during the test.</li>
        </ul>

        <h3 className="instructions-title">INFORMATION FOR CANDIDATES</h3>
        <ul className="instructions-list">
          <li>There are 40 questions in this test.</li>
          <li>Each question carries one mark.</li>
          <li>
            The test clock will show you when there are 10 minutes and 5 minutes
            remaining.
          </li>
        </ul>
      </div>

      {/* Chọn bài test */}
      <div className="test-selection">
        <h2 className="select-text">select test</h2>
        <div className="test-buttons">
          {readingTests.map((test) => (
            <Link key={test.id} to={test.link} className="test-btn">
              {test.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Mô tả trang */}
    </div>
  );
};

export default reading_page;
