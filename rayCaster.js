import { Ray } from "./ray.js";
import { toRadians } from "./functions.js";

class RayCaster {
  constructor(player, map, ctx) {
    this.player = player;
    this.map = map;
    this.ctx = ctx;

    this.rayNb = canvas.width;
    this.rays = [];

    this.incAngle = toRadians(this.player.FOV / this.rayNb);
    this.startAngle = toRadians(this.player.angle - this.player.FOV / 2);
    this.rayAngle = this.startAngle;

    this.init();
  }
  init() {
    for (let i = 0; i < this.rayNb; i++) {
      this.rays[i] = new Ray(this.player, this.map, this.ctx, this.rayAngle);
      this.rayAngle += this.incAngle;      
    }
   
  }
  draw() {
    // console.log(this.rays[0].angle - this.player.angle);
    // console.log(this.rays[799].angle - this.player.angle);
    for (let i = 0; i < this.rays.length; i++) {
      this.rays[i].cast();
    }
  }
}

export { RayCaster };