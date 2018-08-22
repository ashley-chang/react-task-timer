import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Display(props) {
  return (
    <div className="display">
      <span className="status spaced">{props.status}</span>
      <span className="time">{props.getTimeString(props.timeRemaining)}</span>
      {props.controlButton}
      {props.resetButton}
    </div>
  );
}

export default Display;
