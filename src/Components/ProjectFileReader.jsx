import React, { Component } from "react";
import Button from '@material-ui/core/Button';

function ProjectFileReader() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const hiddenFileInput = React.useRef(null);

  const fileinputClick = event => 
  {
    hiddenFileInput.current.click();
  };

  const onFileChange = event => { 
    this.props.loadProjectFile(event.target.files[0]);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="default" onClick={fileinputClick}>
        Open Project
      </Button>

      <input style={{display: 'none'}} ref={hiddenFileInput} type="file" id="projectFilePicker" name="projectFile" accept=".zip" onChange={onFileChange}/>
    
    </React.Fragment>
  );

}

export default ProjectFileReader;