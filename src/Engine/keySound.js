import { Howl } from 'howler';

class keySound {
  howl = undefined;
  loopTarget = 0;
  loopCounter = 0;

  constructor(sound, name)
  {
    let blob = sound = window.URL.createObjectURL(sound)
    let format = name.split(".").pop()
    this.howl = new Howl({ src: [blob], format: [format], onend: this.onEnd.bind(this)});
  }

  play(loop = 1)
  {
    this.loopCounter = 0
    this.loopTarget = loop;
    if(loop > 1)
    {
      this.howl._loop = true
    }
    else
    {
      this.howl._loop = false
    }
    this.howl.play()
  }

  stop()
  {
    this.howl.stop()
  }

  onEnd()
  {
    this.loopCounter++;
    // console.log(`Loop #${this.loopCounter} ended`)
    if(this.loopCounter == this.loopTarget)
    {
      this.howl._loop = false
      this.howl.stop()
    }
  }
}

export default keySound;