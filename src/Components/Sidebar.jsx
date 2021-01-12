import React, { Component, useContext } from "react";
import Select from "react-select";
import ProjectFileReader from "./ProjectFileReader";
import deviceConfigs from "../deviceConfigs";
import * as context from "../context"

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="sidebar">
          <text>203 | Prismatic (Tech Preview Demo)</text>
          <div className="sidebarItem" />
          <text className="sidebarItem">
            {this.props.state.projectFile !== undefined
              ? `Current Project: ${this.props.state.projectFile.info["title"]} by ${this.props.state.projectFile.info["producerName"]}`
              : "No project loaded"}
          </text>
          <ProjectFileReader
            loadProjectFile={this.props.loadProjectFile}
          ></ProjectFileReader>
          <div className="sidebarItem" />
          <text>UI Layout</text>
          <Select
            className="sidebarItem"
            options={this.prepSelectConfig(deviceConfigs, "layout")}
            autosize={true}
            value={
              this.props.state.layoutConfigName !== undefined
                ? {
                    label: this.props.state.layoutConfigName,
                    value: this.props.state.layoutConfig,
                  }
                : { label: "Layout Config", value: undefined }
            }
            onChange={this.setLayoutConfig.bind(this)}
          />
          <text>Midi Input Device</text>
          <Select
            className="sidebarItem"
            options={this.props.state.midiInput}
            autosize={true}
            value={
              this.props.state.inputDevice !== undefined
                ? {
                    label: this.props.state.inputDevice.name,
                    value: this.props.state.inputDevice,
                  }
                : { label: "Input Device", value: undefined }
            }
            onChange={this.setInputDevice.bind(this)}
          />
          <text>Midi Input Device Config</text>
          <Select
            className="sidebarItem"
            options={this.prepSelectConfig(deviceConfigs, "keymap")}
            autosize={true}
            value={
              this.props.state.inputConfigName !== undefined
                ? {
                    label: this.props.state.inputConfigName,
                    value: this.props.state.inputConfig,
                  }
                : { label: "Input Device Config", value: undefined }
            }
            onChange={this.setInputConfig.bind(this)}
          />
          <text>Midi Output Device</text>
          <Select
            className="sidebarItem"
            options={this.props.state.midiOutput}
            autosize={true}
            value={
              this.props.state.outputDevice !== undefined
                ? {
                    label: this.props.state.outputDevice.name,
                    value: this.props.state.outputDevice,
                  }
                : { label: "Output Device", value: undefined }
            }
            onChange={this.setOutputDevice.bind(this)}
          />
          <text>Midi Output Device Config</text>
          <Select
            className="sidebarItem"
            options={this.prepSelectConfig(deviceConfigs, "keymap")}
            autosize={true}
            value={
              this.props.state.outputConfigName !== undefined
                ? {
                    label: this.props.state.outputConfigName,
                    value: this.props.state.outputConfig,
                  }
                : { label: "Output Device Config", value: undefined }
            }
            onChange={this.setOutputConfig.bind(this)}
          />
          <div />
          <text>
            {"Autoplay" +
              (this.props.state.autoplayProgress === undefined
                ? ""
                : this.props.state.autoplayProgress)}
          </text>
          <div />
          <button
            style={{
              width: "50px",
              marginRight: "10px",
              display: !(
                this.props.state.projectFile !== undefined &&
                this.props.state.projectFile.autoplay.status === "PLAYING"
              )
                ? "inline"
                : "none",
            }}
            onClick={this.playAutoplay}
          >
            Play
          </button>
          <button
            style={{
              width: "50px",
              marginRight: "10px",
              display:
                this.props.state.projectFile !== undefined &&
                this.props.state.projectFile.autoplay.status === "PAUSED"
                  ? "inline"
                  : "none",
            }}
            onClick={this.stopAutoplay}
          >
            Stop
          </button>
          <button
            style={{
              width: "50px",
              marginRight: "10px",
              display:
                this.props.state.projectFile !== undefined &&
                this.props.state.projectFile.autoplay.status === "PLAYING"
                  ? "inline"
                  : "none",
            }}
            onClick={this.pauseAutoplay}
          >
            Pause
          </button>
        </div>
      </React.Fragment>
    );
  }

  prepSelectConfig(config, requiredKey = undefined) {
    var result = [];
    for (var key in config) {
      if (requiredKey === undefined || config[key][requiredKey] !== undefined) {
        result.push({
          label: key,
          value: config[key],
        });
      }
    }
    return result;
  }
}

setLayoutConfig(config) {
  // console.log(config)
  useContext(context.layoutConfig)
  this.setState({ layoutConfigName: config.label });
  this.setState({ layoutConfig: config.value });
}

setInputConfig(config) {
  // console.log(config)
  this.setState({ inputConfigName: config.label });
  this.setState({ inputConfig: config.value });
}

setOutputConfig(config) {
  // console.log(config)
  this.setState({ outputConfigName: config.label });
  this.setState({ outputConfig: config.value });
}

setInputDevice(device) {
  this.setState({ inputDevice: device.value });
  this.autoConfigPicker(device.value.name, 0);
}

setOutputDevice(device) {
  // console.log("Output device set to " + device.name);
  this.setState({ outputDevice: device.value });
  this.autoConfigPicker(device.value.name, 1);
}

export default Sidebar;
