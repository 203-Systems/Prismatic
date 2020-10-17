import React, { Component } from 'react';
import ProjectFileReader from './projectFileReader'

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
        <ProjectFileReader updateProjectFile={this.updateProjectFile}/>
      </React.Fragment>
    );
  }
}

export default App;