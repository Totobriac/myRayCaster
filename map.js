import { distance } from "./functions.js";

export class Map {
  constructor(ctx) {
    this.ctx = ctx;
    this.mapX = 26;
    this.mapY = 20;
    this.mapS = 64;
    this.tickCount = 0;
    this.maxTickCount = 6;
    this.wall = [
      [[  1],     [1],     [1],     [1], [    1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1], [1]],
      [[  1], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [    2], [    2], [    2], [ 2, 9], [    8], [ 2, 9], [    2], [    2], [    2], [    2], [    2], [    2], [    2], [    2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [    2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [    2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [    2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [ 9, 2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [ 9, 2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [    8], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    8], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [ 9, 2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [ 9, 2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [    2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [    2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [    2], [    2], [    2], [ 2, 9], [    8], [ 2, 9], [    2], [    2], [    2], [    2], [    2], [    2], [    2], [    2], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [1]],
      [[  1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1],     [1], [1]],
    ];
    this.sprites = [
      [[  0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[888], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [ 1,32], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [ 1,32], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [ 1,32], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [ 1,32], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [    0], [0]],
      [[  0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0],     [0], [0]],
    ];
    this.ceiling = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 0, 1],
      [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    this.floor = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 0, 1],
      [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]
  }
  draw() {

  for (let y = 0; y < this.mapY; y++) {
    for (let x = 0; x < this.mapX; x++) {
      var color;
      this.grid[y][x] != 0 ? color = "black" : color = "white";
      var Xo = x * this.mapS / 10;
      var Yo = y * this.mapS / 10;
      this.ctx.fillStyle = color;
      this.ctx.fillRect(Xo + 10, Yo + 10, this.mapS / 10, this.mapS / 10)
    }
  }
}
update() {
  // for (let j = 0; j < this.sprites.length; j++) {
  //   for (let i = 0; i < this.sprites[j].length; i ++) {
  //     if (this.sprites[j][i][0] == 1 && this.sprites[j][i][1] < 64) {
  //       this.sprites[j][i][1] += 0.5;
  //       console.log(this.sprites[j][i]);
  //     } else if (this.sprites[j][i][0] == 1 && this.sprites[j][i][1] === 64) {
  //       this.wall[j][i] = 0;
  //     }
  //   }
  // }
}
checkPlayerCollision(y, x) {
  var collision = false;
  if (this.wall[y][x] != 0) {
    collision = true;
  }
  return collision;
}
checkCollision(y, x, wallX, wallY, angle, XYcollision, direction) {
  var collision = false;
  var tile = this.wall[y][x];
  if (tile == 8) {
    var doorOffset = this.sprites[y][x];

    if (XYcollision === "xCollision") {
      if (direction) {
        wallX += 32;
        wallY += 32 * Math.tan(angle);
      } else {
        wallX -= 32;
        wallY -= 32 * Math.tan(angle);
      }
      var square = Math.floor(wallY / 64);
      var texturePix = Math.floor(wallY) - (square * 64);
      texturePix > doorOffset[1] ? collision = true : collision = false;
    } else if (XYcollision === "yCollision") {
      if (!direction) {
        wallX += 32 / Math.tan(angle);
        wallY += 32;
      } else {
        wallX -= 32 / Math.tan(angle);
        wallY -= 32;
      }
      var square = Math.floor(wallX / 64) * 64;
      var texturePix = Math.floor(wallX) - square;
      texturePix < doorOffset[1] ? collision = true : collision = false;
    }
  } else if (tile != 0) {
    collision = true;
  }
  return collision;
}
getTile(x, y, grid) {
  var X = Math.floor(x / this.mapS);
  var Y = Math.floor(y / this.mapS);
  var tile
  switch (grid) {
    case "wall":
      return this.wall[Y][X]
      break;
    case "ceiling":
      return this.ceiling[Y][X]
      break;
    case "floor":
      return this.floor[Y][X]
      break;
    default:
  }
}
}
