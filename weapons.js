var pistolSprite = new Image();
pistolSprite.src = "./assets/pistol.png";

class Weapon {
  constructor(ctx, player) {
    this.ctx = ctx;
    this.tickCount = 0;
    this.gunTickCount = 0;
    this.yMove = 0;
    this.yTick = 0;
    this.player = player;
    this.xFrame = 0;
  }
  draw(sprites) {
    if (this.player.isMoving) {
      if (this.tickCount < 8) {
        this.tickCount++
      } else {
        this.setYMove();
        this.tickCount = 0;
      }
      this.yTick > 200 ? this.yTick = 0 : this.yTick++;
    }
    if (this.player.isShooting) {
      this.shoot(sprites);
    }
    this.ctx.drawImage(pistolSprite, 64 * this.xFrame, this.player.weapon * 64, 64, 64, 440, 84 + this.yMove * 4, 320, 320);
  }
  shoot(sprites) {
    this.gunTickCount++;
    if (this.gunTickCount % 6 === 0) {
      if (this.xFrame < 4) {
        this.xFrame++;
      } else {
        this.player.stopShoot();
        this.gunTickCount = 0;
        this.xFrame = 0;
      }
    }
    for (let i = sprites.length -1; i >= 0; i--) {
      if (sprites[i].type === "enemy" && sprites[i].life > 0 ) {
        if (sprites[i].screenX - sprites[i].spriteWidth / 4 <= 300 && sprites[i].screenX + sprites[i].spriteWidth / 4 >= 300) {
          sprites[i].isHit();
          return
        }
      }
    }
  }
  setYMove() {
    this.yMove = Math.cos(this.yTick);
  }
}

export { Weapon };
