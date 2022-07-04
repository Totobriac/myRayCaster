import { normalizeAngle } from "./functions.js";
import { Ray } from "./ray.js";

export class Player {
  constructor(x, y, map, ctx) {
    this.color = "yellow";
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 8;
    this.map = map;
    this.ctx = ctx;
    this.angle = 0;
    this.speed = 3;
    this.moveForward = 0;
    this.rotate = 0;
    this.rotationSpeed = 3 * (Math.PI / 180);
    this.isColliding = false;
    this.FOV = 60;
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
  checkForCollision(x, y) {
    var collision = false;
    var xGridNb = Math.floor(x / this.map.mapS);
    var yGridNb = Math.floor(y / this.map.mapS);
    if (this.map.checkCollision(yGridNb, xGridNb)) {
      collision = true;
    };
    return collision;
  }
  update() {

    var newX = this.x + this.moveForward * Math.cos(this.angle) * this.speed;
    var newY = this.y + this.moveForward * Math.sin(this.angle) * this.speed;

    this.angle += this.rotate * this.rotationSpeed;
    this.angle = normalizeAngle(this.angle);

    if (!this.checkForCollision(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }
  draw() {
    this.update();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x - 4, this.y - 4, this.width, this.height);

    var ttt = -30 * (Math.PI / 180) + this.angle;
    var tt = 30 * (Math.PI / 180) + this.angle;

    var xDest = this.x + Math.cos(ttt) * 220;
    var yDest = this.y + Math.sin(ttt) * 220;

    var xDes = this.x + Math.cos(tt) * 220;
    var yDes = this.y + Math.sin(tt) * 220;

    this.ctx.save();
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "white";
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(xDest, yDest);
    this.ctx.stroke();

    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "white";
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(xDes, yDes);
    this.ctx.stroke();

    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "red";
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.rays[399].wallHitX, this.rays[399].wallHitY);
    this.ctx.stroke();

    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "orange";
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.rays[799].wallHitX, this.rays[799].wallHitY);
    this.ctx.stroke();

    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "green";
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.rays[0].wallHitX, this.rays[0].wallHitY);
    this.ctx.stroke();

    this.ctx.restore();
  }
}
