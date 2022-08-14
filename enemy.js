import { Sprite } from "./sprite.js";
import { player, ctx, map } from "./raycasting.js";
import { getPath } from "./pathFinder.js";

var guard = new Image();
guard.src = "./assets/guard.png";

var officer = new Image();
officer.src = "./assets/officer.png";


class Enemy extends Sprite {
  constructor(x, y, image, frame, player, still, ctx, type, map, character) {
    super(x, y, image, frame, player, still, ctx, type);
    this.level = map;
    this.angle = 0;
    this.tickCount = 0;
    this.guardPathTickount = 0;
    this.maxTickCount = 12;
    this.isInRange = false;
    this.isShot = false;
    this.life = 5;
    this.speed = Math.floor(Math.random() * 2) + 1;
    this.yFrame = Math.floor(Math.random() * 4);
    this.xFrame = 0;
    this.guardPath = 0;
    this.alerted = false;
    this.setMaxPath();
    this.path = [];
    this.isFiring;
    this.fireTickCount = 0;
    this.hitTickCount = 0;
    this.isHitten = false;
    this.life = 3;
    this.character = character;
  }
  draw() {
    this.update();
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

    if (this.alerted && !this.isHitten) {
      this.findPath();

      if (this.path.length > 2) {
        this.isFiring = false;
        if (this.path[0].x < this.path[1].x) {
          this.x += this.speed;
          this.angle = 0;
        } else if (this.path[0].x > this.path[1].x) {
          this.x -= this.speed;
          this.angle = 180;
        }

        if (this.path[0].y < this.path[1].y) {
          this.y += this.speed;
          this.angle = 90;
        } else if (this.path[0].y > this.path[1].y) {
          this.y -= this.speed;
          this.angle = 270;
        }
      } else {
        this.isFiring = true;
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

    if (this.life > 0) {
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
      this.imageX = this.frame * 64;
    }

    if (this.distance && this.distance < 200 && this.life > 0) this.alert();

    if (this.life > 0) {
      if ((!this.still || this.alerted) && !this.isFiring && !this.isHitten) {
        if (this.tickCount > this.maxTickCount) {
          this.yFrame < 4 ? this.yFrame++ : this.yFrame = 1;
          this.tickCount = 0;
        } else {
          this.tickCount++;
        }
        this.xFrame = 0;
        this.imageY = this.yFrame * 64;
        this.fireTickCount = 0;
      } else if (this.isFiring) {
        this.imageY = 6 * 64;
        this.imageX = this.xFrame * 64;
        if (this.fireTickCount > this.maxTickCount * 1.5) {
          this.xFrame < 2 ? this.xFrame++ : this.xFrame = 1;
          this.fireTickCount = 0;
          var rand = Math.floor(Math.random() * 10);          
          if (rand > 7) this.player.life -= 2;
        } else {
          this.fireTickCount++;
        }
      }
    } else {
      if (this.hitTickCount < this.maxTickCount / 2) {
        this.hitTickCount++;
      } else {
        if (this.xFrame === 0) this.xFrame = 1;
        this.hitTickCount = 0;
        if (this.xFrame < 4) {
          this.xFrame++;
        } else {
          this.alerted = false;
        }
        this.imageY = 5 * 64;
        this.imageX = this.xFrame * 64;
      }
    }

    if (this.isHitten) {
      this.alerted = true;
      if (this.life > 0) {
        if (this.hitTickCount < this.maxTickCount * 3) {
          this.hitTickCount++;
        } else {
          this.hitTickCount = 0;
          this.isHitten = false;
          this.player.chosenWeapon != 3 ? this.life-- : this.life -= 2;
        }
      }
      this.imageX = 0;
      this.imageY = 5 * 64;
    }
  }
  alert() {
    this.alerted = true;
  }
  isHit() {
    switch (true) {
      case this.player.chosenWeapon === 0 && this.distance < 64:
        if (!this.isHitten) this.isHitten = true;
        break;
      case this.player.chosenWeapon === 1 && this.distance < 256:
        if (!this.isHitten) this.isHitten = true;
        break;
      case this.player.chosenWeapon === 2 && this.distance < 512:
        if (!this.isHitten) this.isHitten = true;
        break;
      case this.player.chosenWeapon === 3 && this.distance < 256:
        if (!this.isHitten) this.isHitten = true;
        break;
    }
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
    sprites[i + spLength] = new Enemy(enemyList[i][0], enemyList[i][1], eval(enemyList[i][3]), enemyList[i][2], player, enemyList[i][4], ctx, "enemy", map, enemyList[i][3]);
  }
}

export { createEnemies };
