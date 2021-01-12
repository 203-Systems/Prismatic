class KeyLED
{
  keyLED = undefined
  repeat = 1;
  status = "STOPPED"

  constructor(text, repeat)
  {
    this.keyLED = text;
    this.repeat = repeat;
  }

  play = async(canvas) =>
  {
    this.status = "PLAYING"
    for(var i = 0; i < this.repeat; i++)
    {
      for(var line of this.keyLED)
      {
        let wait_complete = true;
        let command = line.split(" ");
        // console.log(line)
        if(command.length < 2)
          continue;

        switch(command[0])
        {
          case 'o': //set color
          case 'on': //set color
              var [x, y] = [undefined, undefined]
              if(command[1] === "mc" || command[1] === "l") //For "l", the y is garbage but it won't be read for the setColor functions so just gonna let it be
              {
                [x, y] = [command[1], parseInt(command[2] - 1)]
              }
              else if(parseInt(command[1]) !== NaN)
              {
                [x, y] = [parseInt(command[2] - 1), parseInt(command[1] - 1)]
              }

              var color
              if(command[command.length - 2] === "a")
              {
                color = parseInt(command[command.length - 1])
              }
              else
              {
                color = "#" + command[command.length - 1]
              }

              canvas.setColor(x, y, color)
              break;
          case 'f': //color off
          case 'off': //color off
            var [x, y] = [undefined, undefined]
            if(command[1] === "mc" || command[1] === "l")
            {
              [x, y] = [command[1], parseInt(command[2] - 1)]
            }
            else if(parseInt(command[1]) !== NaN)
            {
              [x, y] = [parseInt(command[2] - 1), parseInt(command[1] - 1)]
            }

            canvas.setColor(x, y, 0)
            break;
          case 'd': //wait
          case 'delay': 
          wait_complete = false;
          this.wait(parseInt(command[1])).then(() => { wait_complete = true });
          // await this.wait(parseInt(command[1]));
          do {
            if (this.status === "STOPPED") {
              // this.progress++;
              return;
            }
            await this.wait(5)
          } while (!wait_complete)
            break;
          default:
        }
      }
    }
    this.status = "STOPPED"
  }

  wait(ms)
  {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  stop()
  {
    this.status = "STOPPED"
  }
}

export default KeyLED;