import React, { Component } from 'react';
import Navbar from './Navbar'
import ProjectFileReader from './ProjectFileReader'
import Button from './Button'
import Canvas from './Canvas'
import deviceConfigs from '../deviceConfigs';

class App extends Component {
  constructor(props)
  {
    super(props);
    navigator.requestMIDIAccess().then(this.onMIDISuccess, this.onMIDIFailure);
  }
  
  state = {  
    projectFile: undefined,
    color: "#000000",
    layoutConfig: deviceConfigs[1], //Default Launchpad Pro
    inputDevice: undefined,
    inputConfig: undefined,
    outputDevice: undefined,
    outputConfig: undefined,
  };

  updateProjectFile = newProjectFile => {
    this.setState({projectFile: newProjectFile});
  }

  onMIDISuccess = midiAccess => {
    console.log('Got access your MIDI devices.');
    console.log("Input -")
    for (var input of midiAccess.inputs.values())
    {
      console.log(input.name);
      if(input.name.includes("Launchpad MK2"))
      {
        console.log(input.name + " Input Assigned")
        this.setState({inputDevice: input});
        this.setState({inputConfig: deviceConfigs[1]});
        // input.onmidimessage = this.midiInputHandler;
        // console.log()
      }
    }

    console.log("Output -")
    for (var output of midiAccess.outputs.values())
    {
      console.log(output.name);
      if(input.name.includes("Launchpad MK2"))
      {
        console.log(output.name + " Input Assigned")
        this.setState({outputDevice: output});
        this.setState({outputConfig: deviceConfigs[1]});
      }
    }
  }


  onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
  }
  
  render() { 
    return (
      <React.Fragment>
        {/* <Navbar/> */}
        <ProjectFileReader updateProjectFile={this.updateProjectFile}/>
        {/* <Button color={"#000000"} overlay={"#808080"} x={0} y={0} on={this.on} off={this.off}/> */}
        <Canvas projectFile={this.state.projectFile} layoutConfig={this.state.layoutConfig} 
                inputDevice={this.state.inputDevice} inputConfig={this.state.inputConfig}
                outputDevice={this.state.outputDevice} outputConfig={this.state.outputConfig}/>
      </React.Fragment>
    );
  }
}

export default App;