import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const useFetchAnswers = (testId) => {
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    const fetchAnswers = async () => {
      const docRef = doc(db, "listening_tests", testId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAnswers({
          ...docSnap.data(),
        });
      } else {
        console.error("No such document!");
      }
    };

    fetchAnswers();
  }, [testId]);

  return answers;
};

export default useFetchAnswers;
