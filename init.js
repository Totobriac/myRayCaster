import { Sprite } from "./sprite.js";
import { Enemy } from "./enemy.js";

var items = new Image();
items.src = "./assets/items2.png";

var guard = new Image();
guard.src = "./assets/guard.png";

var officer = new Image();
officer.src = "./assets/officer.png";

var dog = new Image();
dog.src = "./assets/FettGesicht.png";

var boss1 = new Image();
boss1.src = "./assets/barnacle.png";

var boss2 = new Image();
boss2.src = "./assets/FettGesicht.png";

var boss3 = new Image();
boss3.src = "./assets/uberZombi.png";

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
        sprites[index] = new Sprite((j * 64) + 32, (i * 64) + 32, eval(items), parseInt(mapSprites[i][j]), player, false, ctx);
      }
    }
  }
  return sprites
}

function generateMonsters(map) {
  var index = map.spritesList.length - 1;
  for (let i = 0; i < map.mapY; i++) {
    for (let j = 0; j < map.mapX; j++) {
      if (map.monsters[i][j] != 0 && map.monsters[i][j] != 88) {
        var monster;       
        switch (map.monsters[i][j]) {
          case 1:
            monster = "guard";
            break;
          case 2:
            monster = "officer";
            break;
          case 3:
            monster = "dog";
            break;
          case 4:
            monster = "boss1";
            break;
          case 5:
            monster = "boss2";
            break;
          case 6:
            monster = "boss3";
            break;
        }
        index++;
        map.spritesList[index] = new Enemy((j * 64), (i * 64), eval(monster), 0, map.player, false, map.ctx, map, monster);   
      }
    }
  }
}

export { floorData, drawMini, doorsList, getSpritesList, generateMonsters };
