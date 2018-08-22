import React, { Component } from "react";

import Display from "./display";
import Settings from "./settings";
import Notification from "./notification";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workTime: 1500,
      restTime: 300, //5 min
      timeRemaining: 1500, //25 min,
      status: "work", //work, rest
      isActive: false,
      showNotification: false
    }; //time in seconds
    this.run = this.run.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.getTimeString = this.getTimeString.bind(this);
    this.showNotification = this.showNotification.bind(this);
  }

  run() {
    console.log("run");
    this.setState({ isActive: true });
    this.timeElapse = () => {
      let timeRemaining = this.state.timeRemaining;
      if (this.state.timeRemaining > 0) {
        timeRemaining--;
        this.setState({ timeRemaining });
      } else {
        //reached 0
        if (this.state.status === "work") {
          this.setState({ status: "rest", timeRemaining: this.state.restTime });
        } else if (this.state.status === "rest") {
          this.setState({ status: "work", timeRemaining: this.state.workTime });
        }

        //this.countDown = setInterval(this.timeElapse, 1000);
        console.log("cleared");
      }
    };
    this.countDown = setInterval(this.timeElapse, 1000);
    return;
  }

  pause() {
    clearInterval(this.countDown);
    this.setState({ isActive: false });
    return;
  }

  reset() {
    clearInterval(this.countDown);
    let status = this.state.status;
    if (status === "work") {
      this.setState({ timeRemaining: this.state.workTime });
    } else if (status === "rest") {
      this.setState({ timeRemaining: this.state.restTime });
    }
    return;
  }

  saveSettings(workTime, restTime) {
    this.pause();
    this.setState({ workTime: workTime, restTime: restTime });
    if (this.state.status === "work") {
      this.setState({ timeRemaining: workTime });
    } else if (this.state.status === "rest") {
      this.setState({ timeRemaining: restTime });
    }
    this.showNotification("settings saved!");
    return;
  }

  getTimeString(inputSeconds) {
    let minutes = inputSeconds / 60;
    let seconds = inputSeconds % 60;
    minutes = Math.floor(minutes);
    if (seconds < 10 && seconds > -1) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }

  showNotification(message) {
    if (this.state.showNotification === true) {
      clearTimeout(this.notificationID); //fixes timing issues on consecutive notif
    }
    this.setState({ showNotification: true });
    this.notificationMessage = message;
    this.notificationID = setTimeout(() => {
      this.setState({ showNotification: false });
      this.notificationMessage = null;
    }, 2200);
  }

  render() {
    let resetButton = (
      <button onClick={this.reset} className="spaced">
        reset
      </button>
    );
    let controlButton;
    if (this.state.isActive === false) {
      controlButton = (
        <button className="control-button icon" onClick={this.run}>
          <FontAwesomeIcon icon="play" />
        </button>
      );
    } else if (this.state.isActive === true) {
      controlButton = (
        <button className="control-button icon" onClick={this.pause}>
          <FontAwesomeIcon icon="pause" />
        </button>
      );
    }

    return (
      <div className="wrapper">
        <Settings
          saveSettings={this.saveSettings}
          workTime={this.state.workTime}
          restTime={this.state.restTime}
          getTimeString={this.getTimeString}
          showNotification={this.showNotification}
        />
        <Display
          status={this.state.status}
          timeRemaining={this.state.timeRemaining}
          getTimeString={this.getTimeString}
          controlButton={controlButton}
          resetButton={resetButton}
        />
        <Notification
          show={this.state.showNotification}
          message={this.notificationMessage}
        />
      </div>
    );
  }
}

export default Timer;
