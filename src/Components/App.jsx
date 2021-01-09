import React, { Component } from "react";
import Navbar from "./Navbar";
import ProjectFileReader from "./ProjectFileReader";
import ProjectFile from "../Engine/projectFile";
import Button from "./Button";
import Canvas from "./Canvas";
import config from "../config";
import deviceConfigs from "../deviceConfigs";
import Select from "react-select";
import download from "downloadjs";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount()
  {
    setTimeout((this.initlization).bind(this), 0) //Hacky way to get initlization done after first render
  }

  initlization()
  {
    if (navigator.requestMIDIAccess != undefined) {
      navigator
        .requestMIDIAccess()
        .then(this.onMIDISuccess, this.onMIDIFailure);
    } else {
      alert("Your device doesn't support WebMidi");
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("unipack")) {
      var unipack_url = urlParams.get("unipack");
      this.downloadProjectFile(unipack_url);
    }

      // this.updateCookie();
  }

  state = {
    projectFile: undefined,

    midiInput: [],
    midiOutput: [],

    layoutConfigName: config.defaultLayout,
    layoutConfig: deviceConfigs[config.defaultLayout],

    inputDevice: undefined,
    inputConfigName: undefined,
    inputConfig: undefined,

    outputDevice: undefined,
    outputConfigName: undefined,
    outputConfig: undefined,
  };

  canvas = React.createRef();

  cookie = {
    perferedLayout: undefined,
    perferedInput: undefined,
    perferedInputConfig: undefined,
    perferedOutput: undefined,
    perferedOutputConfig: undefined,
  }

  downloadProjectFile = (url) => {
    alert("Download Unipack from " + url)
    // var result = null;
    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("GET", "https://cors-anywhere.herokuapp.com/" + url, false);
    // xmlhttp.send();
    // if (xmlhttp.status==200) {
    //   result = xmlhttp.responseBlob;
    //   console.log(xmlhttp)
    // }
    // else
    // {
    //   alert("File download failed: " + xmlhttp.status)
    //   return
    // }
    fetch("https://cors-anywhere.herokuapp.com/" + url).then
    ((r => 
      {var file = r.blob();
        console.log(file);
        this.loadProjectFile(file);
      }).bind(this));
  };

  loadProjectFile = (projectPack) => {
    // console.log(projectPack)
    new ProjectFile(projectPack)
      .then((projectFile) => {
        this.setState({ projectFile: projectFile });
        console.log(projectFile);
      })
      .catch((message) => {
        alert(message);
      });
  };

  onMIDISuccess = (midiAccess) => {
    console.log("Got access your MIDI devices.");

    this.updateMidiList(midiAccess);

    midiAccess.onstatechange = this.onMidiStateChange.bind(this);
  };

  // onMidiStateChange(e)
  // {
  //   console.log(e);
  //   console.log(e.port.name, e.port.type, e.port.state);
  //   if(e.port.state === "connected")
  //   {
  //     if(e.port.type === "input")
  //     {
  //       var midiInput = this.state.midiInput
  //       midiInput.push({label: e.port.name, value: e.port})
  //       this.setState({midiInput: midiInput})
  //       console.log(this.state.midiInput)
  //     }
  //     else if(e.port.type === "output")
  //     {
  //       var midiOutput = this.state.midiOutput
  //       midiOutput.push({label: e.port.name, value: e.port})
  //       this.setState({midiOutput: midiOutput})
  //       console.log(this.state.midiOutput)
  //     }
  //   }
  //   else if(e.port.state === "disconnected")
  //   {
  //     if(e.port.type === "input")
  //     {
  //       var midiInput = this.state.midiInput
  //       for(var i = 0; i < midiInput.length; i++)
  //       {
  //         if(midiInput[i].label === e.port.name)
  //         {
  //           midiInput.splice(i, 1);
  //           break;
  //         }
  //       }
  //       this.setState({midiInput: midiInput})
  //       console.log(midiInput)

  //       if(this.state.inputDevice !== undefined && this.state.inputDevice.name === e.port.name)
  //       {
  //         this.setState({inputDevice: undefined})
  //         this.setState({inputDeviceConfig: undefined})
  //         this.setState({inputDeviceName: undefined})
  //       }
  //     }
  //     else if(e.port.type === "output")
  //     {
  //       var midiOutput = this.state.midiOutput
  //       for(var i = 0; i < midiOutput.length; i++)
  //       {
  //         if(midiOutput[i].label === e.port.name)
  //         {
  //           midiOutput.splice(i, 1);
  //           break;
  //         }
  //       }
  //       this.setState({midiOutput: midiOutput})
  //       console.log(midiOutput)

  //       if(this.state.outputDevice !== undefined && this.state.outputDevice.name === e.port.name)
  //       {
  //         this.setState({outputDevice: undefined})
  //         this.setState({outputDeviceConfig: undefined})
  //         this.setState({outputDeviceName: undefined})
  //       }
  //     }
  //   }
  // }

  onMidiStateChange(e) {
    console.log(e);
    console.log(e.port.name, e.port.type, e.port.state);
    if (e.port.state === "disconnected") {
      if (e.port.type === "input") {
        if (
          this.state.inputDevice !== undefined &&
          this.state.inputDevice.name === e.port.name
        ) {
          this.setState({ inputDevice: undefined });
          this.setState({ inputDeviceConfig: undefined });
          this.setState({ inputDeviceName: undefined });
        }
      } else if (e.port.type === "output") {
        if (
          this.state.outputDevice !== undefined &&
          this.state.outputDevice.name === e.port.name
        ) {
          this.setState({ outputDevice: undefined });
          this.setState({ outputDeviceConfig: undefined });
          this.setState({ outputDeviceName: undefined });
        }
      }
    }

    navigator.requestMIDIAccess().then(this.updateMidiList.bind(this));
  }

  updateMidiList(midiAccess) {
    var midiInput = [];
    console.log("Input");
    for (var input of midiAccess.inputs.values()) {
      console.log(input.name);
      midiInput.push({ label: input.name, value: input });
    }
    this.setState({ midiInput: midiInput });

    var midiOutput = [];
    console.log();
    console.log("Output");
    for (var output of midiAccess.outputs.values()) {
      console.log(output.name);
      midiOutput.push({ label: output.name, value: output });
    }
    this.setState({ midiOutput: midiOutput });
  }

  onMIDIFailure() {
    console.log("Could not access your MIDI devices.");
    alert(
      "Could not access your MIDI devices. Try use another web browser or hardware platform"
    );
  }

  autoConfigPicker(deviceName, mode) {
    //mode 0 for input, mode 1 for output
    if (deviceName !== undefined) {
      for (var key in deviceConfigs) {
        if (deviceName.match(deviceConfigs[key].midiNameRegex) !== null) {
          var config = deviceConfigs[key];
          console.log(
            `${
              mode ? "Output" : "input"
            } config has been auto assigned to ${key}`
          );
          switch (mode) {
            case 0:
              this.setState({ inputConfigName: key });
              this.setState({ inputConfig: config });
              return;
            case 1:
              this.setState({ outputConfigName: key });
              this.setState({ outputConfig: config });
              return;
          }
        }
      }
    }
    alert(
      `Unable to find matching ${
        mode ? "output" : "input"
      } config for device ${deviceName}`
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="main">
          <div className="toolbar">
            <text>203 | Prismatic (Tech Preview Demo)</text>
            <div className="toolbarItem" />
            <text className="toolbarItem">
              {this.state.projectFile !== undefined
                ? `Current Project: ${this.state.projectFile.info["title"]} by ${this.state.projectFile.info["producerName"]}`
                : "No project loaded"}
            </text>
            <ProjectFileReader
              loadProjectFile={this.loadProjectFile}
            ></ProjectFileReader>
            <div className="toolbarItem" />
            <text>UI Layout</text>
            <Select
              className="toolbarItem"
              options={this.prepSelectConfig(deviceConfigs, "layout")}
              autosize={true}
              value={
                this.state.layoutConfigName !== undefined
                  ? {
                      label: this.state.layoutConfigName,
                      value: this.state.layoutConfig,
                    }
                  : { label: "Layout Config", value: undefined }
              }
              onChange={this.setLayoutConfig.bind(this)}
            />
            <text>Midi Input Device</text>
            <Select
              className="toolbarItem"
              options={this.state.midiInput}
              autosize={true}
              value={
                this.state.inputDevice !== undefined
                  ? {
                      label: this.state.inputDevice.name,
                      value: this.state.inputDevice,
                    }
                  : { label: "Input Device", value: undefined }
              }
              onChange={this.setInputDevice.bind(this)}
            />
            <text>Midi Input Device Config</text>
            <Select
              className="toolbarItem"
              options={this.prepSelectConfig(deviceConfigs, "keymap")}
              autosize={true}
              value={
                this.state.inputConfigName !== undefined
                  ? {
                      label: this.state.inputConfigName,
                      value: this.state.inputConfig,
                    }
                  : { label: "Input Device Config", value: undefined }
              }
              onChange={this.setInputConfig.bind(this)}
            />
            <text>Midi Output Device</text>
            <Select
              className="toolbarItem"
              options={this.state.midiOutput}
              autosize={true}
              value={
                this.state.outputDevice !== undefined
                  ? {
                      label: this.state.outputDevice.name,
                      value: this.state.outputDevice,
                    }
                  : { label: "Output Device", value: undefined }
              }
              onChange={this.setOutputDevice.bind(this)}
            />
            <text>Midi Output Device Config</text>
            <Select
              className="toolbarItem"
              options={this.prepSelectConfig(deviceConfigs, "keymap")}
              autosize={true}
              value={
                this.state.outputConfigName !== undefined
                  ? {
                      label: this.state.outputConfigName,
                      value: this.state.outputConfig,
                    }
                  : { label: "Output Device Config", value: undefined }
              }
              onChange={this.setOutputConfig.bind(this)}
            />
            <div />
            <text>
              {"Autoplay" +
                (this.state.autoplayProgress === undefined
                  ? ""
                  : this.state.autoplayProgress)}
            </text>
            <div />
            <button
              style={{
                width: "50px",
                marginRight: "10px",
                display: !(
                  this.state.projectFile !== undefined &&
                  this.state.projectFile.autoplay.status === "PLAYING"
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
                  this.state.projectFile !== undefined &&
                  this.state.projectFile.autoplay.status === "PAUSED"
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
                  this.state.projectFile !== undefined &&
                  this.state.projectFile.autoplay.status === "PLAYING"
                    ? "inline"
                    : "none",
              }}
              onClick={this.pauseAutoplay}
            >
              Pause
            </button>
          </div>
          <div
            className="canvas"
            style={{
              padding: this.state.layoutConfig.padding,
              borderRadius: this.state.layoutConfig.radius,
            }}
          >
            <Canvas
              ref={this.canvas}
              projectFile={this.state.projectFile}
              layoutConfig={this.state.layoutConfig}
              inputDevice={this.state.inputDevice}
              inputConfig={this.state.inputConfig}
              outputDevice={this.state.outputDevice}
              outputConfig={this.state.outputConfig}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  setLayoutConfig(config) {
    // console.log(config)
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

  playAutoplay = () => {
    if (
      this.state.projectFile !== undefined &&
      this.state.projectFile.autoplay !== undefined
    ) {
      this.state.projectFile.autoplay.play(
        this.canvas.current,
        this.state.layoutConfig.canvas_origin,
        // function ([current, total]) {
        //   // this.setState({autoplayProgress: ` - ${(current / total * 100).toFixed(2)}% completed (${current}/${total})`});
        // }.bind(this)
      );
      this.setState({autoplayProgress: " - Playing"})
      } else {
      alert("No project loaded!");
    }
  };

  stopAutoplay = () => {
    if (
      this.state.projectFile !== undefined &&
      this.state.projectFile.autoplay !== undefined
    ) {
      this.state.projectFile.autoplay.stop();
      this.setState({ autoplayProgress: undefined });
    } else {
      alert("No project loaded!");
    }
  };

  pauseAutoplay = () => {
    if (
      this.state.projectFile !== undefined &&
      this.state.projectFile.autoplay !== undefined
    ) {
      this.state.projectFile.autoplay.pause();
      this.setState({
        autoplayProgress: this.state.autoplayProgress + " - Paused",
      });
    } else {
      alert("No project loaded!");
    }
  };

  getCookie() {
    return document.cookie.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');
      prev[name] = value;
      return prev
    }, {});
  }

  updateCookie() {
    this.JSON.stringify(this.cookie);
  }
}

export default App;
