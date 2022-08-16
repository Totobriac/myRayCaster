import { distance } from "./functions.js";
import { zBuffer } from "./ray.js";
import { player, ctx } from "./raycasting.js";

var items = new Image();
items.src = "./assets/items2.png";

class Sprite {
  constructor(x, y, image, frame, player, still, ctx, type) {
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
    this.screenDist = Math.floor(300 / Math.tan((30 * Math.PI) / 180));
    this.still = still;
    this.type = type;
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

    var p = 360 - ( Math.atan2(Y, X) * 180/ Math.PI);

    if (p < 0) p += 360;
    if (p > 360) p -= 360;

    var playerAngle = 360 - (this.player.angle * 180 / Math.PI);

    var XTemp = playerAngle + 30 - p;

    if (p > 270 && playerAngle < 90) XTemp += 360;
    if (playerAngle > 270 && p < 90) XTemp -= 360;

	  this.screenX = XTemp * 600 / 60;

    var spriteHeight = (this.screenDist * 64) / this.distance;

    this.spriteWidth = spriteHeight;

    var columnWidth = spriteHeight / 64;

    var screenY = 200 - spriteHeight/2;

    for (let i = 0; i < 64; i++) {
      var x = Math.floor(this.screenX + (columnWidth * i) - (32 * columnWidth));
      if (zBuffer[x] + 32 > this.distance && x > 0 && x < 600) {
        this.ctx.drawImage(this.image, i + this.imageX, this.imageY, 1, 63, this.screenX + (columnWidth * i) - (32 * columnWidth) + 300, screenY, columnWidth, spriteHeight);
      }
    }
  }
}

function createSprites(sprites, map) {
  var index = 0
  var spy = []
  for( let i = 0; i < map.mapY; i++ ){
    for (let j = 0; j < map.mapX; j++) {
      if (map.sprites[i][j] != 0 && map.sprites[i][j].length === 1 ) {
        index ++;
        sprites[index] = new Sprite(j * 64, i *64 , eval(items), parseInt(map.sprites[i][j]) , player, true, ctx, "object");
      }
    }
  }
}

function drawSprites(sprites) {
  sprites.sort(function(obj1, obj2) {
    return obj2.distance - obj1.distance;
  });
  for (let i = 0; i < sprites.length - 1; i++) {
    sprites[i].draw();
  }
}


export { createSprites, drawSprites, Sprite }
