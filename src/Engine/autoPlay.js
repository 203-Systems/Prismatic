class AutoPlay {
  autoplay = undefined;
  status = "STOPPED"
  progress = 0
  total = 0
  led = true;
  currentChain = 0
  canvas = undefined;

  constructor(text, canvas) {
    this.autoplay = text;
    this.total = text.length;
    this.canvas = canvas;
  }

  play = async (callback) => {
    // console.time("Autoplay")
    if (this.progress === 0) {
      this.canvas.initlalizeCanvas();
      // this.currentChain = parseInt(0);
    }
    this.status = "PLAYING"
    for (this.progress; this.progress < this.autoplay.length; this.progress++) {
      // console.timeEnd("Autoplay");
      // console.time("Autoplay")

      if (this.status === "STOPPED" || this.status === "PAUSED") {
        return;
      }

      console.log(this.autoplay[this.progress])
      let command = this.autoplay[this.progress].split(" ");

      if(callback !== undefined)
        callback([this.progress, this.autoplay.length])

      if (command.length < 2)
        continue;

      if (this.canvas.currentChain != this.currentChain) {
        this.canvas.chainChange(this.currentChain);
      }

      switch (command[0]) {
        case 'o':
        case 'on':
          if(this.led)
          {
            this.canvas.keyOn(parseInt(command[2]) - 1, parseInt(command[1]) - 1, undefined, true);
          }
          else
          {
            this.canvas.keyOn(parseInt(command[2]) - 1, parseInt(command[1]) - 1, undefined, true, true, false);
            this.canvas.setColor(parseInt(command[2]) - 1, parseInt(command[1]) - 1, 127)
          }
          break;
        case 'f':
        case 'off':
          if(this.led)
          {
            this.canvas.keyOff(parseInt(command[2]) - 1, parseInt(command[1]) - 1, undefined, true);
          }
          else
          {
            this.canvas.keyOff(parseInt(command[2]) - 1, parseInt(command[1]) - 1, undefined, true);
            this.canvas.setColor(parseInt(command[2]) - 1, parseInt(command[1]) - 1, 0)
          }
          break;
        case 't':
        case 'touch':
            if(this.led)
            {
              this.canvas.keyOn(parseInt(command[2]) - 1, parseInt(command[1]) - 1, undefined, true);
              this.canvas.keyOff(parseInt(command[2]) - 1, parseInt(command[1]) - 1, undefined, true);
            }
            else
            {
              this.canvas.keyOn(parseInt(command[2]) - 1, parseInt(command[1]) - 1, undefined, true, true, false);
              this.canvas.keyOff(parseInt(command[2]) - 1, parseInt(command[1]) - 1, undefined, true);
              this.canvas.setColor(parseInt(command[2]) - 1, parseInt(command[1]) - 1, 3)
              setTimeout(() => {this.canvas.setColor(parseInt(command[2]) - 1, parseInt(command[1]) - 1, 0)}, 200)
            }
            break;
        case 'd':
        case 'delay':
          var ms = parseInt(command[1])
          if(ms < 10)
            break;
          await this.wait(parseInt(command[1]));
          break;
        case 'c':
        case 'chain':
          this.canvas.chainChange(parseInt(command[1]) - 1);
          this.currentChain = parseInt(command[1]) - 1;
          break;
        default:
      }
    }
    this.status = "STOPPED"
    this.progress = 0
  }

  pause() {
    this.status = "PAUSED"
  }

  stop() {
    this.status = "STOPPED"
    this.progress = 0
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default AutoPlay;