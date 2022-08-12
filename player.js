import { normalizeAngle } from "./functions.js";

export class Player {
  constructor(x, y, map, ctx) {
    this.color = "yellow";
    this.x = x;
    this.y = y;
    this.map = map;
    this.ctx = ctx;
    this.angle = 0;
    this.speed = 1;
    this.moveForward = 0;
    this.rotate = 0;
    this.rotationSpeed = 2 * (Math.PI / 180);
    this.isColliding = false;
    this.FOV = 60;
    this.isMoving = false;
    this.isShooting;
    this.speedTick = 0;
    this.maxTickCount = 4;
    this.weapon = 0;
  }
  up() {
    this.moveForward = 1;
    this.isMoving = true;
    this.speedUp();
  }
  down() {
    this.moveForward = -1;
    this.isMoving = true;
  }
  right() {
    this.rotate = 1;
    this.speedUp();
  }
  left() {
    this.rotate = -1;
    this.speedUp();
  }
  stopMove() {
    this.moveForward = 0;
    this.isMoving = false;
  }
  stopTurn() {
    this.rotate = 0;
  }
  speedUp() {
    if(this.speedTick < this.maxTickCount + this.speed) {
      this.speedTick ++;
    } else {
      this.speedTick = 0;
      if (this.speed < 5) this.speed += 0.2;
    }
  }
  speedDown() {
    this.speed -= 1;
    if (this.speed < 1) this.speed = 1;
  }
  chooseWeapon(nb) {
    this.weapon = nb;
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
    if (this.isMoving) this.speedUp();
    if (!this.isMoving && this.speed > 1) this.speedDown();
  }
  draw() {
    this.update();
  }
  shoot(nb) {
    this.isShooting = true;
  }
  stopShoot() {
    this.isShooting = false;
  }
}
