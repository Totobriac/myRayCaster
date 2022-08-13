var pistolSprite = new Image();
pistolSprite.src = "./assets/pistol.png";

var up = true;

class Weapon {
  constructor(ctx, player) {
    this.ctx = ctx;
    this.tickCount = 0;
    this.gunTickCount = 0;
    this.yMove = 0;
    this.yTick = 0;
    this.player = player;
    this.xFrame = 0;
    this.yOffset = 0;
    this.oldWeapon = 0;
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

    if (this.oldWeapon != this.player.chosenWeapon) {
      this.upDown();
      if (up) {
        this.ctx.drawImage(pistolSprite, 64 * this.xFrame, this.oldWeapon * 64 + 20, 64, 44, 440, 184 + this.yMove * 4 + this.yOffset , 320, 220);
      } else {
        this.ctx.drawImage(pistolSprite, 64 * this.xFrame, this.player.chosenWeapon * 64 + 20, 64, 44, 440, 184 + this.yMove * 4 + this.yOffset , 320, 220);
      }
    } else {
      this.ctx.drawImage(pistolSprite, 64 * this.xFrame, this.player.chosenWeapon * 64 + 20, 64, 44, 440, 184 + this.yMove * 4 + this.yOffset , 320, 220);
    }
  }
  upDown() {
    if(up) {
      this.yOffset < 86 ? this.yOffset +=5 : up = false;
    } else {
      if (this.yOffset > 0) {
        this.yOffset -=5;
      } else {
        up = true;
        this.oldWeapon = this.player.chosenWeapon;
      }
    }
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
