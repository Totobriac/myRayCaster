class Hud {
  constructor(ctx) {
    this.ctx = ctx;
  }
  draw() {
    this.ctx.fillStyle = "rgb(0,0,164)";
    this.ctx.fillRect(900, 0, 8, 400);
    this.ctx.fillRect(1192, 0, 8, 400);
    this.ctx.fillRect(900, 0, 300, 8);
    this.ctx.fillRect(900, 392, 300, 8);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(900, 0, 4, 400);
    this.ctx.fillRect(1196, 0, 4, 400);
    this.ctx.fillRect(900, 0, 300, 4);
    this.ctx.fillRect(900, 396, 300, 4);

    this.ctx.font = "48px wolf";
    this.ctx.fillStyle = "rgb(242, 242, 242)";
    this.ctx.fillText('level 1', 10, 44);
  }
}

export { Hud };
