import React, { Component } from 'react';
import Navbar from './Navbar'
import ProjectFileReader from './ProjectFileReader'
import Button from './Button'
import Canvas from './Canvas'
import deviceConfigs from '../deviceConfigs';

class App extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  state = {  
    projectFile: undefined,
    color: "#000000",
    deviceConfig: deviceConfigs[0], //Default Launchpad Pro
  };

  updateProjectFile = newProjectFile => {
    this.setState({projectFile: newProjectFile});
  }
  
  render() { 
    return (
      <React.Fragment>
        <div className='container'>
        {/* <Navbar/> */}
        <ProjectFileReader updateProjectFile={this.updateProjectFile} canvasRef={this.canvasRef}/>
        {/* <Button color={"#000000"} overlay={"#808080"} x={0} y={0} on={this.on} off={this.off}/> */}
        <div className='button-container'>
          <Canvas projectFile={this.state.projectFile} deviceConfig={this.state.deviceConfig} ref={this.canvasRef}/>
        </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;