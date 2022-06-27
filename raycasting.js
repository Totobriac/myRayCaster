import { Player } from "./player.js";
import { Controls } from "./controls.js";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.height = 400;
canvas.width = 1200;

var player = new Player(200,200,ctx);
var controls = new Controls(player);


function animate() {

  ctx.fillStyle = "grey";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  player.draw();


  requestAnimationFrame(animate);
}

animate();
