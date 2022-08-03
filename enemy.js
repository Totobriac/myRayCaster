import { Sprite } from "./sprite.js";
import { player, ctx, map } from "./raycasting.js";

var enemies = [];

var guard = new Image();
guard.src = "./guard.png";

class Enemy extends Sprite {
  constructor(x, y, image, frame, player, ctx, map) {
    super(x, y, image, frame, player, ctx);
    this.level = map;
    this.speed = 1;
    this.angle = 220;
    this.tickCount = 0;
    this.maxTickCount = 12;
    this.isInRange = false;
    this.isShot = false;
    this.life = 5;
  }
  draw() {
    this.update();
    super.draw();
  }
  update() {
    var X = this.x - this.player.x;
    var Y = this.y - this.player.y;

    var p = 360 - ( Math.atan2(Y, X) * 180/ Math.PI);

    if (p < 0) p += 360;
    if (p > 360) p -= 360;

    var diff = p - this.angle;

    if (diff < 0) diff += 360;
    if (diff > 360) diff -= 360;

    switch (true) {
      case diff < 25:
        this.frame = 0
        break;
      case diff > 25 && diff < 65:
        this.frame = 1
        break;
      case diff > 65 && diff < 115:
        this.frame = 2
        break;
      case diff > 115 && diff < 155:
        this.frame = 3
        break;
      case diff > 155 && diff < 205:
        this.frame = 4
        break;
      case diff > 205 && diff < 245:
        this.frame = 5
        break;
      case diff > 245 && diff < 285:
        this.frame = 6
        break;
      case diff > 285 && diff < 325:
        this.frame = 7
        break;
      case diff > 325:
        this.frame = 0
        break;
      }

    this.imageX = this.frame * 64;
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
