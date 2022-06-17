import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

ReactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

//
reportWebVitals();