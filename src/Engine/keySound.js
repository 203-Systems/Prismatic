// import {Howler, Howl} from "../../howler/howler.core";
import {Howler, Howl} from "howler";
class keySound {
  file = undefined;
  howl = undefined;
  format = undefined
  loopTarget = {};
  loopCounter = {};

  constructor(file, name) {
    // console.log(Howler.usingWebAudio)
    // console.log(file)
    this.file = window.URL.createObjectURL(new File([file], name))
    this.format = name.toLowerCase().split(".").pop()
    // console.log(this.format)
    // console.log(Howler.codecs(this.format))
    this.howl = new Howl({
      src: [this.file],
      format: [this.format],
      html5: !Howler.usingWebAudio,
      onend: this.onEnd.bind(this),
      onloaderror:function (id, message) {
        console.error(`Howler Load Error ${id} ${message}`)
      },
      onplayerror:function (id, message) {
        console.error(`Howler Play Error ${id} ${message}`)
      }
    });
  }

  play(loop = 1) {
    if(loop !== 1)
    {
      this.howl._loop = true;
    }

    var id = this.howl.play()
    // console.log("KeySound")
    // console.timeLog("KeyOn")

    this.loopCounter[id] = 0
    this.loopTarget[id] = loop;
  }

  stop() {
    if(this.howl !== undefined)
    {
      this.howl.stop()
    }
  }

  onEnd(id) {
    // console.log(`ID ${id} Loop #${this.loopCounter[id]} ended`)
    if (this.loopTarget[id] !== 0 && ++this.loopCounter[id] >= this.loopTarget[id]) { // So if loopTarget is 0 then it will keep going
      this.howl._loop = false
      this.howl.stop(id)
    }
  }

  endLoop()
  {
    this.howl._loop = false;
    for(var i in this.loopTarget)
    {
      this.loopTarget[i] = 1
    }
  }
}

export default keySound;