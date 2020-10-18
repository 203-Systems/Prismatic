import React, { Component } from "react";
// import ProjectFileReader from './Components/projectFileReader';
import Button from './Button'
import palette from '../palette'
import Spacer from './Spacer'

class Canvas extends Component {
  constructor(props) {
    super(props);
    setInterval(() => {this.setState({colormap: this.state.colormap})}, 1000/60);
  }

  state = {  
    colormap: new Array(this.props.layoutConfig.width).fill(null).map(
      () => new Array(this.props.layoutConfig.height).fill(palette[0])),
  };

  keypressHistory = new Array(8).fill(null).map(
              () => new Array(this.props.layoutConfig.width).fill(null).map(
              () => new Array(this.props.layoutConfig.height).fill(0)));
  currentChain = 0;
  // overlay = "#808080";

  // shouldUpdate = (nextProps) => !Object.is(this.props.layoutConfig, nextProps.layoutConfig);

  componentDidUpdate(prevProps) {
    if (prevProps.layoutConfig !== this.props.layoutConfig) {
      this.initlalizeCanvas();
    }
    if (prevProps.inputDevice !== this.props.inputDevice || prevProps.inputConfig !== this.props.inputConfig ) {
      this.setupMidiInput(this.props.inputDevice, prevProps.inputDevice);
    }
    // if (prevProps.outputDevice !== this.props.outputDevice || prevProps.outputConfig !== this.props.outputConfig ) {
    //   this.setupMidioutput(this.props.outputDevice, prevProps.outputDevice);
    // }
  }

  initlalizeCanvas()
  {
    this.setState({colormap: new Array(this.props.layoutConfig.width).fill(null).map(
      () => new Array(this.props.layoutConfig.height).fill(palette[0]))});
    this.keypressHistory = new Array(8).fill(null).map(
      () => new Array(this.props.layoutConfig.width).fill(null).map(
      () => new Array(this.props.layoutConfig.height).fill(0)));
    this.currentChain = 0;
  }

  setupMidiInput(newInput, oldInput)
  {
    console.log([newInput, oldInput])
    if(oldInput != undefined)
      oldInput.onmidimessage = null;
    newInput.onmidimessage = this.midiInputHandler;
  } 

  midiInputHandler = (midiMessage) =>
  {
    // console.log(midiMessage.data);
    let [y,x] = this.indexOf2dArray(midiMessage.data[1], this.props.inputConfig.keymap);
    if(x !== -1 && y !== -1)
    {
      // let [offseted_x, offseted_y] = this.arrayCalculation([x, y], this.props.inputConfig.canvas_origin, "-");
      switch(midiMessage.data[0])
      {
        case 144:
          if(midiMessage.data[2] != 0)
          {
            this.keyOn(x, y, this.props.inputConfig);
            break;
          }
        case 128:
          this.keyOff(x, y, this.props.inputConfig);
          break;
      }
    }
  }

