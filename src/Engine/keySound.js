// import {Howler, Howl} from "../../howler/howler.core";
import {Howler, Howl} from "howler";
class keySound {
  howl = undefined;
  loopTarget = 0;
  loopCounter = 0;

  constructor(file, name) {
    console.log(Howler.usingWebAudio)
    console.log(file)
    let blob = window.URL.createObjectURL(file)
    let format = name.toLowerCase().split(".").pop()
    console.log(format)
    console.log(Howler.codecs(format))
    // var result_debug = Howler.checkCodecs();
    // console.log(result_debug[0])
    // console.log(result_debug[1])
    // console.log(result_debug[2])
    Howler.usingWebAudio = false
    // let audioTest = (typeof Audio !== 'undefined') ? new Audio() : null;
    // console.log(!!(audioTest.canPlayType('audio/wav; codecs="1"') || audioTest.canPlayType('audio/wav')).replace(/^no$/, ''))
    // console.log(audioTest.canPlayType('audio/wav; codecs="1"'))
    // console.log(audioTest.canPlayType('audio/wav'))
    this.howl = new Howl({
      src: [blob],
      format: [format],
      // html5: true,
      volume: 1.0,
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
    this.loopCounter = 0
    this.loopTarget = loop;
    if (loop > 1) {
      this.howl._loop = true
    }
    else {
      this.howl._loop = false
    }
    this.howl.play()
  }

  stop() {
    this.howl.stop()
  }

  onEnd() {
    this.loopCounter++;
    // console.log(`Loop #${this.loopCounter} ended`)
    if (this.loopCounter == this.loopTarget) {
      this.howl._loop = false
      this.howl.stop()
    }
  }
}

export default keySound;