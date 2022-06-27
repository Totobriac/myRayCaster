export class Player {
  constructor(x, y, ctx) {
    this.color = "yellow";
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 9;
    this.ctx = ctx;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  up() {
    this.y -= 5;
  }
  down() {
    this.y += 5;
  }
  right() {
    this.x += 5;
  }
  left() {
    this.x -= 5;
  }
}
