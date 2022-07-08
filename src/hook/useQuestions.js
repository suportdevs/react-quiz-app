import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestions(videoId) {
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const db = getDatabase();
      const questionRef = ref(db, "quiz/" + videoId + "/questions");
      const questionQuery = query(questionRef, orderByKey());
      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(questionQuery);
        if (snapshot.exists()) {
          setLoading(false);
          setQuestions((pervQuestions) => {
            return [...pervQuestions, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        setError(false);
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [videoId]);
  return {
    error,
    loading,
    questions,
  };
}
