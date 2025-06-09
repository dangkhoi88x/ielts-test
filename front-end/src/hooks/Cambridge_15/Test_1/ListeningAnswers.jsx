import { useState, useEffect } from "react";
import { db } from "../../../services/firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * Fetch câu trả lời từ Firestore
 * @param {string} cambridgeId - Ví dụ: "Cambridge_15"
 * @param {string} testId - Ví dụ: "TEST_1"
 * @param {string} skill - Ví dụ: "LISTENING", "READING", "WRITING", "SPEAKING"
 */
const ListeningAnswers = (cambridgeId, testId, skill) => {
  const [answers, setAnswers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnswers = async () => {
      if (!cambridgeId || !testId || !skill) {
        console.error("⚠️ Missing parameters for Firestore query!");
        setIsLoading(false);
        return;
      }

      try {
        // 🔥 Đường dẫn mới: IELTS_TESTS -> Cambridge_15 -> TEST_1 -> LISTENING
        const docRef = doc(db, "IELTS_TESTS", cambridgeId, testId, skill);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAnswers(docSnap.data()); // Lưu toàn bộ dữ liệu vào state
        } else {
          console.error("❌ No such document in Firestore!");
          setAnswers(null);
        }
      } catch (error) {
        console.error(" Firestore Fetch Error:", error);
      }

      setIsLoading(false);
    };

    fetchAnswers();
  }, [cambridgeId, testId, skill]);

  return { answers, isLoading };
};

export default ListeningAnswers;
