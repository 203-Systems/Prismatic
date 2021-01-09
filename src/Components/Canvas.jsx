import React, { Component } from "react";
// import ProjectFileReader from './Components/projectFileReader';
import Button from './Button'
import palette from '../palette'

class Canvas extends Component {
  constructor(props) {
    super(props);
    setInterval(() => {this.setState({colormap: this.state.colormap})}, 1000/60);
  }

  state = {  
    colormap: new Array(this.props.layoutConfig.width).fill(null).map(
      () => new Array(this.props.layoutConfig.height).fill(palette[0])),
  };

  keypressHistory = new Array(this.props.layoutConfig.width).fill(null).map(
    () => new Array(this.props.layoutConfig.height).fill(0));
  currentChain = 0;
  // overlay = "#808080";

  // shouldUpdate = (nextProps) => !Object.is(this.props.layoutConfig, nextProps.layoutConfig);

  shouldComponentUpdate(nextProps) {
    // if (nextProps.projectFile !== this.props.projectFile) {
    //   console.log("Project File Loaded")
    //   this.initlalizeCanvas(undefined, nextProps.projectFile);
    // }

    if (nextProps.layoutConfig !== this.props.layoutConfig) {
      this.initlalizeCanvas(nextProps.layoutConfig);
    }

    if (nextProps.inputDevice !== this.props.inputDevice /* || prevProps.inputConfig !== this.props.inputConfig */ ) {
      this.setupMidiInput(nextProps.inputDevice, this.props.inputDevice);
    }

    return true;
  }

  initlalizeCanvas(config = this.props.layoutConfig, projectFile = this.props.projectFile)
  {
    this.clearCanvas(config);
    this.clearKeypressHistory(config);
    this.currentChain = 0;
  }

  clearCanvas(config = this.props.layoutConfig)
  {
    this.state.colormap = new Array(config.width).fill(null).map(
      () => new Array(config.height).fill(palette[0])) //I write directly into state because that takes so long it will be complete by the time render is over and throw an error already. Since shouldComponentUpdate will enforce update I will give it a pass
  }

  clearKeypressHistory(config = this.props.layoutConfig)
  {
    this.keypressHistory =  new Array(config.width).fill(null).map(
      () => new Array(config.height).fill(0));
  }

  setupMidiInput(newInput, oldInput)
  {
    // console.log([newInput, oldInput])
    if(oldInput !== undefined)
      oldInput.onmidimessage = null;
    if(newInput !== undefined)
      newInput.onmidimessage = this.midiInputHandler;
  } 

  midiInputHandler = (midiMessage) =>
  {
    console.log(midiMessage.data);
    let [x, y] = this.indexOf2dArray(midiMessage.data[1], this.props.inputConfig.keymap);
    console.log([x,y])
    if(x !== NaN && y !== NaN)
    {
      // let [offseted_x, offseted_y] = this.arrayCalculation([x, y], this.props.inputConfig.canvas_origin, "-");
      switch(midiMessage.data[0] >> 4)
      {
        case 9: //Note On
          if(midiMessage.data[2] != 0) //Fall back to note of
          {
            this.keyOn(x, y, this.props.inputConfig);
            break;
          }
        case 8: //Note Off
          this.keyOff(x, y, this.props.inputConfig);
          break;
      }
    }
  }

