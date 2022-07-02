export class Player {
  constructor(x, y, ctx) {
    this.color = "yellow";
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 8;
    this.ctx = ctx;
    this.angle =0;
    this.speed = 3;
    this.moveForward = 0;
    this.rotate = 0;
    this.rotationSpeed = 3 * (Math.PI / 180);
  }
  up() {
    this.moveForward = 1;
  }
  down() {
    this.moveForward = -1;
  }
  right() {
    this.rotate = 1;
  }
  left() {
    this.rotate = -1;
  }
  stopMove() {
    this.moveForward = 0;
  }
  stopTurn() {
    this.rotate = 0;
  }
  update() {
    var newX = this.x + this.moveForward * Math.cos(this.angle) * this.speed;
    var newY = this.y + this.moveForward * Math.sin(this.angle) * this.speed;

    this.angle += this.rotate * this.rotationSpeed;
    this.x = newX;
    this.y = newY;
  }
  draw() {
    this.update();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
