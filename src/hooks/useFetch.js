import { useEffect, useState } from "react";

const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  // rendering 할 필요가 없는 (ui에 안 보여지는 거면) state로 관리될 필요가 없음
  const [options, setOptions] = useState(null);

  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
  };
  // putData는 await로 promise를 변환하는게 아님,
  // 그냥 setOption만 변경해 주는거임

  const putData = (putData) => {
    setOptions({
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(putData),
    });
  };

  const deleteData = () => {
    setOptions({
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
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

    if (method === "DELETE" && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, method, options]);

  return { data, isPending, error, postData, putData, deleteData };
};

export default useFetch;
