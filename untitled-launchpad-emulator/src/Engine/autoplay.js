class Autoplay
{
  autoplay = undefined
  constructor(text)
  {
    this.autoplay = text;
  }

  play = async() =>
  {
    for(var line of this.text)
    {
      let command = line.split(" ");
      
      if(command.length < 2)
        continue;

      switch(command[0])
      {
        case 't':
          case 'o':
            // this.canvas.noteOn(parseInt(parameter[2]), parseInt(parameter[1]));
            break;
          case 'f':
            // this.canvas.noteOff(parseInt(parameter[2]), parseInt(parameter[1]));
            break;
          case 'd':
            // console.time("Autoplay wait");
            await this.wait(parseInt(command[1]));
            // console.timeEnd("Autoplay wait");
            // await this.better_wait(parseInt(parameter[1]));
            break;
          case 'c':
          case 'chain':
            // this.canvas.currentPage = parameter[1] - 1;
            break;
          default:
      }
    }
  }

  wait(ms)
  {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default Autoplay;