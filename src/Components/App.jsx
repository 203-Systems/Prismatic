import React, { Component } from "react";
import Navbar from "./Navbar";
import ProjectFileReader from "./ProjectFileReader";
import Button from "./Button";
import Canvas from "./Canvas";
import config from "../config";
import deviceConfigs from "../deviceConfigs";
import Select from 'react-select';

const options = [
  {
    name: "h",
    value: "h",
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    navigator.requestMIDIAccess().then(this.onMIDISuccess, this.onMIDIFailure);
    // console.log(this.prepDeviceConfig())
  }

  state = {
    projectFile: undefined,
    color: "#000000",

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

  updateProjectFile = (newProjectFile) => {
    this.setState({ projectFile: newProjectFile });
  };

  onMIDISuccess = (midiAccess) => {
    console.log("Got access your MIDI devices.");

    var midiInput = [];
    console.log("Input");
    for (var input of midiAccess.inputs.values()) {
      console.log(input.name);
      midiInput.push({label: input.name, value: input})
    }
    console.log(midiInput)
    this.setState({midiInput: midiInput})

    var midiOutput = [];
    console.log();
    console.log("Output");
    for (var output of midiAccess.outputs.values()) {
      console.log(output.name);
      midiOutput.push({label: output.name, value: output})
    }
    this.setState({midiOutput: midiOutput})
  };

  onMIDIFailure() {
    console.log("Could not access your MIDI devices.");
    alert("Could not access your MIDI devices. Try use another web browser or hardware platform")
  }

  
  
  autoConfigPicker(deviceName, mode) {//mode 0 for input, mode 1 for output
    Object.keys(deviceConfigs).forEach(([key, value]) => {
      if (deviceName.match(value) !== null) {
        config = deviceConfigs[key]
        switch(mode)
        {
          case 0:
            this.setState({inputConfig: config});
            return;
          case 1:
            this.setState({outputConfig: config});
            return;
        }
      }
    });
    alert(`Unable to find matching ${mode ? "output" : "input"} config for device ${deviceName}`);
  }

  render() {
    return (
      <React.Fragment>
        <div className="main"> 
          <div className="toolbar"> {/* Not yet made */}
          <ProjectFileReader updateProjectFile={this.updateProjectFile}></ProjectFileReader>
          <Select
            options={this.prepDeviceConfig()}
            autosize={true}
            value={this.state.layoutConfig}
            placeholder="Layout Config"
            onChange={this.configChange}
          />

          <Select
            options={this.state.midiInput}
            autosize={true}
            value={this.state.inputDevice}
            placeholder="Input Device"
            onChange={this.inputChange}
          />
          <Select
            options={this.prepDeviceConfig()}
            autosize={true}
            value={this.state.inputConfig}
            placeholder="Input Device Config"
            onChange={this.setInputConfig.bind(this)}
          />

          <Select
            options={this.state.midiOutput}
            autosize={true}
            value={this.state.outputDevice}
            placeholder="Output Device"
            onChange={this.outputChange}
          />
          <Select
            options={this.prepDeviceConfig()}
            autosize={true}
            value={this.state.outputConfig}
            placeholder="Output Device Config"
            onChange={this.setOutputConfig.bind(this)}
          />
          {/* <button>>Autoplay</button> */}
          </div>
          <div
            className="canvas"
            style={{
              padding: this.state.layoutConfig.padding,
              borderRadius: this.state.layoutConfig.radius,
            }}
          >
            <Canvas
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

  setLayoutConfig(config)
  {
    console.log(config)
    this.setState({layoutConfig: config});
  }

  setInputConfig(config)
  {
    console.log(config)
    this.setState({inputConfig: config});
  }

  setOutputConfig(config)
  {
    console.log(config)
    this.setState({outputConfig: config});
  }

  setInputDevice(device)
  {
    this.setState({inputDevice: device});
    this.autoConfigPicker(device.name, 0);
  }

  setOutputDevice(device)
  {
    this.setState({outputDevice: device});
    this.autoConfigPicker(device.name, 1);
  }

  prepDeviceConfig()
  { 
    var result=[];
    for (var key in deviceConfigs)
    {
      result.push({
        label: key,
        value: deviceConfigs[key],
      })
    }
    return result;
  }
}

export default App;
