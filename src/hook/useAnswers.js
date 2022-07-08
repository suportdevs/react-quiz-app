import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswers(videoId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      const db = getDatabase();
      const answersRef = ref(db, "answers/" + videoId + "/questions");
      const answersQuery = query(answersRef, orderByKey());
      try {
        setLoading(false);
        setError(true);
        const snapshot = await get(answersQuery);
        if (snapshot.exists()) {
          setLoading(true);
          setAnswers((prevAnswers) => {
            return [...prevAnswers, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        setLoading(true);
        setError(false);
      }
    }
    fetchAnswers();
  }, [videoId]);

  return {
    error,
    loading,
    answers,
  };
}
