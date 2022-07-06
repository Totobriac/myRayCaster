import { distance, normalizeAngle } from "./functions.js";

var wallsSprite = new Image();
wallsSprite.src = "./walls_2.png";

export class Ray {
  constructor(player, map, ctx, angleR, i) {
    this.x;
    this.y;
    this.player = player;
    this.dist = 0;
    this.map = map;
    this.ctx = ctx;
    this.yIntercept;
    this.xIntercept;
    this.xStep;
    this.yStep;
    this.angleR = angleR;
    this.isHittingX;
    this.isHittingY;
    this.wallHitHX;
    this.wallHitHY;
    this.wallHitVX;
    this.wallHitVY;
    this.wallHitX;
    this.wallHitY;
    this.angle = this.player.angle + this.angleR;
    this.lookUp;
    this.lookRight;
    this.index = i;
    this.distHit = 0;
    this.texturePix;
    this.texture;
    this.wallBottom;
    this.playerHeight = canvas.height / 2;
    this.screenDist;
  }
  update() {

    this.angle = this.player.angle + this.angleR;
    this.angle = normalizeAngle(this.angle)
    this.angle > Math.PI ? this.lookUp = true : this.lookUp = false;
    this.angle > Math.PI / 2 && this.angle < (3 * Math.PI) / 2 ? this.lookRight = false : this.lookRight = true;

    this.x = this.player.x;
    this.y = this.player.y;
  }
  cast() {
    this.update();
    this.xCollision();
    this.yCollision();
    this.checkTile();
    this.wallRendering();
    this.floorRendering();
    //this.draw();
  }
  yCollision() {

    this.isHittingY = false;

    this.yIntercept = Math.floor(this.y / this.map.mapS) * this.map.mapS;

    if (!this.lookUp) this.yIntercept += this.map.mapS;

    var xOffset = (this.yIntercept - this.y) / Math.tan(this.angle);

    this.xIntercept = this.x + xOffset;

    this.xStep = this.map.mapS / Math.tan(this.angle);

    this.yStep = this.map.mapS;

    if (this.lookUp) this.yStep *= -1;

    if ((!this.lookRight && this.xStep > 0) || (this.lookRight && this.xStep < 0)) {
      this.xStep *= -1;
    }

    var nextHorizX = this.xIntercept;
    var nextHorizY = this.yIntercept;

    if (this.lookUp) {
      nextHorizY--;
    }
    while (!this.isHittingY) {
      var xTile = Math.floor(nextHorizX / this.map.mapS);
      var yTile = Math.floor(nextHorizY / this.map.mapS);
      if (this.map.checkCollision(yTile, xTile)) {
        this.isHittingY = true;
        this.wallHitHX = nextHorizX;
        this.wallHitHY = nextHorizY;
      }
      else {
        nextHorizX += this.xStep;
        nextHorizY += this.yStep;
      }
    }
  }
  xCollision() {
    this.isHittingX = false;

    this.xIntercept = Math.floor(this.x / this.map.mapS) * this.map.mapS;

    if (this.lookRight) this.xIntercept += this.map.mapS;
    var yOffset = (this.xIntercept - this.x) * Math.tan(this.angle);

    this.yIntercept = this.y + yOffset;
    this.xStep = this.map.mapS;
    this.yStep = this.map.mapS * Math.tan(this.angle);

    if (!this.lookRight) this.xStep *= -1;

    if ((this.lookUp && this.yStep > 0) || (!this.lookUp && this.yStep < 0)) {
      this.yStep *= -1;
    }

    var nextHorizX = this.xIntercept;
    var nextHorizY = this.yIntercept;
    if (!this.lookRight) {
      nextHorizX--;
    }
    var mapWidth = this.map.mapX * this.map.mapS;
    var mapHeight = this.map.mapY * this.map.mapS;
    while (!this.isHittingX && (nextHorizX > 1 && nextHorizY > 1 && nextHorizX < mapWidth - 1 && nextHorizY < mapHeight - 1)) {
      var xTile = Math.floor(nextHorizX / this.map.mapS);
      var yTile = Math.floor(nextHorizY / this.map.mapS);
      if (this.map.checkCollision(yTile, xTile)) {
        this.isHittingX = true;
        this.wallHitVX = nextHorizX;
        this.wallHitVY = nextHorizY;
      }
      else {
        nextHorizX += this.xStep;
        nextHorizY += this.yStep;
      }
    }
  }
  checkTile() {
    var horizDst = 999999;
    var vertiDst = 999999;
    var square;

    if (this.isHittingY) {
      vertiDst = distance(this.x, this.y, this.wallHitHX, this.wallHitHY);
    }
    if (this.isHittingX) {
      horizDst = distance(this.x, this.y, this.wallHitVX, this.wallHitVY);
    }
    if (horizDst < vertiDst) {
      this.wallHitX = this.wallHitVX;
      this.wallHitY = this.wallHitVY;
      this.distHit = horizDst;

      square = Math.floor(this.wallHitY / this.map.mapS);
      this.texturePix = this.wallHitY - (square * this.map.mapS);

      this.texture = this.map.getTile(this.wallHitX, this.wallHitY);
    } else {
      this.wallHitX = this.wallHitHX;
      this.wallHitY = this.wallHitHY;
      this.distHit = vertiDst;

      square = Math.floor(this.wallHitX / this.map.mapS) * this.map.mapS;
      this.texturePix = this.wallHitX - square;

      this.texture = this.map.getTile(this.wallHitX, this.wallHitY);
    }

    this.distHit = this.distHit * Math.cos(this.player.angle - this.angle);
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "blue";
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.wallHitX, this.wallHitY);
    this.ctx.stroke();
  }
  wallRendering() {
    var realWallHeight = 700;
    this.screenDist = (canvas.width / 2) / Math.tan(this.player.FOV / 2);
    var wallHeight = (realWallHeight / this.distHit) * this.screenDist;

    var y0 = canvas.height / 2 - Math.floor(wallHeight / 2);
    var y1 = y0 + wallHeight;

    this.wallBottom = y1 + (wallHeight) * -1;

    var spriteHeight = 64;
    var screenSpriteHeight = y0 - y1;

    this.ctx.imageSmoothingEnabled = false;

    this.ctx.drawImage(
      wallsSprite,
      this.texturePix,
      this.texture * spriteHeight,
      1,
      63,
      this.index,
      y1,
      1,
      screenSpriteHeight
    );
  }
  floorRendering() {

    if (this.wallBottom < 400) {

      var pixies = 400 - this.wallBottom;
      var pixel = this.wallBottom;

      for (let i = 0; i < pixies; i++) {
        var directDistFloor = (this.screenDist * this.playerHeight) / pixel;
        var realDistance = directDistFloor / Math.cos(this.angle);

        var floorPointx = this.player.x + Math.cos(this.angle) * realDistance;
        var floorPointy = this.player.y - Math.sin(this.angle) * realDistance;

        var textX = Math.floor(floorPointx) - Math.floor(floorPointx / 64) * 64;
        var textY = Math.floor(floorPointy) - Math.floor(floorPointy / 64) * 64;

        // this.ctx.save()
        //this.ctx.fillStyle = "red"
        //this.ctx.fillRect(this.index, pixel,1,1)

        
        //this.ctx.drawImage(wallsSprite, textX, textY, 1, 1, this.index, pixel, 10, 10);
        //this.ctx.restore()
        pixel += 1;
      }
    }
  }
}



/*

if (this.wallBottom < 400) {

  var pixies = 400 - this.wallBottom;
  var pixel = this.wallBottom;

  for (let i = 0; i < pixies; i++) {
    var directDistFloor = (this.screenDist * this.playerHeight) / pixel;
    var realDistance = directDistFloor / Math.cos(this.angle);

    var floorPointx = this.player.x + Math.cos(this.angle) * realDistance;
    var floorPointy = this.player.y - Math.sin(this.angle) * realDistance;

    var textX = Math.floor(floorPointx) - Math.floor(floorPointx / 64) * 64;
    var textY = Math.floor(floorPointy) - Math.floor(floorPointy / 64) * 64;

    this.ctx.save()
    this.ctx.fillStyle = "red"
    this.ctx.fillRect(floorPointx, floorPointy,1,1)

    // if (this.index === 0 || this.index === 1199 || this.index === 599) this.ctx.fillRect(floorPointx/2, floorPointy/2,1,1)
    //this.ctx.drawImage(wallsSprite, textX, textY, 1, 1, this.index, pixel, (1 / this.distHit) * this.screenDist, (1/ this.distHit) * this.screenDist);
    this.ctx.restore()
    pixel+= 64;
  }
}
}

*/
