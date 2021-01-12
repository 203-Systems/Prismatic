import React, { Component } from "react";

class AutoplayControl extends Component {
  constructor(props) {
    super(props);
    setInterval(() => {
      if (this.props.autoplay !== undefined) {
        this.forceUpdate();
      }
    }, 1000 / 60);
  }

  render() {
    var playButton = (
      <button
        style={{ width: "50px", marginRight: "10px" }}
        onClick={this.playAutoplay}
      >
        Play
      </button>
    );
    var pauseButton = (
      <button
        style={{ width: "50px", marginRight: "10px" }}
        onClick={this.pauseAutoplay}
      >
        Pause
      </button>
    );
    var stopButton = (
      <button
        style={{ width: "50px", marginRight: "10px" }}
        onClick={this.stopAutoplay}
      >
        Stop
      </button>
    );
    var buttons = [];

    var statusText = "";
    if (this.props.autoplay == undefined || this.props.autoplay.total === 0)
      return null;
    switch (this.props.autoplay.status) {
      case "PLAYING":
        statusText = ` - ${(
          (this.props.autoplay.progress / this.props.autoplay.total) *
          100
        ).toFixed(2)}% completed (${this.props.autoplay.progress}/${
          this.props.autoplay.total
        })`;
        buttons.push(pauseButton);
        break;
      case "PAUSED":
        statusText = ` - ${(
          (this.props.autoplay.progress / this.props.autoplay.total) *
          100
        ).toFixed(2)}% completed (${this.props.autoplay.progress}/${
          this.props.autoplay.total
        }) - Paused`;
        buttons.push(playButton, stopButton);
        break;
      case "STOPPED":
        buttons.push(playButton);
        break;
    }
    return (
      <div>
        <text>{"Autoplay" + statusText}</text>
        <div />
        {buttons}
      </div>
    );
  }

  playAutoplay = () => {
    if (this.props.autoplay !== undefined) {
      this.props.autoplay.play(
        // this.props.canvas.current,
        // this.props.layoutConfig.canvas_origin
      );
    } else {
      alert("No project loaded!");
    }
  };

  stopAutoplay = () => {
    if (this.props.autoplay !== undefined) {
      this.props.autoplay.stop();
    } else {
      alert("No project loaded!");
    }
  };

  pauseAutoplay = () => {
    if (this.props.autoplay !== undefined) {
      this.props.autoplay.pause();
    } else {
      alert("No project loaded!");
    }
  };
}

export default AutoplayControl;
