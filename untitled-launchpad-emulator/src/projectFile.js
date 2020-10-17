class ProjectFile
{
  info = {};
  keySound = [];
  autoplay = [];
  sounds = {};
  keyLED = [];

  constructor(file) {
    this.unpack(file);
  }
  
  async unpack(projectFile)
  {
    let rawFiles = null;
    let JSZip = require("jszip");
    await JSZip.loadAsync(projectFile).then(function(zip){
      rawFiles = zip;
    }, function (e) {
      alert("Failed to extract selected file");
      console.log(e);
      return;
    });

    rawFiles.forEach(function (relativePath, file){
      if(file.name.toLowerCase().endsWith("info"))
      {
        console.log("Info file: " + file.name);
      }
      else if(file.name.toLowerCase().endsWith("keysound"))
      {
        console.log("KeySound file: " + file.name);
      }
      else if(file.name.toLowerCase().endsWith("autoplay"))
      {
        console.log("AutoPlay file: " + file.name);
      }
      else if(file.name.toLowerCase().includes("sounds/"))
      {
        console.log("Sound file: " + file.name);
      }
      else if(file.name.toLowerCase().includes("keyled/"))
      {
        console.log("KeyLED file: " + file.name);
      }
      else
      {
        console.log("Unknown file: " + file.name);
      }
    })


    // for(let file of rawFiles){
    //   console.log(file.name)
    // }
  }
}

export default ProjectFile;