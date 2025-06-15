import { GoogleGenerativeAI } from "@google/generative-ai";
import { OPENAI_KEY } from "./constant";

const genAI = new GoogleGenerativeAI(OPENAI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export default model;
