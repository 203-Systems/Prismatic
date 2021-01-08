class AutoPlay
{
  autoplay = undefined;
  status = "STOPPED"
  progress = 0
  currentChain = 0
  constructor(text)
  {
    this.autoplay = text;
  }

  play = async(canvas, canvas_origin, callback) =>
  {
    console.log(canvas)
    console.log(canvas_origin);
    if(this.progress === 0)
    {
      canvas.initlalizeCanvas();
      this.currentChain = parseInt(0);
    }
    this.status = "PLAYING"
    for(this.progress; this.progress < this.autoplay.length; this.progress ++)
    {
      let wait_complete = true;
      console.log(this.autoplay[this.progress])
      let command = this.autoplay[this.progress].split(" ");

      if(callback !== undefined)
        callback([this.progress, this.autoplay.length])
      
      if(command.length < 2)
        continue;
      
      if(canvas.currentChain != this.currentChain)
      {
        canvas.chainChange(this.currentChain);
      }
      switch(command[0])
      {
        case 't':
        case 'o':
          canvas.keyOn(parseInt(command[2]) - 1 + canvas_origin[0], parseInt(command[1]) - 1 + canvas_origin[1]);
          break;
        case 'f':
          canvas.keyOff(parseInt(command[2]) - 1 + canvas_origin[0], parseInt(command[1]) - 1 + canvas_origin[1]);
          break;
        case 'd':
          // console.time("Autoplay wait");
          wait_complete = false;
          this.wait(parseInt(command[1])).then(() => {wait_complete = true});
          // console.timeEnd("Autoplay wait");
          // await this.wait(parseInt(command[1]));
          break;
        case 'c':
        case 'chain':
          canvas.chainChange(parseInt(command[1]) - 1);
          this.currentChain = parseInt(command[1]) - 1;
          break;
        default:
      }

      do
      {
        if (this.status === "STOPPED" || this.status === "PAUSED")
        {
          this.progress ++;
          return;
        }
        await this.wait(5)
      }while(!wait_complete)
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

  wait(ms)
  {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default AutoPlay;