export class Ray {
  constructor(player, map, ctx) {
    this.player = player;
    this.dist = 0;
    this.map = map;
    this.ctx = ctx;
  }
  draw() {
    //radians
    var lookUp;
    var lookRight;

    var ang = this.player.angle;
    //console.log(ang * 180 / Math.PI);

    ang > Math.PI ? lookUp = true : lookUp = false;
    ang > Math.PI / 2 && ang < 3 * Math.PI / 2 ? lookRight = true : lookRight = false;

    var Xoffset = this.player.x - Math.floor(this.player.x / this.map.mapS) * this.map.mapS;
    var Yoffset = this.player.y - Math.floor(this.player.y / this.map.mapS) * this.map.mapS;

  }
}
