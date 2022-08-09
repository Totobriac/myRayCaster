import { Player } from "./player.js";
import { Controls } from "./controls.js";
import { Map } from "./map.js";
import { RayCaster } from "./rayCaster.js";
import { createSprites, drawSprites } from "./sprite.js";
import { createEnemies } from "./enemy.js";
import { Hud } from "./hud.js";


var floorData;
var ceilData;
var backData;

var sprites = [];

var wallsSprite = new Image();

var path;

wallsSprite.onload = function () {
  tempCtx.drawImage(wallsSprite, 0, 64, 64, 64, 0, 0, 64, 64);
  floorData = tempCtx.getImageData(0, 0, 64, 64);

  tempCtx.drawImage(wallsSprite, 192, 64, 64, 64, 0, 0, 64, 64);
  ceilData = tempCtx.getImageData(0, 0, 64, 64);
}

wallsSprite.src = "./walls.png";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.height = 400;
canvas.width = 1200;

var tempCanvas = document.createElement('canvas');
var tempCtx = tempCanvas.getContext('2d');
tempCanvas.width = 64;
tempCanvas.height = 64;

var tempCanvas2 = document.createElement('canvas');
var tempCtx2 = tempCanvas2.getContext('2d');
tempCanvas2.width = 600;
tempCanvas2.height = 400;

var map = new Map(ctx);
var player = new Player(400, 800, map, ctx);
var controls = new Controls(player, map);
var rayCaster = new RayCaster(player, map, ctx);
var hud = new Hud(ctx);

Map.prototype.player = player;

createSprites(sprites, map.spritesList);
createEnemies(sprites, map.enemiesList);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgb(0, 57, 230)";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  map.draw();
  hud.draw();
  map.update();
  rayCaster.draw();
  drawSprites(sprites);
  player.update();  

  requestAnimationFrame(animate);
}

animate();

export { floorData, ceilData, backData, player, ctx, map};
