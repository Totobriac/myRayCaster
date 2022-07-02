import { normalizeAngle } from "./functions.js";

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

    console.log(this.angle);
    
    if (!this.checkForCollision(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }

  }
  draw() {
    this.update();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x - 4, this.y - 4, this.width, this.height);

    var xDestino = this.x + Math.cos(this.angle) * 20;
    var yDestino = this.y + Math.sin(this.angle) * 20;

    this.ctx.beginPath();
    this.ctx.strokeStyle = "red";
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(xDestino, yDestino);
    this.ctx.stroke();
  }
}
