import React, { Component } from "react";
// import ProjectFileReader from './Components/projectFileReader';
import Button from "./Button";
import {palette, rawPalette} from "../palette";

class Canvas extends Component {
  constructor(props) {
    super(props);
    setInterval(() => {
      this.setState({ colormap: this.state.colormap });
    }, 1000 / 60);
  }

  state = {
    colormap: new Array(this.props.layoutConfig.width)
      .fill(null)
      .map(() => new Array(this.props.layoutConfig.height).fill(palette[0])),
  };

  keypressHistory = new Array(this.props.layoutConfig.width)
    .fill(null)
    .map(() => new Array(this.props.layoutConfig.height).fill(0));
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

    if (
      nextProps.inputDevice !==
      this.props
        .inputDevice /* || prevProps.inputConfig !== this.props.inputConfig */
    ) {
      this.setupMidiInput(nextProps.inputDevice, this.props.inputDevice);
    }

    return true;
  }

  initlalizeCanvas(
    config = this.props.layoutConfig,
    projectFile = this.props.projectFile
  ) {
    this.clearCanvas(config);
    this.clearKeypressHistory(config);
    this.currentChain = 0;
  }

  clearCanvas(config = this.props.layoutConfig) {
    this.state.colormap = new Array(config.width)
      .fill(null)
      .map(() => new Array(config.height).fill(palette[0])); //I write directly into state because that takes so long it will be complete by the time render is over and throw an error already. Since shouldComponentUpdate will enforce update I will give it a pass
  }

  clearKeypressHistory(config = this.props.layoutConfig) {
    this.keypressHistory = new Array(config.width)
      .fill(null)
      .map(() => new Array(config.height).fill(0));
  }

  setupMidiInput(newInput, oldInput) {
    // console.log([newInput, oldInput])
    if (oldInput !== undefined) oldInput.onmidimessage = null;
    if (newInput !== undefined) newInput.onmidimessage = this.midiInputHandler;
  }

  midiInputHandler = (midiMessage) => {
    console.log(midiMessage.data);
    let [x, y] = this.indexOf2dArray(
      midiMessage.data[1],
      this.props.inputConfig.keymap
    );
    console.log([x, y]);
    if (x !== NaN && y !== NaN) {
      // let [offseted_x, offseted_y] = this.arrayCalculation([x, y], this.props.inputConfig.canvas_origin, "-");
      switch (midiMessage.data[0] >> 4) {
        case 9: //Note On
          if (midiMessage.data[2] != 0) {
            //Fall back to note of
            this.keyOn(x, y, this.props.inputConfig);
            break;
          }
        case 8: //Note Off
          this.keyOff(x, y, this.props.inputConfig);
          break;
      }
    }
  };

  keyOn = (x, y, config = this.props.layoutConfig, bypassOffset = false) => {
    let targetChain = undefined;
    // console.log("Note On - " + x.toString() + " " + y.toString());

    let [offseted_x, offseted_y] = [x, y];
    if (!bypassOffset) {
      [offseted_x, offseted_y] = this.arrayCalculation(
        [x, y],
        config.canvas_origin,
        "-"
      );
    }
    // console.log([x, y, offseted_x, offseted_y])

    if (this.props.projectFile !== undefined) {
      //Sound
      if (
        this.props.projectFile.keySound !== undefined &&
        this.props.projectFile.keySound[this.currentChain] !== undefined &&
        this.props.projectFile.keySound[this.currentChain][offseted_x] !==
          undefined &&
        this.props.projectFile.keySound[this.currentChain][offseted_x][
          offseted_y
        ] !== undefined &&
        this.props.projectFile.keySound[this.currentChain][offseted_x][
          offseted_y
        ].length > 0
      ) {
        let soundIndex =
          this.keypressHistory[x][y] %
          this.props.projectFile.keySound[this.currentChain][offseted_x][
            offseted_y
          ].length;
        this.props.projectFile.keySound[this.currentChain][offseted_x][
          offseted_y
        ][soundIndex][0].loop = false;
        this.props.projectFile.keySound[this.currentChain][offseted_x][
          offseted_y
        ][soundIndex][0].stop();
        // console.log('Play sound ${this.currentChain} ${offseted_x}')
        if (
          this.props.projectFile.keySound[this.currentChain][offseted_x][
            offseted_y
          ][soundIndex][1] !== undefined
        ) {
          if (
            this.props.projectFile.keySound[this.currentChain][offseted_x][
              offseted_y
            ][soundIndex][1][0] !== undefined &&
            this.props.projectFile.keySound[this.currentChain][offseted_x][
              offseted_y
            ][soundIndex][1][0] > 1
          ) {
            // Loop
            this.props.projectFile.keySound[this.currentChain][offseted_x][
              offseted_y
            ][soundIndex][0].loop = this.props.projectFile.keySound[
              this.currentChain
            ][offseted_x][offseted_y][soundIndex][1][0];
            this.props.projectFile.keySound[this.currentChain][offseted_x][
              offseted_y
            ][soundIndex][0].onend = function () {
              this.props.projectFile.keySound[this.currentChain][offseted_x][
                offseted_y
              ][soundIndex][0].loop--;
            };
          }

          if (
            this.props.projectFile.keySound[this.currentChain][offseted_x][
              offseted_y
            ][soundIndex][1][1] !== undefined
          ) {
            //Wormhole
            targetChain = this.props.projectFile.keySound[this.currentChain][
              offseted_x
            ][offseted_y][soundIndex][1][1];
          }
        }
        this.props.projectFile.keySound[this.currentChain][offseted_x][
          offseted_y
        ][soundIndex][0].play();
      }

      //LED
      if (
        this.props.projectFile.keyLED !== undefined &&
        this.props.projectFile.keyLED[this.currentChain] !== undefined &&
        this.props.projectFile.keyLED[this.currentChain][offseted_x] !==
          undefined &&
        this.props.projectFile.keyLED[this.currentChain][offseted_x][
          offseted_y
        ] !== undefined &&
        this.props.projectFile.keyLED[this.currentChain][offseted_x][offseted_y]
          .length > 0
      ) {
        let ledIndex =
          this.keypressHistory[x][y] %
          this.props.projectFile.keyLED[this.currentChain][offseted_x][
            offseted_y
          ].length;
        this.props.projectFile.keyLED[this.currentChain][offseted_x][
          offseted_y
        ][ledIndex].play(this);
      }

      //Update History
      if (
        this.keypressHistory[x] != undefined &&
        this.keypressHistory[x][y] != undefined
      )
        this.keypressHistory[x][y]++;

      //Chain Change
      if (targetChain === undefined) {
        this.checkChain(x, y, config);
      } else {
        this.chainChange(targetChain);
      }
    }
  };

  checkChain = (x, y, config) => {
    for (
      var i = 0;
      i < Math.min(config.chainKey.length, this.props.projectFile.info.chain);
      i++
    ) {
      if (config.chainKey[i][0] === x && config.chainKey[i][1] === y)
        this.chainChange(i);
    }
  };

  keyOff = (x, y) => {
    console.log("Note Off - " + x.toString() + " " + y.toString());
  };

  chainChange = (chain) => {
    console.log("Chain Changed to " + (chain + 1));
    if (chain !== this.currentChain) this.clearKeypressHistory();
    this.currentChain = chain;
  };

  setColor = (x, y, color) => {
    this.setColorCanvas(x, y, color);
    this.setColorOutput(x, y, color);
  };

  setColorCanvas(x, y, color) {
    var [canvas_x, canvas_y] = [undefined, undefined]
    if (x === "l") {
      [canvas_x, canvas_y] = this.props.layoutConfig.lKey;
    } else if (x === "mc") {
      [canvas_x, canvas_y] = this.props.layoutConfig.mcTable[y];
    } else {
      [canvas_x, canvas_y] = this.arrayCalculation(
        [x, y],
        this.props.layoutConfig.canvas_origin,
        "+"
      );
    }

    if (/^#[0-9A-F]{6}$/i.test(color)) {
      //Check if it is a Hex String
      this.state.colormap[canvas_x][canvas_y] = color;
    } else {
      this.state.colormap[canvas_x][canvas_y] = palette[color];
    }
  }

  setColorOutput(x, y, color) {
    if (
      this.props.outputDevice !== undefined &&
      this.props.outputConfig !== undefined
    ) {
      var [output_x, output_y] = [undefined, undefined]
      if (x === "l") {
        [output_x, output_y] = this.props.outputConfig.lKey;
      } else if (x === "mc") {
        [output_x, output_y] = this.props.outputConfig.mcTable[y];
      } else {
        [output_x, output_y] = this.arrayCalculation(
          [x, y],
          this.props.outputConfig.canvas_origin,
          "+"
        );
      }

      if (/^#[0-9A-F]{6}$/i.test(color)) {
        //Check if it is a Hex String
        this.sendSysex(
          this.props.outputConfig.hexSysexGen(output_y, output_x, color)
        );
      } else {
        this.sendMidi(
          "NoteOn",
          this.props.outputConfig.channel,
          this.props.outputConfig.keymap[output_y][output_x],
          color
        );
      }
    }
  }

  sendMidi(mode, channel, note, value = 0) {
    if (typeof note === "string") {
      let modeKey = note.charAt(0);
      note = parseInt(note.substr(1));
      switch (modeKey) {
        case "C":
          mode = "CC";
          break;
        case "X":
          mode = "HEX";
          break;
        default:
          return;
      }
    }
    switch (mode) {
      case "NoteOn":
        this.props.outputDevice.send([0x90 + channel - 1, note, value]);
        break;
      case "NoteOff":
        this.props.outputDevice.send([0x80 + channel - 1, note, value]);
        break;
      case "CC":
        this.props.outputDevice.send([0xb0 + channel - 1, note, value]);
        break;
      case "HEX":
        this.sendSysex(
          this.props.outputConfig.hexSysexGen(note, rawPalette[value])
        );
        break;
    }
  }

  sendSysex(message) {
    this.props.outputDevice.send(message);
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

  arrayCalculation = (array1, array2, operation) => {
    let newArray = [];
    if (array1.length === array2.length) {
      switch (operation) {
        case "+":
          for (var i = 0; i < array1.length; i++) {
            newArray.push(array1[i] + array2[i]);
          }
          return newArray;
        case "-":
          for (var i = 0; i < array1.length; i++) {
            newArray.push(array1[i] - array2[i]);
          }
          return newArray;
      }
    }
  };

  indexOf2dArray(id, matrix) {
    for (var y = 0, len = matrix.length; y < len; y++) {
      for (var x = 0, len2 = matrix[y].length; x < len2; x++) {
        if (matrix[y][x] === id) {
          return [x, y];
        }
      }
    }
    return [NaN, NaN];
  }

  stopKeyLED() {
    for (var chain = 0; chain < this.props.projectFile.info.chain; chain++) {
      for (
        var x = 0;
        chain < this.props.projectFile.keyLED[chain].length;
        x++
      ) {
        for (
          var y = 0;
          chain < this.props.projectFile.keyLED[chain][x].length;
          y++
        ) {
          for (
            var index = 0;
            chain < this.props.projectFile.keyLED[chain][x][y].length;
            index++
          ) {
            if (
              this.props.projectFile.keyLED[chain][x][y][index] !== undefined
            ) {
              this.props.projectFile.keyLED[chain][x][y][index].stop();
            }
          }
        }
      }
    }
  }

  stopKeySound() {
    for (var chain = 0; chain < this.props.projectFile.info.chain; chain++) {
      for (
        var x = 0;
        chain < this.props.projectFile.keySound[chain].length;
        x++
      ) {
        for (
          var y = 0;
          chain < this.props.projectFile.keySound[chain][x].length;
          y++
        ) {
          for (
            var index = 0;
            chain < this.props.projectFile.keySound[chain][x][y].length;
            index++
          ) {
            this.props.projectFile.keySound[chain][x][y][index].stop();
          }
        }
      }
    }
  }

  stopAll() {
    // this.stopKeyLED()
    // this.stopKeySound()
    // this.clearCanvas()
  }

  render() {
    return (
      <div
        className="canvas"
        style={{
          padding: this.props.layoutConfig.padding,
          borderRadius: this.props.layoutConfig.radius,
        }}
      >
        {this.props.layoutConfig.layout.map((value, y) => {
          return (
            <div className="button-row">
              {this.props.layoutConfig.layout[y].map((value, x) => {
                switch (value) {
                  case "◻":
                    return (
                      <Button
                        x={x}
                        y={y}
                        class="LEDButtonSquare"
                        color={this.state.colormap[x][y]}
                        on={this.keyOn}
                        off={this.keyOff}
                      />
                    );
                  case "⬤":
                    return (
                      <Button
                        x={x}
                        y={y}
                        class="LEDButtonCircle75"
                        color={this.state.colormap[x][y]}
                        on={this.keyOn}
                        off={this.keyOff}
                      />
                    );
                  case "◪":
                  case "⬕":
                  case "⬔":
                  case "◩":
                    return (
                      <Button
                        x={x}
                        y={y}
                        class="LEDButtonSquare"
                        color={this.state.colormap[x][y]}
                        on={this.keyOn}
                        Zoff={this.keyOff}
                      />
                    );
                  default:
                    return (
                      <div
                        key={"Spacer " + x.toString() + "-" + y.toString()}
                        style={{
                          width: "96px",
                        }}
                      ></div>
                    );
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

export default Canvas;