  keyOn = (x, y, config = this.props.layoutConfig) => 
  {
    let targetChain = undefined;
    console.log("Note On - " + x.toString() + ' ' + y.toString());

    let [offseted_x, offseted_y] = this.arrayCalculation([x, y], config.canvas_origin, "-");
    // console.log([x, y, offseted_x, offseted_y])

    if(this.props.projectFile !== undefined)
    {
      //Sound
      if(this.props.projectFile.keySound !== undefined && this.props.projectFile.keySound[this.currentChain] !== undefined && this.props.projectFile.keySound[this.currentChain][offseted_x] !== undefined && this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y] !== undefined && this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y].length > 0)
      {
        let soundIndex = this.keypressHistory[x][y] % this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y].length;
        this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y][soundIndex][0].loop = false;
        this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y][soundIndex][0].stop();
        // console.log('Play sound ${this.currentChain} ${offseted_x}')
        if(this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y][soundIndex][1] !== undefined)
        {
          if(this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y][soundIndex][1][0] !== undefined
            && this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y][soundIndex][1][0] > 1) // Loop
          {
            this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y][soundIndex][0].loop = this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y][soundIndex][1][0]
            this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y][soundIndex][0].onend = 
            function()
            {
              this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y][soundIndex][0].loop --;
            }
          }

          if(this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y][soundIndex][1][1] !== undefined) //Wormhole
          {
            targetChain = this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y][soundIndex][1][1];
          }
        }
        this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y][soundIndex][0].play();
      }

      //LED
      if(this.props.projectFile.keyLED !== undefined && this.props.projectFile.keyLED[this.currentChain] !== undefined && this.props.projectFile.keyLED[this.currentChain][offseted_x] !== undefined && this.props.projectFile.keyLED[this.currentChain][offseted_x][offseted_y] !== undefined && this.props.projectFile.keyLED[this.currentChain][offseted_x][offseted_y].length > 0)
      {
        let ledIndex = this.keypressHistory[x][y] % this.props.projectFile.keyLED[this.currentChain][offseted_x][offseted_y].length;
        this.props.projectFile.keyLED[this.currentChain][offseted_x][offseted_y][ledIndex].play(this);
      }

      //Update History
      if(this.keypressHistory[x] != undefined && this.keypressHistory[x][y] != undefined)
        this.keypressHistory[x][y] ++;

      //Chain Change
      if(targetChain === undefined)
      {
      this.checkChain(x, y, config);
      }
      else
      {
        this.chainChange(targetChain)
      }
    }
  }

  checkChain = (x, y, config) =>
  {
    for(var i = 0; i < config.chainKey.length; i++) {
      if(i === this.props.projectFile.info.chain)
        return
      if(config.chainKey[i][0] === x && config.chainKey[i][1] === y)
        this.chainChange(i);
    }
  }

  keyOff = (x, y) => 
  {
    console.log("Note Off - " + x.toString() + ' ' + y.toString());
  }

  chainChange = (chain) =>
  {
    console.log("Chain Changed to " + (chain + 1));
    if(chain !== this.currentChain)
      this.clearKeypressHistory(); 
    this.currentChain = chain;
  }

  setColorPalette = (x, y, p) =>
  {
    let [offseted_x, offseted_y] = this.arrayCalculation([x, y], this.props.layoutConfig.canvas_origin, "+");
    this.state.colormap[offseted_x][offseted_y] = palette[p]
    if(this.props.outputDevice != undefined)
    {
      let [output_offseted_x, output_offseted_y] = this.arrayCalculation([x, y], this.props.outputConfig.canvas_origin, "+");
      this.sendMidi("NoteOn", this.props.outputConfig.channel, this.props.outputConfig.keymap[output_offseted_y][output_offseted_x], p)
    }
  }

  setMCColorPalette = (mc, p) =>
  {
    if(this.props.layoutConfig.mcTable[mc] != null)
    {
      let [x, y] = this.props.layoutConfig.mcTable[mc];
      this.state.colormap[x][y] = palette[p]
      if(this.props.outputDevice != undefined && this.props.outputConfig.mcTable[mc] != undefined)
      {
        let [device_x, device_y] = this.props.outputConfig.mcTable[mc];
        this.sendMidi("NoteOn", this.props.outputConfig.channel, this.props.outputConfig.keymap[device_y][device_x], p)
      }
    }
  }

  setColorHEX = (x, y, hex) =>
  {
    let [offseted_x, offseted_y] = this.arrayCalculation([x, y], this.props.layoutConfig.canvas_origin, "+");
    this.state.colormap[offseted_x][offseted_y] = hex
    this.sendSysex(this.props.outputConfig.hexSysexGen(x, y, hex))
  }

  setMCColorHEX = (mc, hex) =>
  {
    if(this.props.layoutConfig.mcTable[mc] != null)
    {
      let [x, y] = this.props.layoutConfig.mcTable[mc];
      this.state.colormap[x][y] = hex
    }
    if(this.props.outputConfig.mcTable[mc] != null)
    {
      this.sendSysex(this.props.outputConfig.hexSysexGen(mc, hex))
    }
  }

  sendMidi(mode, channel, note, value)
  {
    if(typeof(note) === "string")
    {
      let modeKey = note.charAt(0);
      note = parseInt(note.substr(1))
      switch(modeKey)
      {
        case "C":
          mode = "CC"
          break;
        default:
          return;
      }
    } 
    switch(mode)
    {
      case "NoteOn":
        this.props.outputDevice.send([0x90 + channel - 1, note, value])
          break;
      case "NoteOff":
        this.props.outputDevice.send([0x80 + channel - 1, note, value])
        break;
      case "CC":
        this.props.outputDevice.send([0xB0 + channel - 1, note, value])
        break;
    }
  }

  sendSysex(message)
  {
    this.props.outputDevice.send(message)
  }

  // // Overlays a color
  // colorOverlay = (hex, overlay) => {
  //   let [r, g, b] = this.toRGB(hex)
  //   let [r0, g0, b0] = this.toRGB(overlay)
  //   r = Math.round(r * (255 - r0) / 255 + r0);
  //   g = Math.round(g * (255 - g0) / 255 + g0);
  //   b = Math.round(b * (255 - b0) / 255 + b0);
  //   return this.toHEX(r, g, b)
  // }

  // // Converts a CHAD HEX color to a beta RGB color
  // toRGB = (hex) => {
  //   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  //   return [parseInt(result[1], 16),
  //           parseInt(result[2], 16),
  //           parseInt(result[3], 16)]
  // }

  // // Converts a beta RGB color to a CHAD HEX color
  // toHEX = (r, g, b) => '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b)

  // // Converts the value of a given component to CHAD HEX
  // componentToHex = (component) => {
  //   const hex = component.toString(16)
  //   return hex.length === 1 ? '0' + hex : hex
  // }

  arrayCalculation = (array1, array2, operation) =>
  {
    let newArray = [];
    if(array1.length === array2.length)
    {
      switch(operation)
      {
        case "+":
          for(var i = 0; i < array1.length; i++)
          {
            newArray.push(array1[i] + array2[i]);
          }
          return newArray;
        case "-":
          for(var i = 0; i < array1.length; i++)
          {
            newArray.push(array1[i] - array2[i]);
          }
          return newArray;
      }
    }
  }

  indexOf2dArray(id, matrix) {
    for (var y=0, len=matrix.length; y<len; y++) {
      for (var x=0, len2=matrix[y].length; x<len2; x++) {
        if (matrix[y][x] === id) { return [x, y]; }
      }
    }
    return [NaN, NaN];
  }
  

  render() {
    return (
      <div>
        {this.props.layoutConfig.layout.map((value, y) => {
          return (
            <div className='button-row'>
              {this.props.layoutConfig.layout[y].map((value, x) => {
                switch (value) {
                  case "◻":
                    return <Button x={x} y={y} class="LEDButtonSquare"color={this.state.colormap[x][y]} on={this.keyOn} off={this.keyOff}/>;
                  case "⬤":
                    return <Button x={x} y={y} class="LEDButtonCircle75" 
                    color={this.state.colormap[x][y]} 
                    on={this.keyOn} off={this.keyOff}/>;
                  case "◪":
                  case "⬕":
                  case "⬔":
                  case "◩":
                    return <Button x={x} y={y} class="LEDButtonSquare" color={this.state.colormap[x][y]} on={this.keyOn} Zoff={this.keyOff}/>;
                  default:
                    return <div key={"Spacer " + x.toString() + "-" + y.toString()} style={{
                      width: '96px'
                    }}></div>;
                }
              })}
            </div>
          );
        })}
      {/* <button onClick={this.playAutoplay}>Auto Play</button> */}
      </div>
    );
  }
}

export default Canvas