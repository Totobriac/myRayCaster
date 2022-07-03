import { distance } from "./functions.js";

export class Ray {
  constructor(player, map, ctx) {
    this.x;
    this.y;
    this.anglele;
    this.player = player;
    this.dist = 0;
    this.map = map;
    this.ctx = ctx;
    this.yIntercept;
    this.xIntercept;
    this.xStep;
    this.yStep;

    this.wallHitHX;
    this.wallHitHY;

    this.wallHitVX;
    this.wallHitVY;
  }
  update() {
    this.x = this.player.x;
    this.y = this.player.y;
    this.angle = this.player.angle;
  }
  cast() {

    this.update();
    this.yCollision();
    this.xCollision();

  }
  yCollision() {
    var isHittingY = false;

    this.yIntercept = Math.floor(this.y / this.map.mapS) * this.map.mapS;

    if (!this.player.lookUp) this.yIntercept += this.map.mapS;

    var xOffset = (this.yIntercept - this.y) / Math.tan(this.angle);

    this.xIntercept = this.x + xOffset;

    this.xStep = this.map.mapS / Math.tan(this.angle);
    this.yStep = this.map.mapS;

    if (this.player.lookUp) this.yStep = -this.yStep;

    if ((!this.player.lookRight && this.xStep > 0) || (this.player.lookRight && this.xStep < 0)) {
      this.xStep = -this.xStep;
    }

    var nextHorizX = this.xIntercept;
    var nextHorizY = this.yIntercept;

    if (this.player.lookUp) {
      nextHorizY--;
    }

    while (!isHittingY) {
      var xTile = Math.floor(nextHorizX / this.map.mapS);
      var yTile = Math.floor(nextHorizY / this.map.mapS);

      if (this.map.checkCollision(yTile, xTile)) {
        isHittingY = true;
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
    var isHittingX = false;

    this.xIntercept = Math.floor(this.x / this.map.mapS) * this.map.mapS;

    if (this.player.lookRight) this.xIntercept += this.map.mapS;

    var yOffset = (this.xIntercept - this.x) * Math.tan(this.angle);

    this.yIntercept = this.y + yOffset;    

    this.xStep = this.map.mapS;
    this.yStep = this.map.mapS * Math.tan(this.angle);    

    if (!this.player.lookRight) this.xStep = -this.xStep;
    
    if ((this.player.lookUp && this.yStep > 0) || (!this.player.lookUp && this.yStep < 0)) {
      this.yStep = -this.yStep;
    }

    var nextHorizX = this.xIntercept;
    var nextHorizY = this.yIntercept;

    if (!this.player.lookRight) {
      nextHorizX--;
    }

    var mapWidth = this.map.mapX * this.map.mapS;
    var mapHeight = this.map.mapY * this.map.mapS;

    while (!isHittingX && (nextHorizX > 0 && nextHorizY > 0 && nextHorizX < mapWidth && nextHorizY < mapHeight)) {
      var xTile = Math.floor(nextHorizX / this.map.mapS);
      var yTile = Math.floor(nextHorizY / this.map.mapS);

      if (this.map.checkCollision(yTile, xTile)) {
        isHittingX = true;
        this.wallHitVX = nextHorizX;
        this.wallHitVY = nextHorizY;
      }
      else {
        nextHorizX += this.xStep;
        nextHorizY += this.yStep;
      }
    }

    this.ctx.beginPath();
    this.ctx.strokeStyle = "red";
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.wallHitVX, this.wallHitVY);
    this.ctx.stroke();

  }
  checkTile() {
    var rHorizDst = 999999;
    var rVericDst = 999999;

    
  }
}
