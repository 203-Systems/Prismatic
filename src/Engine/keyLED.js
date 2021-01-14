class KeyLED
{
  keyLED = undefined
  repeat = 1;
  status = {}
  nextIndex = 0
  canvas = undefined
  currentOn=[]

  constructor(text, repeat, canvas)
  {
    this.keyLED = text;
    this.repeat = repeat;
    this.canvas = canvas
  }

  play = async() =>
  {
    var threadIndex = this.getIndex()
    this.status[threadIndex] = "PLAYING"
    this.currentOn = []
    for(var i = 0; i < (this.repeat === 0 ? Infinity : this.repeat); i++)
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

              this.canvas.setColor(x, y, color)

              var id = x + "-" + y
              if(this.currentOn[id] === undefined) 
              {
                this.currentOn[id] = [x, y]
              }
              else if(color === 0)
              {
                delete this.currentOn[id]
              }
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

            this.canvas.setColor(x, y, 0)
            var id = x + "-" + y
            delete this.currentOn[id]
            break;
          case 'd': //wait
          case 'delay': 
          wait_complete = false;
          this.wait(parseInt(command[1])).then(() => { wait_complete = true });
          // await this.wait(parseInt(command[1]));
          do {
            if (this.status[threadIndex] === "STOPPED") {
              // this.progress++;
              delete this.status[threadIndex]
              return;
            }
            await this.wait(5)
          } while (!wait_complete)
            break;
          default:
        }
      }
    }
    delete this.status[threadIndex]
  }

  wait(ms)
  {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  getIndex()
  {
    return this.nextIndex++;
  }

  stop()
  {
    for(var index in this.status)
    {
      // console.log(`Thread ${index}`)
      this.status[index] = "STOPPED"
    }
    for(var id in this.currentOn)
    {
      var [x,y] = this.currentOn[id]
      this.canvas.setColor(x, y, 0)
    }
    this.currentOn = []
  }
}

export default KeyLED;