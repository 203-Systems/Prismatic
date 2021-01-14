import React, { Component } from "react";
import ProjectFileReader from "./ProjectFileReader";
import ProjectFile from "../Engine/projectFile";
import Canvas from "./Canvas";
import config from "../config";
import deviceConfigs from "../deviceConfigs";
import Select from "react-select";
import AutoplayControl from "./Autoplay";
import WebMidi from "webmidi";

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
    WebMidi.enable(err => {

      if (err) {
        this.onMIDIFailure()
      } else {
        this.onMIDISuccess();
      }},
      true
    );

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
    fetch("https://cors-anywhere.herokuapp.com/" + url).then
    ((r => 
      {var file = r.blob();
        console.log(file);
        this.loadProjectFile(file);
      }).bind(this));
  };

  loadProjectFile = (projectPack) => {
    // console.log(projectPack)
    new ProjectFile(projectPack, this.canvas)
      .then((projectFile) => {
        this.setState({ projectFile: projectFile });
        console.log(projectFile);
      })
      .catch((message) => {
        alert(message);
      });
  };

  onMIDISuccess(){
    console.log("Got access your MIDI devices.");

    this.updateMidiList();

    WebMidi.addListener("connected", this.onMidiStateChange.bind(this))
    WebMidi.addListener("disconnected", this.onMidiStateChange.bind(this))
  };

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
    this.updateMidiList();
  }
  
  updateMidiList() {
    var midiInput = [];
    console.log("Input");
    for (var input of WebMidi.inputs) {
      console.log(input.name);
      midiInput.push({ label: input.name, value: input });
    }
    this.setState({ midiInput: midiInput });

    var midiOutput = [];
    console.log();
    console.log("Output");
    for (var output of WebMidi.outputs) {
      console.log(output.name);
      midiOutput.push({ label: output.name, value: output });
    }
    this.setState({ midiOutput: midiOutput });
  }


  onMIDIFailure() {
    console.log("Could not access your MIDI devices.");
    alert(
      "Could not access your MIDI devices. Try use another web browser or hardware platform."
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
              this.setInputConfig({label: key, value: config})
              return true;
            case 1:
              this.setOutputConfig({label: key, value: config})
              return true;
          }
        }
      }
    }
    alert(
      `Unable to find matching ${
        mode ? "output" : "input"
      } config for device ${deviceName}`
    );
    return false
  }

  render() {
    return (
      <React.Fragment>
        <div className="main">
          <div className="sidebar">
            <text>203 | Prismatic (Tech Preview Demo)</text>
            <div className="sidebarItem" />
            <text className="sidebarItem">
              {this.state.projectFile !== undefined
                ? `Current Project: ${this.state.projectFile.info["title"]} by ${this.state.projectFile.info["producerName"]}`
                : "No project loaded"}
            </text>
            <ProjectFileReader
              loadProjectFile={this.loadProjectFile}
            ></ProjectFileReader>
            <div className="sidebarItem" />
            <text>UI Layout</text>
            <Select
              className="sidebarItem"
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
              className="sidebarItem"
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
              className="sidebarItem"
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
              className="sidebarItem"
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
              className="sidebarItem"
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
            <AutoplayControl autoplay={this.state.projectFile === undefined ? undefined : this.state.projectFile.autoplay} canvas={this.canvas} layoutConfig={this.state.layoutConfig}/>
          </div>
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
    this.setState({ inputConfig: config.value }, this.initlizateInputDevice.bind(this));
  }

  setOutputConfig(config) {
    // console.log(config)
    this.setState({ outputConfigName: config.label });
    this.setState({ outputConfig: config.value }, this.initlizateOutputDevice.bind(this));
  }

  setInputDevice(device) {
    this.setState({ inputDevice: device.value });
    this.autoConfigPicker(device.value.name, 0);
  }

  setOutputDevice(device) {
    // console.log("Output device set to " + device.name);
    console.log(device)
    this.setState({ outputDevice: device.value });
    this.autoConfigPicker(device.value.name, 1);
  }

  initlizateInputDevice()
  {
    if(this.state.inputConfig !== undefined && this.state.inputDevice !== undefined)
    {
      if(this.state.inputConfig.inputInfoMessage !== undefined)
      {
        for(var i in this.state.inputConfig.infoMessage)
        {
          alert(this.state.inputConfig.inputInfoMessage[i])
        }
      }
    }
  }

  initlizateOutputDevice()
  {
    //Sysex
    if(this.state.outputConfig !== undefined && this.state.outputDevice !== undefined)
    {
      if(this.state.outputConfig.initializationSysex !== undefined)
      {
        for(var i in this.state.outputConfig.initializationSysex)
        {
          this.state.outputDevice.sendSysex([], this.state.outputConfig.initializationSysex[i])
        }
      }
      if(this.state.outputConfig.outputInfoMessage !== undefined)
      {
        for(var i in this.state.outputConfig.infoMessage)
        {
          alert(this.state.outputConfig.outputInfoMessage[i])
        }
      }
    }
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
