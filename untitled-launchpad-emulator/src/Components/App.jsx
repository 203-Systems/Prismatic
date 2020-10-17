import React, { Component } from 'react';
import Navbar from './Navbar'
import ProjectFileReader from './ProjectFileReader'
import Button from './Button'

class App extends Component {
  state = {  
    projectFile: undefined,
  };

  updateProjectFile = newProjectFile => {
    this.setState({projectFile: newProjectFile});
  }


  
  render() { 
    return (
      <React.Fragment>
        {/* <Navbar/> */}
        <ProjectFileReader updateProjectFile={this.updateProjectFile}/>
        <Button/>
      </React.Fragment>
    );
  }
}

export default App;