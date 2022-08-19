var floorData;

var tempCanvas = document.createElement('canvas');
var tempCtx = tempCanvas.getContext('2d');
tempCanvas.width = 576;
tempCanvas.height = 128;

var tempCanvas2 = document.createElement('canvas');
var tempCtx2 = tempCanvas2.getContext('2d');
tempCanvas2.width = 192;
tempCanvas2.height = 240;

var floorSprite = new Image();

floorSprite.onload = function () {
  tempCtx.drawImage(floorSprite, 0, 0);
  floorData = tempCtx.getImageData(0, 0, 576, 128);
}

floorSprite.src = "./assets/floor.png";


function drawMini(map) {
  for (let y = 0; y < map.mapY; y++) {
    for (let x = 0; x < map.mapX; x++) {
      var color;
      map.wall[y][x] != 0 ? color = "grey" : color = "rgb(235,203,152)";
      tempCtx2.fillStyle = color;
      var Xo = x * 6;
      var Yo = y * 6;
      tempCtx2.fillRect(Xo, Yo, 6, 6);
    }
  }
  return tempCanvas2
}

function doorsList(mapY, mapX, map) {
  var doors = [];
  for (let y = 0; y < mapY; y++) {
    for (let x = 0; x < mapX; x++) {
      if (map[y][x] == 24) {
        doors.push({ x: x, y: y, status: 2, yOffset: 0 });
      }
    }
  }
  return doors
}

function createZones(mapY, mapX, zones) {
  var zonesArray = [];

  for (let y = 0; y < mapY; y++) {
    for (let x = 0; x < mapX; x++) {
        zonesArray.push(zones[y][x]);
      }
    }

  console.log(zonesArray);
  return zonesArray
}

export { floorData, drawMini, doorsList, createZones };
