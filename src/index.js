import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import App from "./App";
import serviceWorker from "./serviceWorker";
/**
 * The main class
 */
// Sample puzzle
let puzzle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, false];
ReactDOM.render(
  <App successPuzzle={puzzle} />,
  document.getElementById("root")
);
serviceWorker();
