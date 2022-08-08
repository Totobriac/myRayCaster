import { normalizeAngle } from "./functions.js";

export class Player {
  constructor(x, y, map, ctx) {
    this.color = "yellow";
    this.x = x;
    this.y = y;
    this.map = map;
    this.ctx = ctx;
    this.angle = 0;
    this.speed = 4;
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
    if (this.map.checkPlayerCollision(yGridNb, xGridNb)) {
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
  }
}
