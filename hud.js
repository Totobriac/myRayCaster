var mapBack = new Image();
mapBack.src = "./assets/mapBack.png";

var tableTop = new Image();
tableTop.src = "./assets/tableTop.png";

var metalTop = new Image();
metalTop.src = "./assets/metalTop2.png";

var weaponIcon = new Image();
weaponIcon.src = "./assets/weaponHud.png";

var weaponBorder = new Image();
weaponBorder.src = "./assets/weaponBorder.png";

var numbers = new Image();
numbers.src = "./assets/numbers.png";

var blackback = new Image();
blackback.src = "./assets/black.png";

class Hud {
  constructor(ctx, player, map) {
    this.ctx = ctx;
    this.player = player;
    this.map = map;
    this.soundAngle = 310;
    this.oldWeapon = 0;
    this.wOffset = 0;
    this.lifeGlitch = 0;
    this.oldLife = 100;
  }
  draw(sprites) {
    this.ctx.drawImage(tableTop, 0, 0);
    this.ctx.drawImage(metalTop, 900, 0);

    this.ctx.font = "48px wolf";
    this.ctx.fillStyle = "rgb(242, 242, 242)";
    this.ctx.fillText('level 1', 10, 44);

    this.ctx.fillStyle = "red"
    this.ctx.fillRect(1048, 86, 4, 4);

    this.drawMinimap(sprites);
    this.drawSoundMeter();
    this.drawWeaponIcon();
    this.drawLifeMeter();
  }
  drawMinimap(sprites) {

    this.ctx.save();
    this.ctx.translate(150, 200);
    this.ctx.rotate(3 * Math.PI / 2 - this.player.angle);

    var playerX = Math.floor(this.player.x / 64 * 6);
    var playerY = Math.floor(this.player.y / 64 * 6);

    this.ctx.drawImage(mapBack, -40 - playerX, -32 - playerY);

    for (let y = 0; y < this.map.mapY; y++) {
      for (let x = 0; x < this.map.mapX; x++) {
        var color;
        if (this.map.wall[y][x] == 8) {         
          var index = this.map.getDoor(x, y);
          this.map.doors[index].status != 0 ? color = "yellow" : color = "rgb(235,203,152)";
        } else if (this.map.wall[y][x] != 0) {
          color = "grey";
        } else {
          color = "rgb(235,203,152)";
        }
        this.ctx.fillStyle = color;
        var Xo = x * 6;
        var Yo = y * 6;
        this.ctx.fillRect(Xo - playerX, Yo - playerY, 6, 6);
      }
    }

    for (let i = 0; i < sprites.length; i++) {
      if (sprites[i] && sprites[i].character && sprites[i].life > 0) {
        var X = Math.floor(sprites[i].x / 64);
        var Y = Math.floor(sprites[i].y / 64);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(X * 6 - playerX, Y * 6 - playerY, 4, 4);
      }
    }

    this.ctx.fillStyle = "green";
    this.ctx.fillRect(-2, -2, 4, 4);

    this.ctx.restore();

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 4, 400);
    this.ctx.fillRect(296, 0, 4, 400);
    this.ctx.fillRect(0, 0, 300, 4);
    this.ctx.fillRect(0, 396, 300, 4);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(900, 0, 4, 400);
    this.ctx.fillRect(1196, 0, 4, 400);
    this.ctx.fillRect(900, 0, 300, 4);
    this.ctx.fillRect(900, 396, 300, 4);
  }
  drawSoundMeter() {
    this.soundAngle < Math.floor(310 + this.player.speed * 20 - 20) ? this.soundAngle += 0.5 : this.soundAngle -= 2;
    var angle;
    this.soundAngle > 360 ? angle = this.soundAngle - 360 : angle = this.soundAngle;
    this.ctx.save();
    this.ctx.translate(1050, 86);
    this.ctx.rotate(angle * Math.PI / 180);
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -46);
    this.ctx.stroke();
    this.ctx.restore();
  }
  drawWeaponIcon() {
    var diff = this.player.chosenWeapon * 48;

    if (this.wOffset > diff) {
      this.wOffset -= 2;
    } else if (this.wOffset < diff) {
      this.wOffset += 2;
    }

    this.ctx.drawImage(weaponIcon, this.wOffset, 0, 48, 24, 978, 290, 144, 72);
    this.ctx.drawImage(weaponBorder, 967, 287)
  }
  drawLifeMeter() {
    var digits = this.player.life.toString().split('');
    var numbs = digits.map(Number);
    if (numbs.length < 3) numbs.unshift(0);

    if (this.player.life != this.oldLife) {
      this.lifeGlitch++;
      if (this.lifeGlitch > 7) {
        this.oldLife = this.player.life;
        this.lifeGlitch = 0
      }
    }

    var xOffset = -6

    this.ctx.drawImage(blackback, 972 + xOffset, 192);
    this.ctx.drawImage(blackback, 1025 + xOffset, 192);
    this.ctx.drawImage(blackback, 1078 + xOffset, 192);

    if (this.lifeGlitch % 2 === 0) {
      this.ctx.drawImage(numbers, numbs[0] * 41, 0, 41, 66, 985 + xOffset, 200, 41, 66);
      this.ctx.drawImage(numbers, numbs[2] * 41, 0, 41, 66, 1091 + xOffset, 200, 41, 66);
    }

    if (this.lifeGlitch % 3 === 0) {
      this.ctx.drawImage(numbers, numbs[1] * 41, 0, 41, 66, 1038 + xOffset, 200, 41, 66);
    }

  }
}

export { Hud };
