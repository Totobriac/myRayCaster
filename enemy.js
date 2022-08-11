import { Sprite } from "./sprite.js";
import { player, ctx, map } from "./raycasting.js";
import { getPath } from "./pathFinder.js";

var guard = new Image();
guard.src = "./guard.png";



class Enemy extends Sprite {
  constructor(x, y, image, frame, player, still, ctx, map) {
    super(x, y, image, frame, player, still, ctx);
    this.level = map;
    this.angle = 180;
    this.tickCount = 0;
    this.guardPathTickount = 0;
    this.maxTickCount = 12;
    this.isInRange = false;
    this.isShot = false;
    this.life = 5;
    this.speed = 0;
    this.yFrame = 1;
    this.guardPath = 0;
    this.alerted = false;
    this.setMaxPath();
    this.path = [];
  }
  draw() {
    this.update();

    var playerX = Math.floor(this.player.x / 64 * 6);
    var playerY = Math.floor(this.player.y / 64 * 6);

    var X = Math.floor(this.x / 64);
    var Y = Math.floor(this.y / 64);

    ctx.save();
    ctx.translate(150, 200);
    ctx.rotate(3 * Math.PI / 2 - this.player.angle);

    ctx.fillStyle = "red";
    ctx.fillRect( X * 6 - playerX, Y * 6 - playerY, 4, 4);
    ctx.restore();
    super.draw();
  }
  setMaxPath() {
    this.maxPath = Math.floor(Math.random() * 4) * 64;
  }
  checkForCollision(x, y) {
    var collision = false;
    var Xoffset;
    var Yoffset;
    this.angle < 90 || this.angle > 270 ? Xoffset = 32 : Xoffset = -32;
    this.angle < 180 ? Yoffset = 32 : Yoffset = -32;
    var xGridNb = Math.floor((x + Xoffset) / this.level.mapS);
    var yGridNb = Math.floor((y + Yoffset) / this.level.mapS);
    if (this.level.checkPlayerCollision(yGridNb, xGridNb)) {
      collision = true;
    };
    return collision;
  }
  update() {

    this.playXGrid = Math.floor(this.player.x / 64);
    this.playYGrid = Math.floor(this.player.y / 64);

    if (!this.still) {
      var newX = this.x + Math.cos(this.angle * Math.PI / 180) * this.speed;
      var newY = this.y + Math.sin(this.angle * Math.PI / 180) * this.speed;

      if (!this.checkForCollision(newX, newY) && this.guardPath < this.maxPath) {
        this.x = newX;
        this.y = newY;
        this.guardPath++;
      } else {
        this.angle += 90;
        if (this.angle < 0) this.angle += 360;
        if (this.angle > 360) this.angle -= 360;
        this.guardPath = 0;
        this.setMaxPath();
      }
    }

    if (this.alerted) {
      this.findPath();

      if (this.path.length > 2) {
        if (this.path[0].x < this.path[1].x) {
          this.x += 3;
          this.angle = 0;
        } else if (this.path[0].x > this.path[1].x) {
          this.x -= 3;
          this.angle = 180;
        }

        if (this.path[0].y < this.path[1].y) {
          this.y += 3;
          this.angle = 90;
        } else if (this.path[0].y > this.path[1].y) {
          this.y -= 3;
          this.angle = 270;
        }
      }

    }

    var X = this.x - this.player.x;
    var Y = this.y - this.player.y;

    var p = 360 - (Math.atan2(Y, X) * 180 / Math.PI);

    if (p < 0) p += 360;
    if (p > 360) p -= 360;

    var diff = (this.player.angle * 180 / Math.PI) - this.angle;

    if (diff < 0) diff += 360;
    if (diff > 360) diff -= 360;

    switch (true) {
      case diff < 18:
        this.frame = 4
        break;
      case diff > 18 && diff < 67.5:
        this.frame = 5
        break;
      case diff > 67.5 && diff < 112.5:
        this.frame = 2
        break;
      case diff > 112.5 && diff < 157.5:
        this.frame = 1
        break;
      case diff > 157.5 && diff < 202.5:
        this.frame = 0
        break;
      case diff > 202.5 && diff < 247.5:
        this.frame = 7
        break;
      case diff > 247.5 && diff < 292.5:
        this.frame = 6
        break;
      case diff > 292.5 && diff < 337.5:
        this.frame = 3
        break;
      case diff > 342:
        this.frame = 4
        break;
    }

    if (this.distance < 256 && diff > 140 && diff < 220 && !this.alerted) this.alert();

    this.imageX = this.frame * 64;

    if (this.tickCount > this.maxTickCount) {
      this.yFrame < 4 ? this.yFrame++ : this.yFrame = 1;
      this.tickCount = 0;
    } else {
      this.tickCount++;
    }
    !this.still || this.alerted ? this.imageY = this.yFrame * 64 : this.imageY = 0;
  }
  alert() {
    this.alerted = true;
  }
  findPath() {
    if (this.guardPathTickount > this.maxTickCount * 1) {
      this.guardPathTickount = 0;
      this.path = getPath(this.ctx, this.player, this.level, this.x, this.y);
    } else {
      this.guardPathTickount++;
    }
  }
}

function createEnemies(sprites, enemyList) {
  let spLength = sprites.length;
  for (let i = 0; i < enemyList.length; i++) {
    sprites[i + spLength] = new Enemy(enemyList[i][0], enemyList[i][1], eval(enemyList[i][3]), enemyList[i][2], player, enemyList[i][4], ctx, map);
  }
}

export { createEnemies };
