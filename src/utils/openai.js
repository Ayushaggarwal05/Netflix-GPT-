import OpenAI from "openai";
import { OPENAI_KEY } from "./constant";

const openai = new OpenAI({
  apiKey: "AIzaSyBNK473IvuN-lYJWjkTzWAHUMfAy6RaB9U", // This is the default and can be omitted
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  dangerouslyAllowBrowser: true, // 🧨 enables browser usage , someone can see my key better to use a backend
});

export default openai;
