class KeyLED
{
  keyLED = undefined
  constructor(text)
  {
    this.keyLED = text;
  }

  play = async() =>
  {
    for(var line of this.text)
    {
      let command = this.text.split(" ");
      switch(command[0])
      {
        case 'o': //set color
          // this.canvas.setColor(parseInt(parameter[2]), parseInt(parameter[1]), parseInt(parameter[4]));
          break;
        case 'f': //color off
          // this.canvas.setColor(parseInt(parameter[2]), parseInt(parameter[1]), 0);
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