import { Player } from "./player.js";
import { Controls } from "./controls.js";
import { Map } from "./map.js";
import { RayCaster } from "./rayCaster.js";
import { createSprites, drawSprites } from "./sprite.js";
import { createEnemies } from "./enemy.js";
import { Hud } from "./hud.js";
import { Weapon } from "./weapons.js";


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d',{ alpha: false });
canvas.height = 400;
canvas.width = 1200;

var sprites = [];

var map = new Map(ctx);
var player = new Player(400, 800, map, ctx);
var controls = new Controls(player, map);
var rayCaster = new RayCaster(player, map, ctx);
var hud = new Hud(ctx, player, map);
var weapon = new Weapon(ctx, player);

Map.prototype.player = player;

async function generateSprites() {
  createSprites(sprites, map);
}

generateSprites().then(createEnemies(sprites, map.enemiesList));
// createSprites(sprites, map);
// createEnemies(sprites, map.enemiesList)

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hud.draw(sprites);
  map.update();
  rayCaster.draw();
  drawSprites(sprites);
  player.update();
  weapon.draw(sprites);
  requestAnimationFrame(animate);
}

animate();



export { player, ctx, map };
