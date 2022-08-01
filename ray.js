import { distance, normalizeAngle } from "./functions.js";
import { floorData, ceilData } from "./raycasting.js";

var wallsSprite = new Image();
wallsSprite.src = "./walls.png";

var zBuffer = [];

export class Ray {
  constructor(player, map, ctx, angleR, screenDist, i) {
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
    this.playerHeight = 200;
    this.screenDist;
    this.floorPointx;
    this.floorPointy;
    this.screenDist = screenDist;
    this.wallToBorder;
  }
  update() {
    this.angle = this.player.angle + this.angleR;
    this.angle = normalizeAngle(this.angle)
    this.angle > Math.PI ? this.lookUp = true : this.lookUp = false;
    this.angle > Math.PI / 2 && this.angle < (3 * Math.PI) / 2 ? this.lookRight = false : this.lookRight = true;

    this.x = this.player.x;
    this.y = this.player.y;
  }
  cast(floorSprite) {
    this.update();
    this.collision();
    this.checkTile();
    this.wallRendering(floorSprite);
  }
  collision() {

    // yCollision

    this.isHittingY = false;
    this.yIntercept = Math.floor(this.y / 64) * 64;
    if (!this.lookUp) this.yIntercept += 64;
    var xOffset = (this.yIntercept - this.y) / Math.tan(this.angle);
    this.xIntercept = this.x + xOffset;
    this.xStep = 64 / Math.tan(this.angle);
    this.yStep = 64;
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
      var xTile = Math.floor(nextHorizX / 64);
      var yTile = Math.floor(nextHorizY / 64);
      if (this.map.checkCollision(yTile, xTile,nextHorizX, nextHorizY, this.angle, "yCollision", this.lookUp)) {
        this.isHittingY = true;
        this.wallHitHX = nextHorizX;
        this.wallHitHY = nextHorizY;
      } else {
        nextHorizX += this.xStep;
        nextHorizY += this.yStep;
      }
    }

    // xCollision

