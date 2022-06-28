export class Player {
  constructor(x, y, ctx) {
    this.color = "yellow";
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 8;
    this.ctx = ctx;
    this.angle = Math.PI /2;
    this.dX = Math.cos(this.angle) * 5;
    this.dY = Math.sin(this.angle) * 5;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.moveTo(this.x + 4, this.y + 4);
    this.ctx.lineTo(this.x + this.dX * 10 + 4, this.y + this.dY * 10 + 4);
    this.ctx.stroke();
  }
  up() {
    this.x += this.dX;
    this.y += this.dY;
  }
  down() {
    this.x -= this.dX;
    this.y -= this.dY;
  }
  right() {
    this.angle += 0.1;
    if (this.angle > 2 * Math.PI) this.angle -= 2 * Math.PI;
    this.dX = Math.cos(this.angle) * 10;
    this.dY = Math.sin(this.angle) * 10;
  }
  left() {
    this.angle -= 0.1;
    if (this.angle < 0) this.angle += 2 * Math.PI;
    this.dX = Math.cos(this.angle) * 10;
    this.dY = Math.sin(this.angle) * 10;
  }
}
