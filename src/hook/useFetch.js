import { useEffect, useState } from "react";

export default function useFetch(url, method, headers) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function requestFetch() {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(url, {
          method: method || "GET",
          headers: headers,
        });
        const data = await response.json();
        setLoading(false);
        setResult(data);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    }
    requestFetch();
  }, []);

  return {
    error,
    loading,
    result,
  };
}
