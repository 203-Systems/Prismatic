class KeyLED
{
  keyLED = undefined
  repeat = 1;
  constructor(text, repeat)
  {
    this.keyLED = text;
    this.repeat = repeat;
  }

  play = async(canvas) =>
  {
    for(var i = 0; i < this.repeat; i++)
    {
      for(var line of this.keyLED)
      {
        let command = line.split(" ");
        // console.log(command);
        if(command.length < 2)
          continue;

        switch(command[0])
        {
          case 'o': //set color
          case 'on': //set color
            if(command.length === 5) //PaletteMode
            {
              if(command[1] !== "mc")
              {
                canvas.setColorPalette(parseInt(command[2] - 1), parseInt(command[1] - 1), parseInt(command[4]));
              }
              else
              {
                canvas.setMCColorPalette(parseInt(command[2] - 1), parseInt(command[4]));
              }
            }else if(command.length === 4)
            {
              if(command[1] !== "mc")
              {
                canvas.setColorHEX(parseInt(command[2] - 1), parseInt(command[1] - 1), "#" + command[3]);
              }
              else
              {
                canvas.setMCColorHEX(parseInt(command[2] - 1), "#" + command[3]);
              }
            }
              break;
          case 'f': //color off
          case 'off': //color off
          if(command[1] !== "mc")
            {
              canvas.setColorPalette(parseInt(command[2] - 1), parseInt(command[1] - 1), 0);
            }
            else
            {
              canvas.setMCColorPalette(parseInt(command[2] - 1), 0);
            }
            break;
          case 'd': //wait
            await this.wait(parseInt(command[1]));
            break;
          default:
        }
      }
    }
  }

  wait(ms)
  {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default KeyLED;