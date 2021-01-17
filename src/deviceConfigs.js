const deviceConfigs = {
  "Launchpad Pro":
  {
    channel: 1,
    midiNameRegex: "Launchpad Pro", //For some reason mine shows up as "3- Launchpad Pro"

    initializationSysex:[
      [0, 32, 41, 2, 16, 33, 0], //Enter Live Mode
      [0, 32, 41, 2, 16, 14, 0], //Clear canvas
      [0, 32, 41, 2, 16, 10, 99, 0], //Turn off Mode light
    ],

    // inputInfoMessage:[
    //   "Hello",
    //   "World",
    // ],

    // outputInfoMessage:[
    //   "Hello",
    //   "World",
    // ],

    layout: [
      ["　", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "　"],
      ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["⬤", "◻", "◻", "◻", "◸", "◹", "◻", "◻", "◻", "⬤"],
      ["⬤", "◻", "◻", "◻", "◺", "⊿", "◻", "◻", "◻", "⬤"],
      ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["　", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", " "]],

    keymap: [
      [null, 91, 92, 93, 94, 95, 96, 97, 98, null],
      [80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
      [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
      [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
      [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
      [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
      [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
      [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
      [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      [null, 1, 2, 3, 4, 5, 6, 7, 8, "X99"]],

    //Size of LED since sometimes Key can come without LED. We don't really need them since we can load the size of layout array
    width: 10,
    height: 10,

    //UI related
    padding: 25,
    radius: 15,

    canvas_origin: [1, 1],

    chainKey: [[9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8],
    [8, 9], [7, 9], [6, 9], [5, 9], [4, 9], [3, 9], [2, 9], [1, 9],
    [0, 8], [0, 7], [0, 6], [0, 5], [0, 4], [0, 3], [0, 2], [0, 1]],

    mcTable: [
      [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0],
      [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8],
      [8, 9], [7, 9], [6, 9], [5, 9], [4, 9], [3, 9], [2, 9], [1, 9],
      [0, 8], [0, 7], [0, 6], [0, 5], [0, 4], [0, 3], [0, 2], [0, 1]],

    lKey: [9, 9],

    noteToXY(note)
    {
      if(note >= 1 && note <= 99 /* && note != 9 && note != 90 */)
        return [note % 10, 9 - Math.floor(note / 10)]
    },

    hexSysexGen: function () {
      if (arguments.length != 2 && arguments.length != 3)
        return [] //Error
      switch (arguments.length) {
        case 2: //ID
          var id = arguments[0]
          var hex = arguments[1]
          break;
        case 3: //XY
          var x = arguments[0] + 1
          var y = arguments[1] + 1
          var id = x * 10 + y
          var hex = arguments[2]
          break;
        default:
          return []
      }
      if (typeof (hex) === "string" && hex.charAt(0) === '#') {
        hex = parseInt(hex.substr(1), 16)
      }
      else {
        return []
      }
      var r = (hex >> 16) >> 2 //6 bit color
      var g = (hex & 0xFF00 >> 8) >> 2
      var b = (hex & 0xFF) >> 2
      return [0, 32, 41, 2, 16, 11, id, r, g, b]
    }
  },
  "Launchpad Pro (Phantom)":
  {
    layout: [
      ["　", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "　"],
      ["⬤", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "⬤"],
      ["⬤", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "⬤"],
      ["⬤", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "⬤"],
      ["⬤", "◼️", "◼️", "◼️", "◤", "◥", "◼️", "◼️", "◼️", "⬤"],
      ["⬤", "◼️", "◼️", "◼️", "◣", "◢", "◼️", "◼️", "◼️", "⬤"],
      ["⬤", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "⬤"],
      ["⬤", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "⬤"],
      ["⬤", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "⬤"],
      ["　", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", " "]],

    //Size of LED since sometimes Key can come without LED. We don't really need them since we can load the size of layout array
    width: 10,
    height: 10,

    //UI related
    padding: 25,
    radius: 15,

    canvas_origin: [1, 1],

    chainKey: [[9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8],
    [8, 9], [7, 9], [6, 9], [5, 9], [4, 9], [3, 9], [2, 9], [1, 9],
    [0, 8], [0, 7], [0, 6], [0, 5], [0, 4], [0, 3], [0, 2], [0, 1]],

    mcTable: [
      [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0],
      [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8],
      [8, 9], [7, 9], [6, 9], [5, 9], [4, 9], [3, 9], [2, 9], [1, 9],
      [0, 8], [0, 7], [0, 6], [0, 5], [0, 4], [0, 3], [0, 2], [0, 1]],

    lKey: [9, 9],
  },
  "Launchpad Pro (CFW)":
  {
    channel: 16,
    midiNameRegex: "Launchpad Open", //For some reason mine shows up as "3- Launchpad Pro"

    initializationSysex:[
      [0, 32, 41, 2, 16, 33, 1], //Enter Performance Mode
      [0, 32, 41, 2, 16, 14, 0], //Clear canvas
    ],

    keymap: [
      [null, 28, 29, 30, 31, 32, 33, 34, 35, null],
      [108, 64, 65, 66, 67, 96, 97, 98, 99, 100],
      [109, 60, 61, 62, 63, 92, 93, 94, 95, 101],
      [110, 56, 57, 58, 59, 88, 89, 90, 91, 102],
      [111, 52, 53, 54, 55, 84, 85, 86, 87, 103],
      [112, 48, 49, 50, 51, 80, 81, 82, 83, 104],
      [113, 44, 45, 46, 47, 76, 77, 78, 79, 105],
      [114, 40, 41, 42, 43, 72, 73, 74, 75, 106],
      [115, 36, 37, 38, 39, 68, 69, 70, 71, 107],
      [null, 116, 117, 118, 119, 120, 121, 122, 123, 27]],

    //Size of LED since sometimes Key can come without LED. We don't really need them since we can load the size of layout array
    width: 10,
    height: 10,

    //UI related
    padding: 30,
    radius: 15,

    canvas_origin: [1, 1],

    chainKey: [[9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8],
    [8, 9], [7, 9], [6, 9], [5, 9], [4, 9], [3, 9], [2, 9], [1, 9],
    [0, 8], [0, 7], [0, 6], [0, 5], [0, 4], [0, 3], [0, 2], [0, 1]],

    mcTable: [
      [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0],
      [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8],
      [8, 9], [7, 9], [6, 9], [5, 9], [4, 9], [3, 9], [2, 9], [1, 9],
      [0, 8], [0, 7], [0, 6], [0, 5], [0, 4], [0, 3], [0, 2], [0, 1]],

    lKey: [9, 9],

    noteToXY(note)
    {
      if(note >= 36 && note <= 99) // grid
      {
        var keymap_lut = [[0,7],[1,7],[2,7],[3,7],[0,6],[1,6],[2,6],[3,6],[0,5],[1,5],[2,5],[3,5],[0,4],[1,4],[2,4],[3,4],[0,3],[1,3],[2,3],[3,3],[0,2],[1,2],[2,2],[3,2],[0,1],[1,1],[2,1],[3,1],[0,0],[1,0],[2,0],[3,0],[4,7],[5,7],[6,7],[7,7],[4,6],[5,6],[6,6],[7,6],[4,5],[5,5],[6,5],[7,5],[4,4],[5,4],[6,4],[7,4],[4,3],[5,3],[6,3],[7,3],[4,2],[5,2],[6,2],[7,2],[4,1],[5,1],[6,1],[7,1],[4,0],[5,0],[6,0],[7,0]]
        return keymap_lut[note - 36]
      }
      else if(note >= 100 && note <= 107)
      {
        return this.mcTable[note - 100]
      }
      else if(note >= 116 && note < 123)
      {
        return this.mcTable[8 - (note - 116) + 8] //8- as reverse the direction
      }
      else if(note >= 108 && note < 115)
      {
        return this.mcTable[(note - 108) + 16]
      }
      else if(note >= 28 && note < 35)
      {
        return this.mcTable[(note - 28) + 24]
      }
      else if(note == 27)
      {
        return this.lKey
      }
    },

    hexSysexGen: function () {
      if (arguments.length != 2 && arguments.length != 3)
        return [] //Error
      switch (arguments.length) {
        case 2: //ID
          var id = arguments[0]
          var hex = arguments[1]
          break;
        case 3: //XY
          var x = arguments[0] + 1
          var y = arguments[1] + 1
          var id = x * 10 + y
          var hex = arguments[2]
          break;
        default:
          return []
      }
      if (typeof (hex) === "string" && hex.charAt(0) === '#') {
        hex = parseInt(hex.substr(1), 16)
      }
      else {
        return []
      }
      var r = (hex >> 16) >> 2 //6 bit color
      var g = (hex & 0xFF00 >> 8) >> 2
      var b = (hex & 0xFF) >> 2
      return [0, 32, 41, 2, 16, 11, id, r, g, b]
    }
  },
  "Launchpad MK2":
  {
    channel: 1,
    midiNameRegex: "^Launchpad MK2",

    layout: [
      ["⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "　"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["◻", "◻", "◻", "◸", "◹", "◻", "◻", "◻", "⬤"],
      ["◻", "◻", "◻", "◺", "⊿", "◻", "◻", "◻", "⬤"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"]],

    keymap: [
      ["C104", "C105", "C106", "C107", "C108", "C109", "C110", "C111", null],
      [81, 82, 83, 84, 85, 86, 87, 88, 89],
      [71, 72, 73, 74, 75, 76, 77, 78, 79],
      [61, 62, 63, 64, 65, 66, 67, 68, 69],
      [51, 52, 53, 54, 55, 56, 57, 58, 59],
      [41, 42, 43, 44, 45, 46, 47, 48, 49],
      [31, 32, 33, 34, 35, 36, 37, 38, 39],
      [21, 22, 23, 24, 25, 26, 27, 28, 29],
      [11, 12, 13, 14, 15, 16, 17, 18, 19]],

    width: 9,
    height: 9,

    //UI related
    padding: 30,
    radius: 15,

    canvas_origin: [0, 1],

    chainKey: [[8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8]],

    mcTable: [
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8],],

      noteToXY(note)
      {
        if(note >= 11 && note <= 89)
        {
          return [Math.floor(note / 10), note % 10]
        }
        else if(note >= 104 && note <= 111)
        {
          return this.mcTable[note - 104 + 24]
        }
      },

    hexSysexGen: function () {
      if (arguments.length != 2 && arguments.length != 3)
        return [] //Error
      switch (arguments.length) {
        case 2: //ID
          var id = arguments[0]
          var hex = arguments[1]
          break;
        case 3: //XY
          var x = arguments[0] + 1
          var y = arguments[1] + 1
          var id = x * 10 + y
          var hex = arguments[2]
          break;
        default:
          return []
      }
      if (typeof (hex) === "string" && hex.charAt(0) === '#') {
        hex = parseInt(hex.substr(1), 16)
      }
      else {
        return []
      }
      var r = (hex >> 16) >> 2 //6 bit color
      var g = (hex & 0xFF00 >> 8) >> 2
      var b = (hex & 0xFF) >> 2
      return [0, 32, 41, 2, 24, 11, id, r, g, b]
    }
  },
  "Launchpad X":
  {
    channel: 1,
    midiNameRegex: "^Launchpad X",

    layout: [
      ["◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "n"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◼️"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◼️"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◼️"],
      ["◻", "◻", "◻", "◸", "◹", "◻", "◻", "◻", "◼️"],
      ["◻", "◻", "◻", "◺", "⊿", "◻", "◻", "◻", "◼️"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◼️"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◼️"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◼️"]],

    keymap: [
      [28, 29, 30, 31, 32, 33, 34, 35, 27],
      [64, 65, 66, 67, 96, 97, 98, 99, 100],
      [60, 61, 62, 63, 92, 93, 94, 95, 101],
      [56, 57, 58, 59, 88, 89, 90, 91, 102],
      [52, 53, 54, 55, 84, 85, 86, 87, 103],
      [48, 49, 50, 51, 80, 81, 82, 83, 104],
      [44, 45, 46, 47, 76, 77, 78, 79, 105],
      [40, 41, 42, 43, 72, 73, 74, 75, 106],
      [36, 37, 38, 39, 68, 69, 70, 71, 107]],

    width: 9,
    height: 9,

    //UI related
    padding: 30,
    radius: 5,

    canvas_origin: [0, 1],

    chainKey: [[8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8]],

    mcTable: [
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8],],

    lKey: [0, 9],

    noteToXY(note)
    {
      if(note >= 36 && note <= 99) // grid
      {
        var keymap_lut = [[0,7],[1,7],[2,7],[3,7],[0,6],[1,6],[2,6],[3,6],[0,5],[1,5],[2,5],[3,5],[0,4],[1,4],[2,4],[3,4],[0,3],[1,3],[2,3],[3,3],[0,2],[1,2],[2,2],[3,2],[0,1],[1,1],[2,1],[3,1],[0,0],[1,0],[2,0],[3,0],[4,7],[5,7],[6,7],[7,7],[4,6],[5,6],[6,6],[7,6],[4,5],[5,5],[6,5],[7,5],[4,4],[5,4],[6,4],[7,4],[4,3],[5,3],[6,3],[7,3],[4,2],[5,2],[6,2],[7,2],[4,1],[5,1],[6,1],[7,1],[4,0],[5,0],[6,0],[7,0]]
        return keymap_lut[note - 36]
      }
      else if(note >= 100 && note <= 107)
      {
        return this.mcTable[note - 100]
      }
      else if(note >= 28 && note < 35)
      {
        return this.mcTable[(note - 28) + 8]
      }
      else if(note == 27)
      {
        return this.lKey
      }
    },

    hexSysexGen: function () {
      if (arguments.length != 2 && arguments.length != 3)
        return [] //Error
      switch (arguments.length) {
        case 2: //MC
          var mc = arguments[0]
          if (this.mcTable[mc] == null)
            return []
          var x, y = this.mcTable[mc]
          var hex = arguments[1]
          break;
        case 3: //XY
          var x = arguments[0] + 1
          var y = arguments[1] + 1
          var hex = arguments[2]
          break;
        default:
          return []
      }
      var xy = x * 10 + y
      var r = (hex >> 16) >> 1 //7 bit color
      var g = (hex & 0xFF00 >> 8) >> 1
      var b = (hex & 0xFF) >> 1
      return [240, 0, 32, 41, 2, 12, 22, 3, 3, xy, r, g, b, 247]
    }
  },
  "Launchpad Pro MK3":
  {
    channel: 1,
    midiNameRegex: "^Launchpad Pro MK3",

    layout: [
      ["　", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "n"],
      ["◼️", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◼️"],
      ["◼️", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◼️"],
      ["◼️", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◼️"],
      ["◼️", "◻", "◻", "◻", "◸", "◹", "◻", "◻", "◻", "◼️"],
      ["◼️", "◻", "◻", "◻", "◺", "⊿", "◻", "◻", "◻", "◼️"],
      ["◼️", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◼️"],
      ["◼️", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◼️"],
      ["◼️", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◼️"],
      ["　", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", "◼️", " "]],

    keymap: [
      [26, 28, 29, 30, 31, 32, 33, 34, 35, 27],
      [108, 64, 65, 66, 67, 96, 97, 98, 99, 100],
      [109, 60, 61, 62, 63, 92, 93, 94, 95, 101],
      [110, 56, 57, 58, 59, 88, 89, 90, 91, 102],
      [111, 52, 53, 54, 55, 84, 85, 86, 87, 103],
      [112, 48, 49, 50, 51, 80, 81, 82, 83, 104],
      [113, 44, 45, 46, 47, 76, 77, 78, 79, 105],
      [114, 40, 41, 42, 43, 72, 73, 74, 75, 106],
      [115, 36, 37, 38, 39, 68, 69, 70, 71, 107],
      [null, 116, 117, 118, 119, 120, 121, 122, 123, null]],

    //Size of LED since sometimes Key can come without LED. We don't really need them since we can load the size of layout array
    width: 10,
    height: 10,

    //UI related
    padding: 25,
    radius: 5,

    canvas_origin: [1, 1],

    chainKey: [[9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8]],

    mcTable: [
      [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0],
      [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8],
      [8, 9], [7, 9], [6, 9], [5, 9], [4, 9], [3, 9], [2, 9], [1, 9],
      [0, 8], [0, 7], [0, 6], [0, 5], [0, 4], [0, 3], [0, 2], [0, 1]],

    // hexSysexGen: function () {
    //   return
    //   if (arguments.length != 2 && arguments.length != 3)
    //     return //Error
    //   switch (arguments.length) {
    //     case 2: //MC
    //       var mc = arguments[0]
    //       if (this.mcTable[mc] == null)
    //         return
    //       var x, y = this.mcTable[mc]
    //       var hex = arguments[1]
    //       break;
    //     case 3: //XY
    //       var x = arguments[0] + 1
    //       var y = arguments[1] + 1
    //       var hex = arguments[2]
    //       break;
    //     default:
    //       return
    //   }
    //   var xy = x * 10 + y
    //   var r = (hex >> 16) >> 1 //7 bit color
    //   var g = (hex & 0xFF00 >> 8) >> 1
    //   var b = (hex & 0xFF) >> 1
    //   return [240, 0, 32, 41, 2, 12, 22, 3, 3, xy, r, g, b, 247]
    // }
  },
  "Matrix":
  {
    channel: 2,
    midiNameRegex: "^Matrix",

    layout: [
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻"],
      ["◻", "◻", "◻", "◸", "◹", "◻", "◻", "◻"],
      ["◻", "◻", "◻", "◺", "⊿", "◻", "◻", "◻"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻"]],

    keymap: [
      [64, 65, 66, 67, 96, 97, 98, 99],
      [60, 61, 62, 63, 92, 93, 94, 95],
      [56, 57, 58, 59, 88, 89, 90, 91],
      [52, 53, 54, 55, 84, 85, 86, 87],
      [48, 49, 50, 51, 80, 81, 82, 83],
      [44, 45, 46, 47, 76, 77, 78, 79],
      [40, 41, 42, 43, 72, 73, 74, 75],
      [36, 37, 38, 39, 68, 69, 70, 71],
      [100, 101, 102, 103, 104, 105, 106, 107]],

    width: 8,
    height: 8,

    //UI related
    padding: 20,
    radius: 15,

    canvas_origin: [0, 0],

    chainKey: [[0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8]],

    mcTable: [
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,],

    noteToXY(note)
    {
      if(note > 35 && note < 100) // grid
      {
        var keymap_lut = [[0,7],[1,7],[2,7],[3,7],[0,6],[1,6],[2,6],[3,6],[0,5],[1,5],[2,5],[3,5],[0,4],[1,4],[2,4],[3,4],[0,3],[1,3],[2,3],[3,3],[0,2],[1,2],[2,2],[3,2],[0,1],[1,1],[2,1],[3,1],[0,0],[1,0],[2,0],[3,0],[4,7],[5,7],[6,7],[7,7],[4,6],[5,6],[6,6],[7,6],[4,5],[5,5],[6,5],[7,5],[4,4],[5,4],[6,4],[7,4],[4,3],[5,3],[6,3],[7,3],[4,2],[5,2],[6,2],[7,2],[4,1],[5,1],[6,1],[7,1],[4,0],[5,0],[6,0],[7,0]]
        return keymap_lut[note - 36]
      }
      else if(note > 99 && note < 108)
      {
        return this.chainKey[note - 100]
      }
    },

    hexSysexGen: function () {
      if (arguments.length != 3)
        return [] //Error
      switch (arguments.length) {
        // case 2: //MC
        //   var mc = arguments[0]
        //   if(this.mcTable[mc] == null)
        //     return
        //   var x,y = this.mcTable[mc]
        //   var hex = arguments[1]
        case 3: //XY
          var x = arguments[0]
          var y = arguments[1]
          var hex = arguments[2]
          break;
        default:
          return;
      }
      var r = (hex >> 16) >> 1 //7 bit color
      var g = (hex & 0xFF00 >> 8) >> 1
      var b = (hex & 0xFF) >> 1
      return [240, 0, 2, 3, 1, 0, 18, 32, 0, 3, r, g, b, 247]
    }
  },
}

export default deviceConfigs;