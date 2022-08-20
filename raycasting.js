import { Player } from "./player.js";
import { Controls } from "./controls.js";
import { Map } from "./map.js";
import { RayCaster } from "./rayCaster.js";
import { createSprites, drawSprites } from "./sprite.js";
import { createEnemies } from "./enemy.js";
import { Hud } from "./hud.js";
import { Weapon } from "./weapons.js";
import { drawMini } from "./init.js";


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d',{ alpha: false });
canvas.height = 400;
canvas.width = 1200;

var sprites = [];

var map = new Map(ctx);
var miniMap = drawMini(map);
//var player = new Player(1980, 2434, map, ctx);
var player = new Player(1000, 2435, map, ctx);

var controls = new Controls(player, map);
var rayCaster = new RayCaster(player, map, ctx);
var hud = new Hud(ctx, player, map);
var weapon = new Weapon(ctx, player);

Map.prototype.player = player;

async function generateSprites() {
  createSprites(sprites, map);
}

generateSprites().then(createEnemies(sprites, map.enemiesList));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(600, 0);
  ctx.lineTo(600,400)
  ctx.stroke();
  hud.draw(sprites, miniMap);
  map.update();
  rayCaster.draw();
  drawSprites(sprites);
  player.update();
  weapon.draw(sprites);

  requestAnimationFrame(animate);
}

animate();



export { player, ctx, map, sprites };
