import { Sprite } from "./sprite.js";

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


var items = new Image();
items.src = "./assets/items2.png";

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

function doorsList(mapX, mapY,map) {
  var doors = [];
  for (let y = 0; y < mapY; y++) {
    for (let x = 0; x < mapX; x++) {
      if (map[y][x] == 24) {
        doors.push({
          x: x,
          y: y,
          status: 2,
          yOffset: 0
        });
      }
    }
  }
  return doors
}

function getSpritesList(mapX, mapY,map, player, ctx) {
  var sprites = [];
  var index = 0;
  for (let i = 0; i < mapY; i++) {
    for (let j = 0; j < mapX; j++) {
      if (map[i][j] != 0) {
        index++;
        sprites[index] = new Sprite((j * 64) + 32, (i * 64) + 32, eval(items), parseInt(map[i][j]), player, true, ctx, "object");
      }
    }
  }  
  return sprites
}


export { floorData, drawMini, doorsList, getSpritesList };
