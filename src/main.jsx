import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ContextProvider from "./context/Context.jsx";

//This creates a new root element for the React app, which will be attached to the root element retrieved in step 1.
createRoot(
  //his gets a reference to an HTML element with the id root in the DOM.
  // This element will serve as the container for the React app.
  // this is the root element in the index.html where the React app will be rendered. even all the screens. 
  document.getElementById("root")
)
  //This method renders the React app to the DOM, starting from the root element created
  .render(
    //This is a wrapper component that enables strict mode for the React app.
    //Strict mode helps with debugging and warning about potential issues, such as deprecated APIs or unexpected side effects.
    <ContextProvider>
      <App />
    </ContextProvider>
  );
