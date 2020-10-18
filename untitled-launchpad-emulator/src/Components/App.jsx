import React, { Component } from 'react';
import Navbar from './Navbar'
import ProjectFileReader from './ProjectFileReader'
import Button from './Button'

class App extends Component {
  state = {  
    projectFile: undefined,
    color: "#000000",
  };

  updateProjectFile = newProjectFile => {
    this.setState({projectFile: newProjectFile});
  }

  on = (x, y) => 
  {
    console.log("Note On - " + x.toString() + ' ' + y.toString());
    this.state.projectFile.keySound[0][0][0][0].play();
    this.state.projectFile.keyLED[0][0][0][0].play();
  }

  off = (x, y) => 
  {
    console.log("Note Off - " + x.toString() + ' ' + y.toString());
  }
  
  render() { 
    return (
      <React.Fragment>
        {/* <Navbar/> */}
        <ProjectFileReader updateProjectFile={this.updateProjectFile}/>
        <Button color={"#000000"} overlay={"#808080"} x={0} y={0} on={this.on} off={this.off}/>
      </React.Fragment>
    );
  }
}

export default App;