import React, { Component } from "react";

class ProjectFileReader extends Component {
  render() {
    return (
      <React.Fragment>
        <input type="file" id="projectFilePicker" name="projectFile" accept=".zip" onChange={this.onFileChange}/>
      </React.Fragment>
    );
  }

  onFileChange = event => { 
    this.props.updateProjectFile(event.target.files[0]);
  };
}

export default ProjectFileReader;