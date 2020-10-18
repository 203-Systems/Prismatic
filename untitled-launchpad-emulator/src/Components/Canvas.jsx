import React, { Component } from "react";
// import ProjectFileReader from './Components/projectFileReader';
import Button from './Button'
import palette from '../palette'

class Canvas extends Component {
  state = {  
    colormap: new Array(this.props.deviceConfig.width).fill(null).map(
      () => new Array(this.props.deviceConfig.height).fill("#000000")),
  };

  constructor(props) {
    super(props);
    // this.generateColorMap();
    React.forwardRef(props, this);
    console.log(this.state.colormap);
  }

  keypressHistory = undefined;

  keypressHistory = new Array(8).fill(null).map(
              () => new Array(this.props.deviceConfig.width).fill(null).map(
              () => new Array(this.props.deviceConfig.height).fill(0)));
  currentChain = 0;
  overlay = "#808080";

  shouldUpdate = (nextProps) => !Object.is(this.props.deviceConfig, nextProps.deviceConfig);

  // async generateColorMap() {
  //   let newColormap = 
  //   await this.promisedSetState({colormap: newColormap});
  // }

  promisedSetState = (newState) => new Promise(resolve => this.setState(newState, resolve));

  keyOn = (x, y) => 
  {
    console.log("Note On - " + x.toString() + ' ' + y.toString());
    let [offseted_x, offseted_y] = this.arrayCalculation([x, y], this.props.deviceConfig.canvas_origin, "-");
    if(this.props.projectFile !== undefined)
    {
      //Sound
      if(this.props.projectFile.keySound !== undefined && this.props.projectFile.keySound[offseted_x] !== undefined && this.props.projectFile.keySound[offseted_x][offseted_y] !== undefined)
      {
        let soundIndex = this.keypressHistory[this.currentChain][x][y] % this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y].length;
        this.props.projectFile.keySound[this.currentChain][offseted_x][offseted_y][soundIndex].play();
      }
      //LED
      if(this.props.projectFile.keyLED !== undefined && this.props.projectFile.keyLED[offseted_x] !== undefined && this.props.projectFile.keyLED[offseted_x][offseted_y] !== undefined)
      {
        let ledIndex = this.keypressHistory[this.currentChain][x][y] % this.props.projectFile.keyLED[this.currentChain][offseted_x][offseted_y].length;
        this.props.projectFile.keyLED[this.currentChain][offseted_x][offseted_y][ledIndex].play();
      }
      //Chain Change
      this.checkChain(x, y);
      //Update History
      this.keypressHistory[this.currentChain][x][y] += 1;
    }
  }

  checkChain = (x, y) =>
  {
    for(var i = 0; i < this.props.deviceConfig.chainKey.length; i++) {
      if(this.props.deviceConfig.chainKey[i][0] === x && this.props.deviceConfig.chainKey[i][1] === y)
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
    this.currentChain = chain;
  }

  setColorPalette = (x, y, p) =>
  {
    let [offseted_x, offseted_y] = this.arrayCalculation([x, y], this.props.deviceConfig.canvas_origin, "+");
    this.setState({colormap: this.state.colormap[offseted_x][offseted_y] = palette[p]})
  }

  setMCColorPalette = (mc, p) =>
  {
    let [x, y] = this.props.deviceConfig.mcTable[mc];
    this.setState({colormap: this.state.colormap[x][y] = palette[p]})
  }

  setColorHEX = (x, y, hex) =>
  {
    let [offseted_x, offseted_y] = this.arrayCalculation([x, y], this.props.deviceConfig.canvas_origin, "+");
    this.setState({colormap: this.state.colormap[offseted_x][offseted_y] = hex})
  }

  setMCColorHEX = (mc, hex) =>
  {
    let [x, y] = this.props.deviceConfig.mcTable[mc];
    this.setState({colormap: this.state.colormap[x][y] = hex})
  }

  // Overlays a color
  colorOverlay = (hex, overlay) => {
    let [r, g, b] = this.toRGB(hex)
    let [r0, g0, b0] = this.toRGB(overlay)
    r = r * (255 - r0) / 255 + r0;
    g = g * (255 - g0) / 255 + g0;
    b = b * (255 - b0) / 255 + b0;
    return this.toHEX(r, g, b)
  }

  // Converts a CHAD HEX color to a beta RGB color
  toRGB = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result === null) return [0, 0, 0];
    return [parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)]
  }

  // Converts a beta RGB color to a CHAD HEX color
  toHEX = (r, g, b) => '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b)

  // Converts the value of a given component to CHAD HEX
  componentToHex = (component) => {
    const hex = component.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

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

  render() {
    return (
      <div>
        {this.props.deviceConfig.layout.map((value, y) => {
          return (
            <div style={{ display: "flex" }}>
              {this.props.deviceConfig.layout[y].map((value, x) => {
                switch (value) {
                  case "◻":
                    return <Button x={x} y={y} color={this.colorOverlay(this.state.colormap[x][y], this.overlay)} on={this.keyOn} off={this.keyOff}/>;
                  case "⬤":
                    return <Button x={x} y={y} color={this.colorOverlay(this.state.colormap[x][y], this.overlay)} on={this.keyOn} off={this.keyOff}/>;
                  case "◪":
                  case "⬕":
                  case "⬔":
                  case "◩":
                    return <Button x={x} y={y} color={this.colorOverlay(this.state.colormap[x][y], this.overlay)} on={this.keyOn} Zoff={this.keyOff}/>;
                  default:
                    return <spacer className = "Spacer"></spacer>;
                }
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Canvas