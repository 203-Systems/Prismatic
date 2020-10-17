class KeyLED
{
  keyLED = undefined
  constructor(file)
  {
    let text = await file.async("text");
    this.keyLED = text.split(/\r?\n/);
  }

  mcTable = [
    [1,9], [2,9], [3,9], [4,9], [5,9], [6,9], [7,9], [8,9],
    [9,1], [9,2], [9,3], [9,4], [9,5], [9,6], [9,7], [9,8],
    [8,0], [7,0], [6,0], [5,0], [4,0], [3,0], [2,0], [1,0],
    [0,8], [0,7], [0,6], [0,5], [0,4], [0,3], [0,2], [0,1],
  ]

  play = async() =>
  {
    for(var line of text)
    {
      command = text.split(" ");
      switch(command[0])
      {
        case 'o': //set color
          this.canvas.setColor(parseInt(parameter[2]), parseInt(parameter[1]), parseInt(parameter[4]));
          break;
        case 'f': //color off
          this.canvas.setColor(parseInt(parameter[2]), parseInt(parameter[1]), 0);
          break;
        case 'd': //wait
          await this.wait(parseInt(parameter[1]));
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