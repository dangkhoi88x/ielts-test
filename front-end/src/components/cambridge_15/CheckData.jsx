import React, { useState, useEffect } from "react";
import useFetchListeningAns from "../../hooks/Cambridge_15/Test_1/ReadingAnswers";
import "./CheckData.css";

const CheckData = () => {
  const cambridgeId = "Cambridge_15"; // ID của Cambridge test
  const testId = "TEST_2"; // Test cần lấy dữ liệu
  const skill = "READING"; // Chọn kỹ năng cần kiểm tra

  // 🟢 Gọi hook để lấy dữ liệu từ Firestore
  const { answers, isLoading } = useFetchListeningAns(
    cambridgeId,
    testId,
    skill
  );
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    if (answers) {
      console.log("📌 Data from Firestore:", answers);

      // 🔥 Gộp tất cả PART_1, PART_2, PART_3, PART_4 thành một mảng duy nhất
      const allAnswers = [
        ...(answers.PART_1 || []),
        ...(answers.PART_2 || []),
        ...(answers.PART_3 || []),
        ...(answers.PART_4 || []),
      ];
      setCorrectAnswers(allAnswers);
    }
  }, [answers]);

  return (
    <div className="checkdata-container">
      <h2>🔍 Checking Data from Firestore</h2>
      <p>
        <strong>Test ID:</strong> {testId}
      </p>
      <p>
        <strong>Parts:</strong> {skill} (All Parts 1-4)
      </p>

      {isLoading ? (
        <div className="loading-container">
          <p>📡 Loading data from Firebase...</p>
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <p>
            <strong>Total Answers Retrieved:</strong> {correctAnswers.length} /
            40
          </p>

          {correctAnswers.length === 40 ? (
            <p style={{ color: "green", fontWeight: "bold" }}>
              ✅ Successfully fetched all 40 answers!
            </p>
          ) : (
            <p style={{ color: "red", fontWeight: "bold" }}>
              ⚠️ Data is incomplete! Expected 40 answers but got{" "}
              {correctAnswers.length}.
            </p>
          )}

          <table className="data-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Correct Answer</th>
              </tr>
            </thead>
            <tbody>
              {correctAnswers.map((answer, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CheckData;
