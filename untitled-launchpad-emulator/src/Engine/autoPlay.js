class AutoPlay
{
  autoplay = undefined;
  constructor(text)
  {
    this.autoplay = text;
  }

  play = async(canvas) =>
  {
    for(var line of this.autoplay)
    {
      console.log(line)
      let command = line.split(" ");
      
      if(command.length < 2)
        continue;

      switch(command[0])
      {
        case 't':
          case 'o':
            canvas.keyOn(parseInt(command[2]), parseInt(command[1]));
            break;
          case 'f':
            canvas.keyOff(parseInt(command[2]), parseInt(command[1]));
            break;
          case 'd':
            // console.time("Autoplay wait");
            await this.wait(parseInt(command[1]));
            // console.timeEnd("Autoplay wait");
            // await this.better_wait(parseInt(parameter[1]));
            break;
          case 'c':
          case 'chain':
            canvas.chainChange(parseInt(command[1]) - 1);
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

export default AutoPlay;