import { useEffect, useState } from "react";

const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
  };

  const updateData = (updateData) => {
    setOptions({
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      setIsPending(true);

      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new error(res.statusText);
        }
        const data = await res.json();

        setIsPending(false);
        setError(null);
        setData(data);
      } catch (err) {
        if (err.name === "AbortError") {
          // console.log("the fetch was aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch the data");
        }
      }
    };

    if (method === "GET") {
      fetchData();
    }

    if (method === "POST" && options) {
      fetchData(options);
    }

    if (method === "PUT" && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, method, options]);

  return { data, isPending, error, postData, updateData };
};

export default useFetch;
