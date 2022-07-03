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
  }
  update() {
    this.x = this.player.x;
    this.y = this.player.y;
    this.angle = this.player.angle;
  }
  cast() {

    this.update();

    var isHittingY = false;

    var lookUp;
    var lookRight;

    this.angle > Math.PI ? lookUp = true : lookUp = false;
    this.angle > Math.PI / 2 && this.angle < 3 * Math.PI / 2 ? lookRight = false : lookRight = true;

    this.yIntercept = Math.floor(this.y / this.map.mapS) * this.map.mapS;

    if (!lookUp) this.yIntercept += this.map.mapS;

    var xOffset = (this.yIntercept - this.y) / Math.tan(this.angle);

    this.xIntercept = this.x + xOffset;    

    this.xStep = this.map.mapS / Math.tan(this.angle);
    this.yStep = this.map.mapS;

    if (lookUp) this.yStep = -this.yStep;

    if ((!lookRight && this.xStep > 0) || (lookRight && this.xStep < 0)) {
      this.xStep = -this.xStep;
    }

    var nextHorizX = this.xIntercept;
    var nextHorizY = this.yIntercept;

    if (lookUp) {
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

    this.ctx.beginPath()
    this.ctx.moveTo(this.x, this.y)
    this.ctx.lineTo(this.wallHitHX, this.wallHitHY)
    this.ctx.stroke()
    }
}