  keyOn = (x, y, config = this.props.layoutConfig) => 
  {
    console.log("Note On - " + x.toString() + ' ' + y.toString());

    let [offseted_x, offseted_y] = this.arrayCalculation([x, y], config.canvas_origin, "-");
    console.log([x, y, offseted_x, offseted_y])

    if(this.props.projectFile !== undefined)
    {
      //Sound
      if(this.props.projectFile.keySound !== undefined && this.props.projectFile.keySound[this.currentChain] !== undefined && this.props.projectFile.keySound[this.currentChain][offseted_x] !== undefined && this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y].length > 0)
      {
        let soundIndex = this.keypressHistory[this.currentChain][x][y] % this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y].length;
        // console.log('Play sound ${this.currentChain} ${offseted_x}')
        this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y][soundIndex].stop();
        this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y][soundIndex].play();
      }
      //LED
      if(this.props.projectFile.keyLED !== undefined && this.props.projectFile.keyLED[this.currentChain] !== undefined && this.props.projectFile.keyLED[this.currentChain][offseted_x] !== undefined && this.props.projectFile.keyLED[this.currentChain][offseted_x][offseted_y].length > 0)
      {
        let ledIndex = this.keypressHistory[this.currentChain][x][y] % this.props.projectFile.keyLED[this.currentChain][offseted_x][offseted_y].length;
        this.props.projectFile.keyLED[this.currentChain][offseted_x][offseted_y][ledIndex].play(this);
      }
      //Update History
      if(this.keypressHistory[this.currentChain][x] != undefined && this.keypressHistory[this.currentChain][x][y] != undefined)
        this.keypressHistory[this.currentChain][x][y] += 1;
      //Chain Change
      this.checkChain(x, y, config);
    }
  }

  checkChain = (x, y, config) =>
  {
    for(var i = 0; i < config.chainKey.length; i++) {
      if(config.chainKey[i][0] === x && config.chainKey[i][1] === y)
        this.chainChange(i);
    }
  }

  keyOff = (x, y) => 
  {
    console.log("Note Off - " + x.toString() + ' ' + y.toString());
  }

  playAutoplay = () =>
  {
    if(this.props.projectFile !== undefined && this.props.projectFile.autoplay !== undefined)
    {
      this.initlalizeCanvas();
      this.props.projectFile.autoplay.play(this, this.props.layoutConfig.canvas_origin) 
    }
    else
    {
      alert("No project loaded!")
    }
  }

  chainChange = (chain) =>
  {
    console.log("Chain Changed to " + (chain + 1));
    this.currentChain = chain;
  }

  setColorPalette = (x, y, p) =>
  {
    let [offseted_x, offseted_y] = this.arrayCalculation([x, y], this.props.layoutConfig.canvas_origin, "+");
    this.state.colormap[offseted_x][offseted_y] = palette[p]
    // this.setState({colormap: this.state.colormap})
    if(this.props.outputDevice != undefined)
    {
      let [output_offseted_x, output_offseted_y] = this.arrayCalculation([x, y], this.props.inputConfig.canvas_origin, "+");
      this.props.outputDevice.send([0x90, this.props.outputConfig.keymap[output_offseted_y][output_offseted_x], p])
    }
  }

  setMCColorPalette = (mc, p) =>
  {
    if(this.props.layoutConfig.mcTable[mc] != null)
    {
      let [x, y] = this.props.layoutConfig.mcTable[mc];
      this.state.colormap[x][y] = palette[p]
      // this.setState({colormap: this.state.colormap})
    }
  }

  setColorHEX = (x, y, hex) =>
  {
    let [offseted_x, offseted_y] = this.arrayCalculation([x, y], this.props.layoutConfig.canvas_origin, "+");
    this.state.colormap[offseted_x][offseted_y] = hex
    // this.setState({colormap: this.state.colormap})
  }

  setMCColorHEX = (mc, hex) =>
  {
    if(this.props.layoutConfig.mcTable[mc] != null)
    {
      let [x, y] = this.props.layoutConfig.mcTable[mc];
      this.state.colormap[x][y] = hex
      // this.setState({colormap: this.state.colormap})
    }
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
    for (var i=0, len=matrix.length; i<len; i++) {
      for (var j=0, len2=matrix[i].length; j<len2; j++) {
        if (matrix[i][j] === id) { return [i, j]; }
      }
    }
    return [-1, -1];
  }
  

  render() {
    return (
      <div>
        {this.props.layoutConfig.layout.map((value, y) => {
          return (
            <div style={{ display: "flex" }} className='buttom-row'>
              {this.props.layoutConfig.layout[y].map((value, x) => {
                switch (value) {
                  case "◻":
                    return <Button x={x} y={y} class="LEDButtonSquare"color={this.state.colormap[x][y]} on={this.keyOn} off={this.keyOff}/>;
                  case "⬤":
                    return <Button x={x} y={y} class="LEDButtonSquare" color={this.state.colormap[x][y]} on={this.keyOn} off={this.keyOff}/>;
                  case "◪":
                  case "⬕":
                  case "⬔":
                  case "◩":
                    return <Button x={x} y={y} class="LEDButtonSquare" color={this.state.colormap[x][y]} on={this.keyOn} Zoff={this.keyOff}/>;
                  default:
                    return <div id='spacer' style={{
                      width: '112px'
                    }}></div>;
                }
              })}
            </div>
          );
        })}
      <button onClick={this.playAutoplay}>Auto Play</button>
      </div>
    );
  }
}

export default Canvas