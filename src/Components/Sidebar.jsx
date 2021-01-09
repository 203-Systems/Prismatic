import React, { Component } from "react";

class Sidebar extends Component {

  render() {
    return (
      <React.Fragment>
        
      </React.Fragment>
    );
  }

  onFileChange = event => { 
    this.props.loadProjectFile(event.target.files[0]);
  };
}

export default Sidebar;