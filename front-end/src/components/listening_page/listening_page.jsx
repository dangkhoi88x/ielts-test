import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./listening_page.css";

import unnamedImage from "../../assets/Picture/unnamed.jpg";

// Dữ liệu các bài Listening Test
const listeningTests = [
  {
    id: 1,
    title: "Cambridge 15 - Test 1",
    link: "/listening/cambridge-15-test-1", // Sử dụng đường dẫn hợp lệ trên React Router
  },
  {
    id: 2,
    title: "Cambridge 15 - Test 2",
    link: "/listening/cambridge-15-test-2",
  },
];

const listening_page = () => {
  return (
    <div className="listening-page">
      <h1 className="title">IELTS Listening 😁</h1>
      <div className="section">
        <img className="section-image" src={unnamedImage} alt="Online Test" />

        <div className="description">
          <p>
            Our IELTS Listening tests are based on actual IELTS tests and follow
            the Cambridge IELTS book format.
          </p>
          <p>
            They are created by our community of IELTS teachers, previous IELTS
            examiners, and IELTS exam takers.
          </p>
          <p>
            After taking our IELTS mock tests with real audio, you can check
            your Listening band score and view your answer sheets.
          </p>
          <p>
            Our online IELTS tests are always free. We are here to help users
            study abroad, immigrate, and find jobs.
          </p>
        </div>
      </div>
      <p className="listening-time">
        ⏳ Time: 30 minutes + 10 minutes (Transfer Time)
      </p>
      {/* Hướng dẫn thí sinh */}
      <div className="listening-instructions">
        <h3 className="instructions-title">INSTRUCTIONS TO CANDIDATES</h3>
        <ul className="instructions-list">
          <li>
            <strong>Answer all</strong> the questions.
          </li>
          <li>You can change your answers at any time during the test.</li>
          <li>Listen carefully to the instructions given for each section.</li>
        </ul>

        <h3 className="instructions-title">INFORMATION FOR CANDIDATES</h3>
        <ul className="instructions-list">
          <li>There are 40 questions in this test.</li>
          <li>Each question carries one mark.</li>
          <li>
            The test consists of four sections, each getting progressively
            harder.
          </li>
          <li>
            The test clock will show you when there are 10 minutes and 5 minutes
            remaining.
          </li>
          <li>
            You will have an extra 10 minutes at the end to transfer your
            answers to the answer sheet.
          </li>
        </ul>
      </div>
      <div className="test-selection">
        <h2>Select a Test</h2>
        <div className="test-buttons">
          {listeningTests.map((test) => (
            <Link key={test.id} to={test.link} className="test-btn">
              {test.title}
            </Link>
          ))}
        </div>
      </div>
      ;
    </div>
  );
};

export default listening_page;
