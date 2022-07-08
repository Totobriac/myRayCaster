import { Player } from "./player.js";
import { Controls } from "./controls.js";
import { Map } from "./map.js";
import { RayCaster } from "./rayCaster.js";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.height = 400;
canvas.width = 600;

var map = new Map(ctx);
var player = new Player(128, 65, map, ctx);
var controls = new Controls(player);
var rayCaster = new RayCaster(player, map, ctx);

Player.prototype.rays = rayCaster.rays;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rayCaster.draw();

  player.draw();

  requestAnimationFrame(animate);
}

animate();
