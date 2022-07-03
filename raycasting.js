import { Player } from "./player.js";
import { Controls } from "./controls.js";
import { Map } from "./map.js";
import { Ray } from "./ray.js";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.height = 512;
canvas.width = 1024;

var map = new Map(ctx);
var player = new Player(200,200,map,ctx);
var controls = new Controls(player);
var ray = new Ray(player, map, ctx);

function animate() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = "grey";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  map.draw();
  player.draw();
  ray.cast();

  requestAnimationFrame(animate);
}

animate();
