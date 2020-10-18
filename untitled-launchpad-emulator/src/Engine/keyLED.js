class KeyLED
{
  keyLED = undefined
  canvas = undefined
  constructor(text)
  {
    this.keyLED = text;
  }

  play = async(canvas) =>
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
          if(command.length === 5) //PaletteMode
          {
            if(command[1] !== "mc")
            {
              canvas.setColorPalette(parseInt(command[2]), parseInt(command[1]), parseInt(command[4]));
            }
            else
            {
              canvas.setMCColorPalette(parseInt(command[2]), parseInt(command[4]));
            }
          }else if(command.length === 4)
          {
            if(command[1] !== "mc")
            {
              canvas.setColorHEX(parseInt(command[2]), parseInt(command[1]), "#" + command[3]);
            }
            else
            {
              canvas.setMCColorHEX(parseInt(command[2]), "#" + command[3]);
            }
          }
            break;
        case 'f': //color off
        if(command[1] !== "mc")
          {
            canvas.setColorHEX(parseInt(command[2]), parseInt(command[1]), "#000000");
          }
          else
          {
            canvas.setMCColorPalette(parseInt(command[2]), "#000000");
          }
          break;
        case 'd': //wait
          await this.wait(parseInt(command[1]));
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

export default KeyLED;