import { Sprite } from "./sprite.js";
import { player, ctx, map } from "./raycasting.js";
import { normalizeAngle } from "./functions.js";

var enemies = [];

var guard = new Image();
guard.src = "./guard.png";

class Enemy extends Sprite {
  constructor(x, y, image, frame, player, ctx, map) {
    super(x, y, image, frame, player, ctx);
    this.level = map;
    this.speed = 1;
    this.angle = 180;
    this.tickCount = 0;
    this.maxTickCount = 12;
    this.isInRange = false;
    this.isShot = false;
    this.life = 5;
    this.speed = 0.2;
    this.yFrame = 1;
  }
  draw() {
    this.update();
    super.draw();
  }
  checkForCollision(x, y) {
    var collision = false;
    var xGridNb = Math.floor(x / this.level.mapS);
    var yGridNb = Math.floor(y / this.level.mapS);
    if (this.level.checkPlayerCollision(yGridNb, xGridNb)) {
      collision = true;
    };
    return collision;
  }
  update() {

    var newX = this.x + Math.cos(this.angle * Math.PI /180) * this.speed;
    var newY = this.y + Math.sin(this.angle * Math.PI /180) * this.speed;

    if (!this.checkForCollision(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }

    var X = this.x - this.player.x;
    var Y = this.y - this.player.y;

    var p = 360 - ( Math.atan2(Y, X) * 180/ Math.PI);

    if (p < 0) p += 360;
    if (p > 360) p -= 360;

    var diff = (this.player.angle * 180 / Math.PI)  + this.angle;

    if (diff < 0) diff += 360;
    if (diff > 360) diff -= 360;

    switch (true) {
      case diff < 18:
        this.frame = 4
        break;
      case diff > 18 && diff < 67.5:
        this.frame = 3
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
        this.frame = 5
        break;
      case diff > 342:
        this.frame = 4
        break;
    }

    this.imageX = this.frame * 64;

    if (this.tickCount > this.maxTickCount) {
      this.yFrame < 4 ? this.yFrame ++ : this.yFrame = 1;
      this.tickCount = 0;
    } else {
      this.tickCount ++;
    }

    this.imageY = this.yFrame * 64;
  }
}

function createEnemies(enemyList) {
  for (let i = 0; i < enemyList.length; i++) {
    enemies[i] = new Enemy(enemyList[i][0], enemyList[i][1], eval(enemyList[i][3]), enemyList[i][2], player, ctx, map,  );
  }
}

function removeEnemies() {
  enemies = [];
}

function drawEnemies() {

  if (!enemies.length) createEnemies(map.enemiesList);

  enemies.sort(function (obj1, obj2) {
    return obj2.distance - obj1.distance;
  });

  for (let a = 0; a < enemies.length; a++) {
    enemies[a].draw();
  }
}

export { drawEnemies, removeEnemies };
