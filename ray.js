export class Ray {
  constructor(player) {
    this.player = player;
    this.dist = 0;
  }
  draw() {
    var ang = this.player.angle;
    console.log(ang);
    var tan = -1/Math.tan(ang);
    //if (ang > Math.PI)
  }
}