    this.isHittingX = false;
    this.xIntercept = Math.floor(this.x / 64) * 64;
    if (this.lookRight) this.xIntercept += 64;
    var yOffset = (this.xIntercept - this.x) * Math.tan(this.angle);
    this.yIntercept = this.y + yOffset;
    this.xStep = 64;
    this.yStep = 64 * Math.tan(this.angle);
    if (!this.lookRight) this.xStep *= -1;
    if ((this.lookUp && this.yStep > 0) || (!this.lookUp && this.yStep < 0)) {
      this.yStep *= -1;
    }
    var nextHorizX = this.xIntercept;
    var nextHorizY = this.yIntercept;
    if (!this.lookRight) {
      nextHorizX--;
    }
    var mapWidth = this.map.mapX * 64;
    var mapHeight = this.map.mapY * 64;
    while (!this.isHittingX && (nextHorizX > 1 && nextHorizY > 1 && nextHorizX < mapWidth - 1 && nextHorizY < mapHeight - 1)) {
      var xTile = Math.floor(nextHorizX / 64);
      var yTile = Math.floor(nextHorizY / 64);
      if (this.map.checkCollision(yTile, xTile, nextHorizX, nextHorizY, this.angle, "xCollision", this.lookRight)) {
        this.isHittingX = true;
        this.wallHitVX = nextHorizX;
        this.wallHitVY = nextHorizY;
      } else {
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
      var tex = this.map.getTile(this.wallHitHX, this.wallHitHY, "wall");
      if (tex && tex[0] === 8 && !this.lookUp) {
        this.wallHitHX += 32 / Math.tan(this.angle);
        this.wallHitHY += 32;
        vertiDst = distance(this.x, this.y, this.wallHitHX, this.wallHitHY);
      } else if (tex && tex[0] === 8 && this.lookUp) {
        this.wallHitHX -= 32 / Math.tan(this.angle);
        this.wallHitHY -= 32;
        vertiDst = distance(this.x, this.y, this.wallHitHX, this.wallHitHY);
      }
    }
    if (this.isHittingX) {
      horizDst = distance(this.x, this.y, this.wallHitVX, this.wallHitVY);
      var tex = this.map.getTile(this.wallHitVX, this.wallHitVY, "wall");
      if (tex[0] === 8 && this.lookRight) {
        this.wallHitVX += 32;
        this.wallHitVY += 32 * Math.tan(this.angle);
        horizDst = distance(this.x, this.y, this.wallHitVX, this.wallHitVY);
      } else if (tex[0] === 8 && !this.lookRight ) {
        this.wallHitVX -= 32;
        this.wallHitVY -= 32 * Math.tan(this.angle);
        horizDst = distance(this.x, this.y, this.wallHitVX, this.wallHitVY);
      }
    }
    if (horizDst < vertiDst) {
      this.wallHitX = this.wallHitVX;
      this.wallHitY = this.wallHitVY;
      this.distHit = horizDst;
      square = Math.floor(this.wallHitY / 64);
      this.texturePix = Math.floor(this.wallHitY) - (square * 64);
      this.texture = this.map.getTile(this.wallHitX, this.wallHitY, "wall");

      if (this.texture.length === 2) this.texture = this.texture[1];

    } else {
      this.wallHitX = this.wallHitHX;
      this.wallHitY = this.wallHitHY;
      this.distHit = vertiDst;
      square = Math.floor(this.wallHitX / 64) * 64;
      this.texturePix = Math.floor(this.wallHitX) - square;
      this.texture = this.map.getTile(this.wallHitX, this.wallHitY, "wall");

      if (this.texture.length === 2) this.texture = this.texture[0];

    }
    this.distHit = (this.distHit * Math.cos(this.player.angle - this.angle));

    zBuffer[this.index] = this.distHit;
  }
  wallRendering(floorSprite) {

    this.texture--;

    var realWallHeight = 64;

    var wallHeight = (realWallHeight / this.distHit) * this.screenDist;
    
    var y = 200 - Math.floor(wallHeight / 2);

    this.wallToBorder = Math.floor((400 - wallHeight) / 2);

    var yOffset = Math.floor(this.texture / 9);
    var xOffset = this.texture - (yOffset * 9);
    this.ctx.imageSmoothingEnabled = false;

    if (this.texture != 7) {
        this.ctx.drawImage(
          wallsSprite,
          xOffset * 64 + this.texturePix,
          yOffset * 64,
          1,
          63,
          this.index,
          y,
          1,
          wallHeight
        );
      } else {

          var doorStatus = this.map.getTile(this.wallHitX, this.wallHitY, "sprite");

          this.ctx.drawImage(
            wallsSprite,
            448 + this.texturePix - doorStatus[1],
            0,
            1,
            63,
            this.index,
            y,
            1,
            wallHeight
          );
    }


    //we check if the wall reaches the bottom of the canvas
    // this.wallToBorder = (400 - wallHeight) / 2;

    // we calculate how many pixels we have from bottom of wall to border of canvas
    var pixelsToBottom = this.wallToBorder;

    // we calculate the distance between the first pixel at the bottom of the wall and the player eyes (canvas.height / 2)
    var pixelRowHeight = 200 - pixelsToBottom;

    // then we loop through every pixels until we reach the border of the canvas

    for (let i = pixelRowHeight; i < 200; i += 1) {

      // we calculate the straight distance between the player and the pixel
      var directDistFloor = (this.screenDist * 200) / i;

      // we calculate it's real world distance with the angle relative to the player
      var realDistance = (directDistFloor / Math.cos(this.angleR));

      // we calculate it's real world coordinates with the player angle
      this.floorPointx = this.player.x + Math.cos(this.angle) * realDistance / (this.screenDist / 100);
      this.floorPointy = this.player.y + Math.sin(this.angle) * realDistance / (this.screenDist / 100);


      // we map the texture
      var textY = Math.floor(this.floorPointx % 64);
      var textX = Math.floor(this.floorPointy % 64);

      if (floorData && ceilData) {

        var shade = i - 170;
        var index = textY * 256 + textX * 4;

        floorSprite.data[(this.index * 4) + (i + 200) * 2400] = floorData.data[index] + shade
        floorSprite.data[(this.index * 4) + (i + 200) * 2400 + 1] = floorData.data[index + 1] + shade
        floorSprite.data[(this.index * 4) + (i + 200) * 2400 + 2] = floorData.data[index + 2] + shade
        floorSprite.data[(this.index * 4) + (i + 200) * 2400 + 3] = 255;

        floorSprite.data[(this.index * 4) + (200 - i) * 2400] = ceilData.data[index] + shade
        floorSprite.data[(this.index * 4) + (200 - i) * 2400 + 1] = ceilData.data[index + 1] + shade
        floorSprite.data[(this.index * 4) + (200 - i) * 2400 + 2] = ceilData.data[index + 2] + shade
        floorSprite.data[(this.index * 4) + (200 - i) * 2400 + 3] = 255;

      }
    }
  }
}

export { zBuffer };
