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

    this.isHittingX;
    this.isHittingY;

    this.wallHitHX;
    this.wallHitHY;

    this.wallHitVX;
    this.wallHitVY;

    this.wallHitX;
    this.wallHitY;
  }
  update() {
    this.x = this.player.x;
    this.y = this.player.y;
    this.angle = this.player.angle;
  }
  cast() {

    this.update();
    this.xCollision();
    this.yCollision();

    this.checkTile();
  }
  yCollision() {
    this.isHittingY = false;

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

    if (this.isHittingY) {
      vertiDst = distance(this.x, this.y, this.wallHitHX, this.wallHitHY);      
    }

    if (this.isHittingX) {
      horizDst = distance(this.x, this.y, this.wallHitVX, this.wallHitVY);      
    }

    if (horizDst < vertiDst) {
      this.wallHitX = this.wallHitVX;
      this.wallHitY = this.wallHitVY;
    } else {
      this.wallHitX = this.wallHitHX;
      this.wallHitY = this.wallHitHY;
    }

  this.ctx.beginPath();
  this.ctx.strokeStyle = "blue";
  this.ctx.moveTo(this.x, this.y );
  this.ctx.lineTo(this.wallHitX, this.wallHitY);
  this.ctx.stroke();
  }

}
