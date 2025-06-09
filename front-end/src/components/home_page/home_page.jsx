import React from "react";
import "./home_page.css";

const home_page = () => {
  return (
    <div className="homepage">
      {/* Tiêu đề chính */}
      <h1 className="homepage-title">We take your IELTS score higher 😎</h1>

      {/* Section 1: Free IELTS Online Tests */}
      <div className="section-homepage">
        <div className="text-content">
          <h2>Free IELTS Online Tests</h2>
          <p>
            Our IELTS Reading and Listening tests are based on actual IELTS
            tests and follow the Cambridge IELTS book format. Created by our
            community of IELTS teachers, previous IELTS examiners, and IELTS
            exam takers.
          </p>
          <div className="buttons">
            <button className="btn">Listening Tests</button>
            <button className="btn">Academic Reading Test</button>
          </div>
        </div>
        <img
          src="../src/assets/Picture/IELTS-Free-Mock-Tests-Study-Material-and-More.png"
          alt="Online Test"
          className="section-image"
        />
      </div>
      <br />
      {/* Section 2: IELTS Writing Checkers */}
      <div className="section-homepage">
        <img
          src="../src/assets/Picture/screenshot.png"
          alt="Speaking Test"
          className="section-image"
        />
        <div className="text-content">
          <h2>IELTS Writing Checkers</h2>
          <p>
            Get a clear and detailed report about your IELTS writing. All issues
            in your text will be identified and highlighted with suggestions on
            how to correct them. Our correction services are proven to help
            students improve their writings by 0.5 - 2.
          </p>
          <div className="buttons">
            {/* <button className="btn">Free Checker</button> */}
            <button className="btn">AI Checker</button>
          </div>
        </div>
      </div>
      <br />
      {/* Section 3: Preparation for IELTS Speaking */}
      <div className="section-homepage">
        <div className="text-content">
          <h2>Preparation for IELTS Speaking</h2>
          <p>
            We have added recent IELTS speaking test questions, which are from
            the Internet, and our visitors who have just taken the test. Also,
            we have started Speaking Club on Zoom to improve your speaking
            level.
          </p>
          <div className="buttons">
            <button className="btn">Speaking Test</button>
            {/* <button className="btn">Speaking Club </button> */}
          </div>
        </div>
        <img
          src="../src/assets/Picture/IELTS_new_thumbnail.png"
          alt="Speaking Test"
          className="section-image"
        />
      </div>
    </div>
  );
};

export default home_page;
