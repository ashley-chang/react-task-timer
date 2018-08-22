import React from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faCog,
  faTimes,
  faPlusSquare,
  faMinusSquare
} from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

import Timer from "./components/timer";

library.add(faPlay, faPause, faCog, faTimes, faPlusSquare, faMinusSquare);

function App() {
  return (
    <div className="App">
      <h1 id="title">Task Timer</h1>
      <Timer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
