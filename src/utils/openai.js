// import { API_BASE_URL, ENDPOINTS } from "./constant";

const getChatCompletion = async (prompt) => {
  const isProd = import.meta.env.PROD;
  const API_BASE_URL = isProd
    ? ""
    : import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
  const CHAT_ENDPOINT = import.meta.env.VITE_API_ENDPOINT_CHAT || "/api/chat";

  try {
    const response = await fetch(`${API_BASE_URL}${CHAT_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Request failed:", error);
    throw error;
  }
};

export default getChatCompletion;
