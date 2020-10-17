import React, { Component } from "react";
import ProjectFile from "../projectFile";

class ProjectFileReader extends Component {
  render() {
    return (
      <React.Fragment>
        <label for="projectFilePicker">Select a project file:</label>
        <input type="file" id="projectFilePicker" name="projectFile" accept=".zip" onChange={this.onFileChange}/>
      </React.Fragment>
    );
  }

  onFileChange = event => { 
    var projectFile = new ProjectFile(event.target.files[0]);
  };
}

export default ProjectFileReader;