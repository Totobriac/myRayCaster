export class Map {
  constructor(ctx) {
    this.ctx = ctx;
    this.mapX = 8;
    this.mapY = 8;
    this.mapS = 64;
    this.grid = [
      1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 1, 0, 0, 0, 0, 1,
      1, 0, 1, 1, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 1,
    ]
  }
  draw() {
    for (let y = 0; y < this.mapY; y++) {
      for (let x = 0; x < this.mapX; x++) {
        var color;
        this.grid[y * this.mapX + x] === 1 ? color = "white" : color = "black";
        var Xo = x * this.mapS;
        var Yo = y * this.mapS;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(Xo +1, Yo + 1, this.mapS -2, this.mapS-2)
      }
    }
  }
}
