import React, { Component } from "react";

class ProjectFileReader extends Component {
  render() {
    return (
      <React.Fragment>
        <input type="file" id="projectFilePicker" name="projectFile" accept=".zip" onChange={this.onFileChange}/>
        <label for="projectFilePicker" class="fileSelect">Select File</label>
      </React.Fragment>
    );
  }

  onFileChange = event => { 
    this.props.loadProjectFile(event.target.files[0]);
  };
}

export default ProjectFileReader;