import { useState } from "react";

export const useCustomForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const sendRequest = async (config, applyData) => {
    try {
      setLoading(true);
      const response = await fetch(config.url, {
        method: config.method ? config.method : "GET",
        headers: config.headers ? config.headers : {},
        body: config.method !== "GET" ? JSON.stringify(config.body) : null,
      });
      if (!response.ok) {
        setError("request was failed");
        throw new Error("request was failed");
      }
      const data = await response.json();
      setLoading(false);
      applyData(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    error,
    loading,
    sendRequest,
  };
};
