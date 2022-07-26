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
    this.imageX;
    this.imageY;
    this.player = player;
    this.distance = 0;
    this.angle = 0;
    this.visible = false;
    this.ctx = ctx;
    this.halfSprite = 0;
    this.screenDist = Math.floor((canvas.width / 2) / Math.tan((30 * Math.PI) / 180));

    this.getImageXY();
  }
  getImageXY() {
    var line = Math.floor(this.frame / 4);
    this.imageY = line * 64;
    this.imageX = (this.frame - (line * 4)) * 64;
  }
  calculateAngle() {
    var vectX = this.x - this.player.x;
    var vectY = this.y - this.player.y;
    var objectPlayerAngle = Math.atan2(vectY, vectX);
    var angleDif = this.player.angle - objectPlayerAngle;

    if (angleDif < - Math.PI) {
      angleDif += 2 * Math.PI
    } else if (angleDif > Math.PI) {
        angleDif -= 2 * Math.PI
    };

    angleDif = Math.abs(angleDif);

    angleDif < half_FOV ? this.visible = true : this.visible = false;

  }
  calculateDistance() {
    this.distance = distance(this.player.x, this.player.y, this.x, this.y);
  }
  update() {
    this.calculateAngle();
    this.calculateDistance();
  }
  draw() {
    this.update();

    if (this.visible) {

      var spriteHeight = (64 / this.distance) * this.screenDist;

      var y0 = parseInt(canvasHeight / 2) - parseInt(spriteHeight / 2);
      var y1 = y0 + spriteHeight;

      var heightTileTexture = 64;
      var widthTileTexture = 64;

      var dx = this.x - this.player.x;
      var dy = this.y - this.player.y;
      var spriteAngle = Math.atan2(dy, dx) - this.player.angle;

      var spriteAngle = normalizeAngle(spriteAngle);

      var x0 = Math.tan(spriteAngle) * 64;
      var x = (canvasWidth / 2 + x0 - spriteHeight / 2);

      this.ctx.imageSmoothingEnabled = false;
      var columnWidth = spriteHeight / heightTileTexture;

      for (let i = 0; i < widthTileTexture; i++) {
        for (let j = 0; j < columnWidth; j++) {
          if (i === 32) {
            this.halfSprite = x1 + 300;
          }
          var x1 = parseInt(x + ((i - 1) * columnWidth) + j);
          if (zBuffer[x1] > this.distance) {
            this.ctx.drawImage(this.image, i + this.imageX, this.imageY, 1, heightTileTexture - 1, x1 + 300, y1, 1, spriteHeight);
          }
        }
      }
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
