import { toRadians, distance, normalizeAngle } from "./functions.js";
import { zBuffer } from "./ray.js";
import { player, ctx } from "./raycasting.js";


var items = new Image();
items.src = "./items.png";

// var soldier_1 = new Image();
// soldier_1.src = "./assets/9_dinoStein/soldier_1/die_4.png";
// var boss = new Image();
// boss.src = "./assets/9_dinoStein/boss/die_4.png";
// var dog = new Image();
// dog.src = "./assets/9_dinoStein/dog/die_4.png";

var FOV = 60;
var half_FOV = toRadians(FOV / 2);

var canvasWidth = 600;
var canvasHeight = 400;

var sprites = [];

class Sprite {
  constructor(x, y, image, frame, player, ctx) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.frame = frame;
    this.player = player;
    this.distance = 0;
    this.angle = 0;
    this.visible = false;
    this.ctx = ctx;
    this.halfSprite = 0;
    this.screenDist = Math.floor(600 / Math.tan((30 * Math.PI) / 180));

    this.getImageXY();
  }
  getImageXY() {
    var line = Math.floor(this.frame / 4);
    this.imageY = line * 64;
    this.imageX = (this.frame - (line * 4)) * 64;
  }
  draw() {
    this.distance = distance(this.player.x, this.player.y, this.x, this.y);

    var X = this.x - this.player.x;
    var Y = this.y - this.player.y;

    var p = Math.atan2(Y, X) * 180/ Math.PI;

    if (p < 0) p += 360;

    var playerAngle = 360 - (this.player.angle * 180 / Math.PI);

    var XTemp = playerAngle + 30 - p;

    if (p > 270 && playerAngle < 90) XTemp += 360;
    if (playerAngle > 270 && p < 90) XTemp -= 360;

	  var screenX = XTemp * 600 / 60;

    var spriteHeight = (this.screenDist * 64) / this.distance;

    var columnWidth = spriteHeight / 64;

    var screenY = 200 - spriteHeight/2;

    for (let i = 0; i < 64; i++) {
      this.ctx.drawImage(items, i, 0, 1, 63, screenX + (columnWidth * i), screenY, columnWidth, spriteHeight);
    }
  }
}

function createSprites(spriteList) {
  for (let i = 0; i < spriteList.length; i++) {
    sprites[i] = new Sprite(spriteList[i][0], spriteList[i][1], eval(spriteList[i][3]), spriteList[i][2], player, ctx);
  }
}

function removeSprites() {
  sprites = [];
}

function drawSprites() {
  sprites.sort(function (obj1, obj2) {
    return obj2.distance - obj1.distance;
  });
  for (let i = 0; i < sprites.length; i++) {
    sprites[i].draw();
  }
}

export { createSprites, drawSprites, removeSprites }
