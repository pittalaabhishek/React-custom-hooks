import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null); // Initialize as null to handle conditional rendering
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true at the start of the fetch
      setError(null); // Clear previous errors

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message); // Set error message if fetch fails
      } finally {
        setIsLoading(false); // Set loading to false once done
      }
    };

    fetchData();
  }, [url]); // Re-fetch data if URL changes

  return [data, isLoading, error];
};

export default useFetch;
