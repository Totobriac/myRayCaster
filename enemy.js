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
    this.radians;
    this.tickCount = 0;
    this.maxTickCount = 12;
    this.isInRange = false;
    this.isShot = false;
    this.life = 5;
    this.lifeCounter = true;
    this.dies = false;
    this.isDead = false;
    this.isSpriteRemoved = false;
  }
  removeSprite(index, enemy) {
    this.isSpriteRemoved = true;
    this.level.level.sprites.push([enemy.x, enemy.y, 0, this.type]);
    this.level.level.enemies.splice(index, 1);
  }
}

function createEnemies(enemyList) {
  for (let i = 0; i < enemyList.length; i++) {
    enemies[i] = new Enemy(enemyList[i][0], enemyList[i][1], eval(enemyList[i][2]), 0, player, ctx, map,  );
  }
}

function removeEnemies() {
  enemies = [];
}

function drawEnemies() {

  if (enemies.length === 0) createEnemies(map.enemiesList);

  enemies.sort(function (obj1, obj2) {
    return obj2.distance - obj1.distance;
  });
  for (let a = 0; a < enemies.length; a++) {

    enemies[a].draw();
    if (enemies[a].isDead === true && enemies[a].isSpriteRemoved === false) enemies[a].removeSprite(a, enemies[a]);
  }
}

export { drawEnemies, removeEnemies };
