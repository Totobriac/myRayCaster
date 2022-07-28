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
    this.screenDist = Math.floor(600 / Math.tan((30 * Math.PI) / 180));

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

    this.angle = angleDif;
  }
  calculateDistance() {
    this.distance = distance(this.player.x, this.player.y, this.x, this.y);
  }
  draw() {
    this.calculateAngle();
    this.calculateDistance();

    if (this.visible) {

      var realSpriteHeight = 64;

      var spriteHeight = (realSpriteHeight / this.distance) * this.screenDist;

      var y = 200 - Math.floor(spriteHeight / 2);

      var columnWidth = spriteHeight / 64;

      var dx = this.x - this.player.x;
			var dy = this.y - this.player.y;

			var spriteAngle = Math.atan2(dy, dx) - player.angle;

      var x0 = Math.tan(spriteAngle) * 300;
			var x = (600/2 + x0 - 64/2);

      for(let i=0; i< 64; i++){

				for(let j=0; j<columnWidth; j++){

					var x1 = Math.floor(x+((i-1)*columnWidth)+j);

					ctx.drawImage(items,i + 64,0,1,63,x1,y,1,spriteHeight);

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
