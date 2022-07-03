import { Player } from "./player.js";
import { Controls } from "./controls.js";
import { Map } from "./map.js";
import { Ray } from "./ray.js";
import { RayCaster } from "./rayCaster.js";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.height = 400;
canvas.width = 800;

var map = new Map(ctx);
var player = new Player(200,200,map,ctx);
var controls = new Controls(player);
var rayCaster = new RayCaster(player, map, ctx);

function animate() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = "green";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  map.draw();
  player.draw();
  rayCaster.draw();

  requestAnimationFrame(animate);
}

animate();
