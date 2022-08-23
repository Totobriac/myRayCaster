import { Sprite } from "./sprite.js";
import { getPath } from "./pathFinder.js";
import { distance } from "./functions.js";
import { soundPlayer } from "./raycasting.js";


class Enemy extends Sprite {
  constructor(x, y, image, frame, player, still, ctx, map, character) {
    super(x, y, image, frame, player, still, ctx);
    this.level = map;
    this.angle = 0;
    this.tickCount = 0;
    this.guardPathTickount = 0;
    this.maxTickCount = 12;
    this.isInRange = false;
    this.xFrame = 0;
    this.guardPath = 0;
    this.alerted = false;
    this.path = [];
    this.isFiring;
    this.fireTickCount = 0;
    this.hitTickCount = 0;
    this.isHitten = false;
    this.type = "enemy";
    this.character = character;
    this.sawEnemy = false;
    this.isDead = false;
    this.setStats();
  }
  draw() {
    this.update();
    super.draw();
  }
  checkForCollision(x, y) {
    var collision = false;
    var Xoffset = 0;
    var Yoffset = 0;
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

    if (!this.still && !this.alerted) {
      var newX = this.x + Math.cos(this.angle * Math.PI / 180) * this.speed;
      var newY = this.y + Math.sin(this.angle * Math.PI / 180) * this.speed;

      if (!this.checkForCollision(newX, newY) ) {
        this.x = newX;
        this.y = newY;
        this.guardPath++;
      } else {
        this.angle += 90;
        if (this.angle < 0) this.angle += 360;
        if (this.angle > 360) this.angle -= 360;
        this.guardPath = 0;
      }
    }

    if (this.alerted && !this.isHitten) {
      // il suit le joueur
      this.findPath();

      // si il est plus loin que son champs de tir, il le suit, sinon il tire
      if (this.path.length === 0) {
        this.isFiring = false;
      } else if (this.path.length > this.fireRange) {
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

    // on choisit le sprite en fonction de son angle par rapport au joueur
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

    if (this.distance && this.distance < 200 && this.life > 0 && !this.alerted) {
      this.alerted = true
      this.shout();
    };

    //if (this.path.length === 0 && this.distance > 200 ) this.alerted = false;

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
        if (!this.sawEnemy)  this.shout()
        this.imageY = 6 * 64;
        this.imageX = this.xFrame * 64;
        if (this.fireTickCount > this.maxTickCount * 1.5) {
          this.xFrame < 2 ? this.xFrame++ : this.xFrame = 1;
          this.fireTickCount = 0;
          if (this.sawEnemy && this.xFrame === 1) this.shootSound();
          var rand = Math.floor(Math.random() * 10);
          if (rand > 7) {
            this.player.life -= 2;
          }
        } else {
          this.fireTickCount++;
        }
      }
    } else {
      if (!this.isDead) this.deathShout()
      this.alerted = false;
      this.still = true;
      if (this.hitTickCount < this.maxTickCount / 4) {
        this.hitTickCount++;
      } else {
        if (this.xFrame === 0) this.xFrame = 1;
        this.hitTickCount = 0;
        if (this.xFrame < 4) {
          this.xFrame++;
        }
        this.imageY = 5 * 64;
        this.imageX = this.xFrame * 64;
      }
    }
    if (this.isHitten) {
      this.stopShootSound();
      this.hitSound();
      this.alerted = true;
      alertNme(this.x, this.y, this.level);
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
    if (this.guardPathTickount > this.maxTickCount) {
      this.guardPathTickount = 0;
      this.path = getPath(this.player, this.level, this.x, this.y);
    } else {
      this.guardPathTickount++;
    }
  }
  setStats() {
    this.yFrame = Math.floor(Math.random() * 4);
    this.maxPath = Math.floor(Math.random() * 8) * 64;
    switch (this.character) {
      case "guard":
        this.fireRange = Math.floor(Math.random() * 2 + 2);
        this.life = 6;
        this.speed = Math.floor(Math.random() * 1) + 2
        break;
      case "officer":
        this.fireRange = Math.floor(Math.random() * 2 + 4);
        this.life = 8;
        this.speed = Math.floor(Math.random() * 2) + 2
        break;
      case "dog":
        this.fireRange = 2;
        this.life = 6;
        this.speed = 5;
        break;
      case "boss1":
        this.fireRange = Math.floor(Math.random() * 2 + 4);
        this.life = 20;
        this.speed = 4;
        break;
      case "boss2":
        this.fireRange = Math.floor(Math.random() * 2 + 4);
        this.life = 25;
        this.speed = 4;
        break;
      case "boss3":
        this.fireRange = Math.floor(Math.random() * 2 + 2);
        this.life = 30;
        this.speed = 4;
        break;
    }
  }
  shout() {
    this.sawEnemy = true;
    switch (this.character) {
      case "guard":
        soundPlayer.achtung();
        break;
      case "officer":
        soundPlayer.spy();
        break;
      case "dog":
        soundPlayer.bark();
    }
  }
  deathShout() {
    this.isDead = true;
    switch (this.character) {
      case "guard":
        soundPlayer.mom();
        break;
      case "officer":
        soundPlayer.leben();
        break;
      case "dog":
        soundPlayer.dogRip();
        break;
    }
  }
hitSound() {
  switch (this.character) {
    case "guard":
    case "officer":
      soundPlayer.nmePain();
      break;
    case "dog":
      soundPlayer.dogHit();
      break;
  }
}
  shootSound() {
    switch (this.character) {
      case "guard":
      case "officer":
        soundPlayer.nmeShoot();
        break;
      case "dog":
        soundPlayer.bite();
        break;
      }
  }
  stopShootSound() {
    switch (this.character) {
      case "guard":
      case "officer":
        soundPlayer.stopNmeShoot();
        break;
      case "dog":
        soundPlayer.stopBite();
        break;
      }
  }

}

function alertNme(x, y, level) {
  for (let i = 0; i < level.spritesList.length; i++) {    if (level.spritesList[i] && level.spritesList[i].type === "enemy" && level.spritesList[i].life > 0) {
      var dist = distance(level.spritesList[i].x, level.spritesList[i].y, x, y);
      if (dist < 128) level.spritesList[i].alerted = true;
    }
  }
}

export { Enemy };
