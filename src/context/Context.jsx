import { createContext, useState } from "react";
import run from "../config/gemini";
/// provider component
export const Context = createContext();

/// this is just a functional component, that returns the context provider, which will have the children component.
const ContextProvider = (props) => {
  const [input, setInput] = useState("");

  const [recentPrompt, setRecentPrompt] = useState("");

  const [previousPrompts, setPreviousPrompts] = useState([]);

  const [showResult, setShowResult] = useState(false);

  const [loading, setLoading] = useState(false);

  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = ()=>{
    setLoading (false);
    setShowResult(false);
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
   // setPreviousPrompts((previousPrompts) => [...previousPrompts, input]);
    let response;
    //response = await run(prompt);
    // this input value is set in the main.jsx file from the input field. and it is used here.
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPreviousPrompts (previousPrompts =>[...previousPrompts, input]);
      setRecentPrompt(input);
      response = await run(input);

    }

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        //everywehre we get the double star in the response, it will be added
        // in bold
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    previousPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  /// it contains the children from the props.
  /// the props that is sent here is the App component from the main.jsx file.
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
