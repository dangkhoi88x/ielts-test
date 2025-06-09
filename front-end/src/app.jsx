import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import Homepage from "./components/home_page/home_page";
import ListeningPage from "./components/listening_page/listening_page";
import ReadingPage from "./components/reading_page/reading_page";
import SpeakingPage from "./components/speaking_page/speaking_page";
import WritingPage from "./components/writing_page/writing_page";

import AICheckWriting from "./components/ai_check_writing/AIcheckwriting";
import AICheckWritingTask2 from "./components/ai_check_writing/AIcheckwritingtask2";
import AICheckWritingTask1 from "./components/ai_check_writing/AIcheckwritingtask1";

{
  /* Cam 15 */
}
import Listening_test1C15 from "./components/Cambridge_15/Test_1/Listening_test1C15";
import Speaking_test1C15 from "./components/Cambridge_15/Test_1/Speaking_test1C15";
import Reading_test1C15 from "./components/Cambridge_15/Test_1/Reading_test1C15";
import Writing_test1C15 from "./components/Cambridge_15/Test_1/Writing_test1C15";
import Listening_test2C15 from "./components/Cambridge_15/Test_2/Listening_test2C15";
import Reading_test2C15 from "./components/Cambridge_15/Test_2/Reading_test2C15";
import Speaking_test2C15 from "./components/Cambridge_15/Test_2/Speaking_test2C15";
import Writing_test2C15 from "./components/Cambridge_15/Test_2/Writing_test2C15";
{
  /* Cam 16 */
}
import Listening_test1C16 from "./components/Cambridge_16/Test_1/Listening_test1C16";
import Reading_test1C16 from "./components/Cambridge_16/Test_1/Reading_test1C16";
import Speaking_test1C16 from "./components/Cambridge_16/Test_1/Speaking_test1C16";
import Writing_test1C16 from "./components/Cambridge_16/Test_1/Writing_test1C16";

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Hiển thị navbar trên tất cả các trang */}
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<Homepage />} />
        {/* Các trang chính */}
        <Route path="/listening" element={<ListeningPage />} />
        <Route path="/reading" element={<ReadingPage />} />
        <Route path="/speaking" element={<SpeakingPage />} />
        <Route path="/writing" element={<WritingPage />} />
        <Route path="/AIwriting" element={<AICheckWriting />} />
        {/* Cambridge 15 - Test 1 */}
        <Route
          path="/listening/cambridge-15-test-1"
          element={<Listening_test1C15 />}
        />

        <Route
          path="/reading/cambridge-15-test-1"
          element={<Reading_test1C15 />}
        />

        <Route
          path="/speaking-cambridge-15-test-1"
          element={<Speaking_test1C15 />}
        />
        <Route
          path="/writing-cambridge-15-test-1"
          element={<Writing_test1C15 />}
        />

        {/* Cambridge 15 - Test 2 */}
        <Route
          path="/reading/cambridge-15-test-2"
          element={<Reading_test2C15 />}
        />
        <Route
          path="/listening/cambridge-15-test-2"
          element={<Listening_test2C15 />}
        />
        <Route
          path="/speaking-cambridge-15-test-2"
          element={<Speaking_test2C15 />}
        />
        <Route
          path="/writing-cambridge-15-test-2"
          element={<Writing_test2C15 />}
        />

        {/* Cambridge 16 - Test 1 */}
        <Route
          path="/listening/cambridge-16-test-1"
          element={<Listening_test1C16 />}
        />
        <Route
          path="/reading/cambridge-16-test-1"
          element={<Reading_test1C16 />}
        />
        <Route
          path="/speaking-cambridge-16-test-1"
          element={<Speaking_test1C16 />}
        />

        <Route
          path="/writing-cambridge-16-test-1"
          element={<Writing_test1C16 />}
        />

        {/* AI Writing Check*/}
        <Route path="/writing-check-task-1" element={<AICheckWritingTask1 />} />
        <Route path="/writing-check-task-2" element={<AICheckWritingTask2 />} />

        {/* Trang 404 - Không tìm thấy */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
