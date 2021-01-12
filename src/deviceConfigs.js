const deviceConfigs = {
  "Launchpad Pro":
  {
    channel: 1,
    midiNameRegex: "Launchpad Pro", //For some reason mine shows up as "3- Launchpad Pro"

    initializationSysex: 
    [0xf0, 0x00, 0x20, 0x29, 0x02, 0x10, 0x21, 0x0, 0xf7],
    
    layout: [
      ["　", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "　"],
      ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["⬤", "◻", "◻", "◻", "◪", "⬕", "◻", "◻", "◻", "⬤"],
      ["⬤", "◻", "◻", "◻", "⬔", "◩", "◻", "◻", "◻", "⬤"],
      ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
      ["　", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "◻"]],

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
    
    canvas_origin: [1,1],

    chainKey: [[9,1], [9,2], [9,3], [9,4], [9,5], [9,6], [9,7], [9,8],
      [8,9], [7,9], [6,9], [5,9], [4,9], [3,9], [2,9], [1,9],
      [0,8], [0,7], [0,6], [0,5], [0,4], [0,3], [0,2], [0,1]],

    mcTable: [
      [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0],
      [9,1], [9,2], [9,3], [9,4], [9,5], [9,6], [9,7], [9,8],
      [8,9], [7,9], [6,9], [5,9], [4,9], [3,9], [2,9], [1,9],
      [0,8], [0,7], [0,6], [0,5], [0,4], [0,3], [0,2], [0,1]],

    lKey: [9,9],

    hexSysexGen: function(x, y, hex)
    {
      var xy = x * 10 + y
      var r = (hex >> 16) >> 2 //6 bit color
      var g = (hex & 0xFF00 >> 8) >> 2
      var b = (hex & 0xFF) >> 2
      return [240, 0, 32, 41, 2, 24, 11, xy, r, g, b, 247]
    }
  },
  "Launchpad Pro (CFW)":
  {
    channel: 16,
    midiNameRegex: "Launchpad Open", //For some reason mine shows up as "3- Launchpad Pro"
    
    // layout: [
    //   ["　", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "　"],
    //   ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["⬤", "◻", "◻", "◻", "◪", "⬕", "◻", "◻", "◻", "⬤"],
    //   ["⬤", "◻", "◻", "◻", "⬔", "◩", "◻", "◻", "◻", "⬤"],
    //   ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["　", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "　"]],

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
      [null, 116, 117, 118, 119, 120, 121, 122, 123, null]],

    //Size of LED since sometimes Key can come without LED. We don't really need them since we can load the size of layout array
    width: 10, 
    height: 10,

    //UI related
    padding: 25,
    radius: 15,
    
    canvas_origin: [1,1],

    chainKey: [[9,1], [9,2], [9,3], [9,4], [9,5], [9,6], [9,7], [9,8],
      [8,9], [7,9], [6,9], [5,9], [4,9], [3,9], [2,9], [1,9],
      [0,8], [0,7], [0,6], [0,5], [0,4], [0,3], [0,2], [0,1]],

    mcTable: [
      [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0],
      [9,1], [9,2], [9,3], [9,4], [9,5], [9,6], [9,7], [9,8],
      [8,9], [7,9], [6,9], [5,9], [4,9], [3,9], [2,9], [1,9],
      [0,8], [0,7], [0,6], [0,5], [0,4], [0,3], [0,2], [0,1]],

    hexSysexGen: function()
    {
      if(arguments.length != 2 && arguments.length != 3)
        return //Error
      switch(arguments.length)
      {
        case 2: //MC
          var mc = arguments[0]
          if(this.mcTable[mc] == null)
            return
          var x,y = this.mcTable[mc]
          var hex = arguments[1]
          break;
        case 3: //XY
          var x = arguments[0] + 1
          var y = arguments[1] + 1
          var hex = arguments[2]
          break;
        default:
          return
      }
      var xy = x * 10 + y
      var r = (hex >> 16) >> 2 //6 bit color
      var g = (hex & 0xFF00 >> 8) >> 2
      var b = (hex & 0xFF) >> 2
      return [240, 0, 32, 41, 2, 24, 11, xy, r, g, b, 247]
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
      ["◻", "◻", "◻", "◪", "⬕", "◻", "◻", "◻", "⬤"],
      ["◻", "◻", "◻", "⬔", "◩", "◻", "◻", "◻", "⬤"],
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
    padding: 25,
    radius: 15,
    
    canvas_origin: [0,1],

    chainKey: [[8,1], [8,2], [8,3], [8,4], [8,5], [8,6], [8,7], [8,8]],

    mcTable: [
      [0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0],
      [8,1], [8,2], [8,3], [8,4], [8,5], [8,6], [8,7], [8,8],
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,],

    hexSysexGen: function()
    {
      if(arguments.length != 2 && arguments.length != 3)
        return //Error
      switch(arguments.length)
      {
        case 2: //MC
          var mc = arguments[0]
          if(this.mcTable[mc] == null)
            return
          var x,y = this.mcTable[mc]
          var hex = arguments[1]
        case 3: //XY
          var x = arguments[0] + 1
          var y = arguments[1] + 1
          var hex = arguments[2]
        default:
          var xy = x * 10 + y
          var r = (hex >> 16) >> 2 //6 bit color
          var g = (hex & 0xFF00 >> 8) >> 2
          var b = (hex & 0xFF) >> 2
          return [240, 0, 32, 41, 2, 24, 11, xy, r, g, b, 247]
      }
    }
  },
  "Launchpad X":
  {
    channel: 1,
    midiNameRegex: "^Launchpad X",
    
    // layout: [
    //   ["⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "　"],
    //   ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["◻", "◻", "◻", "◪", "⬕", "◻", "◻", "◻", "⬤"],
    //   ["◻", "◻", "◻", "⬔", "◩", "◻", "◻", "◻", "⬤"],
    //   ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"]],

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
    padding: 25,
    radius: 5,
    
    canvas_origin: [0,1],

    chainKey: [[8,1], [8,2], [8,3], [8,4], [8,5], [8,6], [8,7], [8,8]],

    mcTable: [
      [0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0],
      [8,1], [8,2], [8,3], [8,4], [8,5], [8,6], [8,7], [8,8],
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,],

    hexSysexGen: function()
    {
      if(arguments.length != 2 && arguments.length != 3)
        return //Error
      switch(arguments.length)
      {
        case 2: //MC
          var mc = arguments[0]
          if(this.mcTable[mc] == null)
            return
          var x,y = this.mcTable[mc]
          var hex = arguments[1]
          break;
        case 3: //XY
          var x = arguments[0] + 1
          var y = arguments[1] + 1
          var hex = arguments[2]
          break;
        default:
          return
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

    // layout: [
    //   ["　", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "　"],
    //   ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["⬤", "◻", "◻", "◻", "◪", "⬕", "◻", "◻", "◻", "⬤"],
    //   ["⬤", "◻", "◻", "◻", "⬔", "◩", "◻", "◻", "◻", "⬤"],
    //   ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["⬤", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻", "⬤"],
    //   ["　", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "⬤", "　"]],

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
    
    canvas_origin: [1,1],

    chainKey: [[9,1], [9,2], [9,3], [9,4], [9,5], [9,6], [9,7], [9,8]],

    mcTable: [
      [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0],
      [9,1], [9,2], [9,3], [9,4], [9,5], [9,6], [9,7], [9,8],
      [8,9], [7,9], [6,9], [5,9], [4,9], [3,9], [2,9], [1,9],
      [0,8], [0,7], [0,6], [0,5], [0,4], [0,3], [0,2], [0,1]],
      
    hexSysexGen: function()
    {
      return
      if(arguments.length != 2 && arguments.length != 3)
        return //Error
      switch(arguments.length)
      {
        case 2: //MC
          var mc = arguments[0]
          if(this.mcTable[mc] == null)
            return
          var x,y = this.mcTable[mc]
          var hex = arguments[1]
          break;
        case 3: //XY
          var x = arguments[0] + 1
          var y = arguments[1] + 1
          var hex = arguments[2]
          break;
        default:
          return
      }
      var xy = x * 10 + y
      var r = (hex >> 16) >> 1 //7 bit color
      var g = (hex & 0xFF00 >> 8) >> 1
      var b = (hex & 0xFF) >> 1
      return [240, 0, 32, 41, 2, 12, 22, 3, 3, xy, r, g, b, 247]
    }
  },
  "Matrix":
  {
    channel: 2,
    midiNameRegex: "^Matrix",
    
    layout: [
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻"],
      ["◻", "◻", "◻", "◻", "◻", "◻", "◻", "◻"],
      ["◻", "◻", "◻", "◪", "⬕", "◻", "◻", "◻"],
      ["◻", "◻", "◻", "⬔", "◩", "◻", "◻", "◻"],
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
    
    canvas_origin: [0,0],

    chainKey: [[0,8], [1,8], [2,8], [3,8], [4,8], [5,8], [6,8], [7,8]],

    mcTable: [
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,],

    hexSysexGen: function()
      {
        if(arguments.length != 3)
          return //Error
        switch(arguments.length)
        {
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