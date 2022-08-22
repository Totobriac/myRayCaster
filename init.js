import { Sprite } from "./sprite.js";
import { Enemy } from "./enemy.js";

var items = new Image();
items.src = "./assets/items2.png";

var guard = new Image();
guard.src = "./assets/guard.png";

var officer = new Image();
officer.src = "./assets/officer.png";

var zombi = new Image();
zombi.src = "./assets/uberZombi.png";

var dog = new Image();
dog.src = "./assets/FettGesicht.png";

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

function getSpritesList(mapX, mapY, mapSprites, player, ctx) {
  var sprites = [];
  var index = 0;
  for (let i = 0; i < mapY; i++) {
    for (let j = 0; j < mapX; j++) {
      if (mapSprites[i][j] != 0) {
        index++;
        sprites[index] = new Sprite((j * 64) + 32, (i * 64) + 32, eval(items), parseInt(mapSprites[i][j]), player, true, ctx);
      }
    }
  }
  return sprites
}

function generateMonsters(map) {
  var index = map.spritesList.length - 1 ;
  for (let i = 0; i < map.mapY; i++) {
    for (let j = 0; j < map.mapX; j++) {
      if (map.monsters[i][j] != 0 && map.monsters[i][j] != 88) {
        if (map.monsters[i][j] == 13)
        index++;
        map.spritesList[index] = new Enemy(900, 800, eval("zombi"), 0, map.player, false, map.ctx, map, "zombi") ;
      }
    }
  }
}

export { floorData, drawMini, doorsList, getSpritesList, generateMonsters };
