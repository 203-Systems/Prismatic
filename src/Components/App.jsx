import React, { Component } from "react";
import ProjectFileReader from "./ProjectFileReader";
import ProjectFile from "../Engine/projectFile";
import Canvas from "./Canvas";
import config from "../config";
import deviceConfigs from "../deviceConfigs";
import Select from "react-select";
import AutoplayControl from "./AutoplayControl";
import WebMidi from "webmidi";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount()
  {
    this.loadUserConfigPerfences()
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
  }

  state = {
    projectFile: undefined,
    statusMessage: "No project loaded",

    midiInput: {},
    midiOutput: {},

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
    if(projectPack == null)
      return
    this.setState({statusMessage: "Loading Unipack"});
    new ProjectFile(projectPack, this.canvas)
      .then((projectFile) => {
        this.setState({ projectFile: projectFile });
        console.log(projectFile);
        this.setState({statusMessage: `Current Project: ${this.state.projectFile.info["title"]} by ${this.state.projectFile.info["producerName"]}`});
      })
      .catch((message) => {
        this.setState({statusMessage: "Error Loading Unipack"});
        alert("Error Loading Unipack: " + projectPack.name)
        console.error("Error Loading Unipack")
        console.error(message);
      });
  };

  onMIDISuccess(){
    console.log("Got access your MIDI devices.");

    this.updateMidiList();

    WebMidi.addListener("connected", this.onMidiStateChange.bind(this))
    WebMidi.addListener("disconnected", this.onMidiStateChange.bind(this))

    this.loadUserDevicePerfences()
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
    var midiInput = {};
    console.log("Input");
    for (var input of WebMidi.inputs) {
      console.log(input.name);
      midiInput[input.name] = input
    }
    this.setState({ midiInput: midiInput });

    var midiOutput = {};
    console.log();
    console.log("Output");
    for (var output of WebMidi.outputs) {
      console.log(output.name);
      midiOutput[output.name] = output
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
    if (deviceName !== undefined) {
      for (var key in deviceConfigs) {
        if (deviceConfigs[key].midiNameRegex !== undefined && deviceName.match(deviceConfigs[key].midiNameRegex) !== null) {
          var config = deviceConfigs[key];
          console.log(
            `${
              mode ? "Output" : "input"
            } config has been auto assigned to ${key}`
          );
          switch (mode) {
            case "Input":
              this.setInputConfig({label: key, value: config})
              return true;
            case "Output":
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
              {this.state.statusMessage}
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
              options={this.prepSelectConfig(this.state.midiInput)}
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
              options={this.prepSelectConfig(this.state.midiOutput)}
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
            <AutoplayControl project={this.state.projectFile} canvas={this.canvas} layoutConfig={this.state.layoutConfig}/>
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
    localStorage.setItem('perferedLayoutConfig', config.label);
  }

  setInputConfig(config) {
    // console.log(config)
    this.setState({ inputConfigName: config.label });
    this.setState({ inputConfig: config.value }, this.initlizateInputDevice.bind(this));
    localStorage.setItem('perferedInputConfig', config.label);
  }

  setOutputConfig(config) {
    // console.log(config)
    this.setState({ outputConfigName: config.label });
    this.setState({ outputConfig: config.value }, this.initlizateOutputDevice.bind(this));
    localStorage.setItem('perferedOutputConfig', config.label);
  }

  setInputDevice(device, autoPickConfig = true) {
    this.setState({ inputDevice: device.value });
    if(autoPickConfig) this.autoConfigPicker(device.value.name, "Input");
    localStorage.setItem('perferedInputDevice', device.value.name);
  }

  setOutputDevice(device, autoPickConfig = true) {
    // console.log("Output device set to " + device.name);
    this.setState({ outputDevice: device.value });
    if(autoPickConfig) this.autoConfigPicker(device.value.name, "Output");
    localStorage.setItem('perferedOutputDevice', device.value.name);
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

  loadUserConfigPerfences() {
    const perferedLayoutConfig = localStorage.getItem('perferedLayoutConfig');
    if(perferedLayoutConfig !== null && deviceConfigs[perferedLayoutConfig] !== undefined)
    {
      this.setLayoutConfig({label: perferedLayoutConfig, value:deviceConfigs[perferedLayoutConfig]})
    }

    const perferedInputConfig = localStorage.getItem('perferedInputConfig');
    if(perferedInputConfig !== null && deviceConfigs[perferedInputConfig] !== undefined)
    {
      this.setInputConfig({label: perferedInputConfig, value:deviceConfigs[perferedInputConfig]})
    }

    const perferedOutputConfig = localStorage.getItem('perferedOutputConfig');
    if(perferedOutputConfig !== null && deviceConfigs[perferedOutputConfig] !== undefined)
    {
      this.setOutputConfig({label: perferedOutputConfig, value:deviceConfigs[perferedOutputConfig]})
    }
  }

  loadUserDevicePerfences() {
    const perferedInputDevice = localStorage.getItem('perferedInputDevice');
    if(perferedInputDevice !== null && this.state.midiInput[perferedInputDevice] !== undefined)
    {
      this.setInputDevice({label: perferedInputDevice, value:this.state.midiInput[perferedInputDevice]}, false)
    }

    const perferedOutputDevice = localStorage.getItem('perferedOutputDevice');
    if(perferedOutputDevice !== null && this.state.midiOutput[perferedOutputDevice] !== undefined)
    {
      this.setOutputDevice({label: perferedOutputDevice, value:this.state.midiOutput[perferedOutputDevice]}, false)
    }
  }
}

export default App;
