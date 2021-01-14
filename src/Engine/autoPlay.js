class AutoPlay {
  autoplay = undefined;
  status = "STOPPED"
  progress = 0
  total = 0
  // currentChain = 0
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
      let wait_complete = true;
      console.log(this.autoplay[this.progress])
      let command = this.autoplay[this.progress].split(" ");

      if(callback !== undefined)
        callback([this.progress, this.autoplay.length])

      if (command.length < 2)
        continue;

      // if (this.canvas.currentChain != this.currentChain) {
      //   this.canvas.chainChange(this.currentChain);
      // }

      switch (command[0]) {
        case 't':
        case 'o':
          this.canvas.keyOn(parseInt(command[2]) - 1, parseInt(command[1]) - 1, undefined, true);
          break;
        case 'f':
          this.canvas.keyOff(parseInt(command[2]) - 1, parseInt(command[1]) - 1, undefined, true);
          break;
        case 'd':
          // console.time("Autoplay wait");
          wait_complete = false;
          this.wait(parseInt(command[1])).then(() => { wait_complete = true });
          // await this.wait(parseInt(command[1]));
          do {
            if (this.status === "STOPPED" || this.status === "PAUSED") {
              this.progress++;
              return;
            }
            await this.wait(5)
          } while (!wait_complete)
          break;
        case 'c':
        case 'chain':
          this.canvas.chainChange(parseInt(command[1]) - 1);
          // this.currentChain = parseInt(command[1]) - 1;
          break;
        default:
      }
    }
    this.status = "STOPPED"
    this.progress = 0
  }

  pause() {
    this.status = "PAUSED"
    this.canvas.stopAll();
  }

  stop() {
    this.status = "STOPPED"
    this.progress = 0
    this.canvas.initlalizeCanvas();
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default AutoPlay;