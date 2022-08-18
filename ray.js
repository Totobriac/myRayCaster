import { distance, normalizeAngle } from "./functions.js";
import { floorData } from "./init.js";

var wallsSprite = new Image();
wallsSprite.src = "./assets/walls2.png";

var zBuffer = [];

export class Ray {
  constructor(player, map, ctx, angleR, screenDist, i) {
    this.player = player;
    this.x = player.x;
    this.y = player.y;
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
    //if (this.index === 0) console.log(this.lookRight, this.lookUp, this.texture)
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
      if (this.map.checkCollision(yTile, xTile, nextHorizX, nextHorizY, this.angle, "yCollision", this.lookUp)) {
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
      if (tex && (tex[0] == 25 || tex[0] == 24) && !this.lookUp) {        
        this.wallHitHX += 32 / Math.tan(this.angle);
        this.wallHitHY += 32;
        vertiDst = distance(this.x, this.y, this.wallHitHX, this.wallHitHY);
      } else if (tex && (tex[0] == 25 || tex[0] === 24) && this.lookUp) {       
        this.wallHitHX -= 32 / Math.tan(this.angle);
        this.wallHitHY -= 32;
        vertiDst = distance(this.x, this.y, this.wallHitHX, this.wallHitHY);
      }
    }
    if (this.isHittingX) {
      horizDst = distance(this.x, this.y, this.wallHitVX, this.wallHitVY);
      var tex = this.map.getTile(this.wallHitVX, this.wallHitVY, "wall");
      if (tex[0] == 25 || tex[0] === 24 && this.lookRight) {       
        this.wallHitVX += 32;
        this.wallHitVY += 32 * Math.tan(this.angle);
        horizDst = distance(this.x, this.y, this.wallHitVX, this.wallHitVY);
      } else if (tex[0] == 25 || tex[0] === 24 && !this.lookRight) {          
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
    } else {
      this.wallHitX = this.wallHitHX;
      this.wallHitY = this.wallHitHY;
      this.distHit = vertiDst;
      square = Math.floor(this.wallHitX / 64) * 64;
      this.texturePix = Math.floor(this.wallHitX) - square;
      this.texture = this.map.getTile(this.wallHitX, this.wallHitY, "wall");
      this.texture ++;
    }
    this.distHit = this.distHit * Math.cos(this.player.angle - this.angle);
   
    zBuffer[this.index] = this.distHit;
  }
  wallRendering(floorSprite) {

    var realWallHeight = 64;

    var wallHeight = (realWallHeight / this.distHit) * this.screenDist;

    var y = 200 - Math.floor(wallHeight / 2);

    this.wallToBorder = Math.floor((400 - wallHeight) / 2);

    var line = Math.floor(this.texture / 10);
    var col = this.texture - (line * 10); 

    this.ctx.imageSmoothingEnabled = false;

    if (this.texture != 24 && this.texture != 25 ) {
      this.ctx.drawImage(
        wallsSprite,
        col * 64 + this.texturePix,        
        line * 64,
        1,
        63,
        this.index + 300,
        y,
        1,
        wallHeight
      );
    } 
    else {
      var X = Math.floor(this.wallHitX / 64);
      var Y = Math.floor(this.wallHitY / 64);
      var i = this.map.getDoor(X, Y);

      var yO;
      this.texture === 24 ? yO = 4 : yO = 5;
     
      this.ctx.drawImage(
        wallsSprite,
        (yO*64) + this.texturePix - this.map.doors[i].yOffset,
        128,
        1,
        63,
        this.index + 300,
        y,
        1,
        wallHeight
      );
    }


    // we calculate the distance between the first pixel at the bottom of the wall and the player eyes (canvas.height / 2)
    var pixelRowHeight = 200 - this.wallToBorder;

    // then we loop through every pixels until we reach the border of the canvas
    if (this.index % 2 === 0) {

      for (let i = pixelRowHeight; i < 200; i += 1) {

        // we calculate the straight distance between the player and the pixel
        var directDistFloor = (this.screenDist * 200) / i;

        // we calculate it's real world distance with the angle relative to the player
        var realDistance = (directDistFloor / Math.cos(this.angleR));

        // we calculate it's real world coordinates with the player angle
        // 5.19 = this.screenDist / 100
        this.floorPointX = this.player.x + Math.cos(this.angle) * realDistance / (5.19);
        this.floorPointY = this.player.y + Math.sin(this.angle) * realDistance / (5.19);

        var floorTextNb;
        var ceilingTextNb;

        if (this.floorPointX > 128 && this.floorPointX < 192 && this.floorPointY > 128 && this.floorPointY < 192  ) {
          floorTextNb = 11;          
        } else {
          floorTextNb = 12;
        }

        if (this.floorPointX > 1000) {
          ceilingTextNb = 1;
        } else if (this.floorPointX < 800 ) {
          ceilingTextNb = 1;
        } else {
          ceilingTextNb = 1;
        }
        
        var floorYOffset = Math.floor(floorTextNb / 10) * 64;
        var floorXOffset = (floorTextNb - (floorYOffset/6.4)) * 64;

        var floorTextX = Math.floor(this.floorPointX % 64) + floorXOffset ;
        var floorTextY = Math.floor(this.floorPointY % 64) + floorYOffset ;


        var ceilingYOffset = Math.floor(ceilingTextNb / 10) * 64;
        var ceilingXOffset = (ceilingTextNb - (ceilingYOffset/6.4)) * 64;

        var ceilingTextX = Math.floor(this.floorPointX % 64) + ceilingXOffset ;
        var ceilingTextY = Math.floor(this.floorPointY % 64) + ceilingYOffset ;

        if (floorData) {
          
          var floorShade;
          var ceilingShade;

          floorTextNb === 11 ? floorShade = 0 : floorShade = i - 170;
          ceilingTextNb === 11 ? ceilingShade = 0 : ceilingShade = i - 170;

          var floorIndex = floorTextY * 2304 + floorTextX * 4;
          var ceilingIndex = ceilingTextY * 2304 + ceilingTextX * 4;

          for (let j = 0; j < 3; j++) {
            floorSprite.data[((this.index * 4)) + (i + 200) * 2400 + j] = floorData.data[floorIndex + j] + floorShade;
            floorSprite.data[(this.index + 1) * 4 + (i + 200) * 2400 + j] = floorData.data[floorIndex + j] + floorShade;

            floorSprite.data[((this.index * 4)) + (200 - i) * 2400 + j] = floorData.data[ceilingIndex + j] + ceilingShade;
            floorSprite.data[((this.index + 1)) * 4 + (200 - i) * 2400 + j] = floorData.data[ceilingIndex + j] + ceilingShade;
          }
        }
      }
    }
  }
}

export { zBuffer };
