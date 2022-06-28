export class Ray {
  constructor(player, map) {
    this.player = player;
    this.dist = 0;
    this.map = map;
  }
  draw() {
    //radians
    var lookUp;
    var ang = this.player.angle;
    ang > Math.PI && ang > 0 ? lookUp = true : lookUp = false ;

    var Xoffset = this.player.x - Math.floor(this.player.x / this.map.mapS) * this.map.mapS;
    var Yoffset = this.player.y - Math.floor(this.player.y / this.map.mapS) * this.map.mapS;

    // check HorizCollision

    var cc = Yoffset / Math.sin(ang)
    console.log(cc);

    //console.log(Xoffset, Yoffset);

  }
}
