const apikey ="AIzaSyDr2MIz6bT3Qy_wnTaWbIhB_UvBGG7d3NQ";

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  //process.env.GEMINI_API_KEY
  const apiKey = "AIzaSyDr2MIz6bT3Qy_wnTaWbIhB_UvBGG7d3NQ";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());

    return result.response.text();
  }
  
  export default run;