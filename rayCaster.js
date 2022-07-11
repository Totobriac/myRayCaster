import { Ray } from "./ray.js";
import { toRadians } from "./functions.js";

var floorSprite;


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
    this.screenDist = Math.floor((canvas.width / 2) / Math.tan((30 * Math.PI) / 180));
    this.init();

  }
  init() {
    floorSprite = this.ctx.createImageData(600, 400);

    for (let i = 0; i < this.rayNb; i++) {
      this.rays[i] = new Ray(this.player, this.map, this.ctx, this.rayAngle, this.screenDist, i);
      this.rayAngle += this.incAngle;
    }
  }
  draw() {

    this.ctx.putImageData(floorSprite, 0, 0);

    for (let i = 0; i < 600; i++) {
      this.rays[i].cast(floorSprite);
    }

  }
}
export { RayCaster };
