var pistolSprite = new Image();
pistolSprite.src = "./assets/pistol.png";

class Weapon {
  constructor(ctx, player) {
    this.ctx = ctx;
    this.tickCount = 0;
    this.yMove = 0;
    this.yTick = 0;
    this.player = player;
  }
  draw() {
    if (this.player.isMoving) {
      if (this.tickCount < 8) {
        this.tickCount++
      } else {
        this.setYMove();
        this.tickCount = 0;
      }
      this.yTick > 200 ? this.yTick = 0 : this.yTick++;      
    }
    this.ctx.drawImage(pistolSprite, 0, 0, 64, 64, 440, 84 + this.yMove * 4, 320, 320);
  }
  setYMove() {
    this.yMove = Math.cos(this.yTick);
  }
}

export { Weapon };