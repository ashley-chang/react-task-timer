import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Settings extends Component {
  constructor(props) {
    super(props);
    //need to copy props into state because Settings may or may not be saved...
    //just need initial props for seed data.
    this.state = {
      workTime: this.props.workTime,
      restTime: this.props.restTime,
      isOpen: false
    };
    this.incrementWorkTime = this.incrementWorkTime.bind(this);
    this.decrementWorkTime = this.decrementWorkTime.bind(this);
    this.incrementRestTime = this.incrementRestTime.bind(this);
    this.decrementRestTime = this.decrementRestTime.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
  }

  incrementWorkTime() {
    if (this.state.workTime < 3600) {
      let workTime = this.state.workTime + 60;
      this.setState({ workTime });
    } else {
      this.props.showNotification("maximum work time reached");
    }
    return;
  }

  decrementWorkTime() {
    if (this.state.workTime > 60) {
      let workTime = this.state.workTime - 60;
      this.setState({ workTime });
    } else {
      this.props.showNotification("minimum work time reached");
    }
    return;
  }

  incrementRestTime() {
    if (this.state.restTime < 3600) {
      let restTime = this.state.restTime + 60;
      this.setState({ restTime });
    } else {
      this.props.showNotification("maximum rest time reached");
    }
    return;
  }

  decrementRestTime() {
    if (this.state.restTime > 60) {
      let restTime = this.state.restTime - 60;
      this.setState({ restTime });
    } else {
      this.props.showNotification("minimum rest time reached");
    }
    return;
  }

  toggleSettings() {
    this.state.isOpen === true
      ? this.setState({ isOpen: false })
      : this.setState({ isOpen: true });
  }

  render() {
    let settingsButton;
    let className;
    let content;
    if (this.state.isOpen === true) {
      settingsButton = (
        <FontAwesomeIcon
          className="settings-button icon"
          onClick={this.toggleSettings}
          icon="times"
        />
      );
      className = "settings-wrapper";
      content = (
        <div className="settings-content">
          <div>
            <span>Work</span>
            {this.props.getTimeString(this.state.workTime)}
            <FontAwesomeIcon
              className="increment-button icon fill"
              onClick={this.incrementWorkTime}
              icon="plus-square"
            />
            <FontAwesomeIcon
              className="decrement-button icon fill"
              onClick={this.decrementWorkTime}
              icon="minus-square"
            />
          </div>
          <div>
            <span>Rest</span>
            {this.props.getTimeString(this.state.restTime)}
            <FontAwesomeIcon
              className="increment-button icon fill"
              onClick={this.incrementRestTime}
              icon="plus-square"
            />
            <FontAwesomeIcon
              className="decrement-button icon fill"
              onClick={this.decrementRestTime}
              icon="minus-square"
            />
          </div>
          <div>
            <button
              onClick={() =>
                this.props.saveSettings(
                  this.state.workTime,
                  this.state.restTime
                )
              }
              className="spaced"
            >
              save
            </button>
            <button onClick={this.toggleSettings} className="spaced">
              cancel
            </button>
          </div>
        </div>
      );
    } else {
      settingsButton = (
        <FontAwesomeIcon
          className="settings-button icon"
          onClick={this.toggleSettings}
          icon="cog"
        />
      );
      className = "settings-wrapper minimize";
    }

    return (
      <div className={className}>
        {settingsButton}
        {content}
      </div>
    );
  }
}

export default Settings;
