import { Player } from "./player.js";
import { Controls } from "./controls.js";
import { Map } from "./map.js";
import { RayCaster, floorSprite } from "./rayCaster.js";
import { drawSprites } from "./sprite.js";
import { Hud } from "./hud.js";
import { Weapon } from "./weapons.js";
import { drawMini, generateMonsters } from "./init.js";
import { SoundPlayer } from "./sound.js";




var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d',{ alpha: false });
canvas.height = 400;
canvas.width = 1200;

var map = new Map(ctx);
var miniMap = drawMini(map);

//var player = new Player(1980, 2434, map, ctx);
var player = new Player(1000, 2435, map, ctx);
var controls = new Controls(player, map);
var rayCaster = new RayCaster(player, map, ctx);
var hud = new Hud(ctx, player, map);
var soundPlayer = new SoundPlayer();

Map.prototype.player = player;

map.initSprites();
generateMonsters(map);

var weapon = new Weapon(ctx, player, map);

function animate() {
  soundPlayer.mainTheme();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(600, 0);
  ctx.lineTo(600,400)
  ctx.stroke();
  hud.draw(map.spritesList , miniMap);
  map.update();
  rayCaster.draw();
  drawSprites(map);
  player.update();
  weapon.draw();

  requestAnimationFrame(animate);
}

animate();

export { player, ctx, map, soundPlayer };
