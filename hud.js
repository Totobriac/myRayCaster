var mapBack = new Image();
mapBack.src = "./assets/mapBack.png";

var tableTop = new Image();
tableTop.src = "./assets/tableTop.png";

var metalTop = new Image();
metalTop.src = "./assets/metalTop2.png";

class Hud {
  constructor(ctx, player, map) {
    this.ctx = ctx;
    this.player = player;
    this.map = map;
    this.soundAngle = 310;
  }
  draw() {   
    this.ctx.drawImage(tableTop, 0, 0);
    this.ctx.drawImage(metalTop, 900, 0);

    this.ctx.font = "48px wolf";
    this.ctx.fillStyle = "rgb(242, 242, 242)";
    this.ctx.fillText('level 1', 10, 44);

    this.ctx.fillStyle = "red"
    this.ctx.fillRect(1048, 86, 4, 4);

    this.drawMinimap();
    this.drawSoundMeter();
  }
  drawMinimap() {

    this.ctx.save();
    this.ctx.translate(150, 200);
    this.ctx.rotate(3 * Math.PI / 2 - this.player.angle);

    var playerX = Math.floor(this.player.x / 64 * 6);
    var playerY = Math.floor(this.player.y / 64 * 6);

    this.ctx.drawImage(mapBack, -40 - playerX, -75 - playerY);

    for (let y = 0; y < this.map.mapY; y++) {
      for (let x = 0; x < this.map.mapX; x++) {
        var color;
        if (this.map.wall[y][x] == 8) {
          this.map.sprites[y][x][0] === 2 ? color = "yellow" : color = "rgb(235,203,152)";
        } else if (this.map.wall[y][x].length > 1 || this.map.wall[y][x] != 0) {
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
    this.ctx.restore();
    this.ctx.fillStyle = "rgb(0,0,164)";
    this.ctx.fillRect(0, 0, 8, 400);
    this.ctx.fillRect(292, 0, 8, 400);
    this.ctx.fillRect(0, 0, 300, 8);
    this.ctx.fillRect(0, 392, 300, 8);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 4, 400);
    this.ctx.fillRect(296, 0, 4, 400);
    this.ctx.fillRect(0, 0, 300, 4);
    this.ctx.fillRect(0, 396, 300, 4);

    this.ctx.fillStyle = "rgb(0,0,164)";
    this.ctx.fillRect(900, 0, 8, 400);
    this.ctx.fillRect(1192, 0, 8, 400);
    this.ctx.fillRect(900, 0, 300, 8);
    this.ctx.fillRect(900, 392, 300, 8);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(900, 0, 4, 400);
    this.ctx.fillRect(1196, 0, 4, 400);
    this.ctx.fillRect(900, 0, 300, 4);
    this.ctx.fillRect(900, 396, 300, 4);    
  }
  drawSoundMeter() {
    
    this.ctx.save();
    this.ctx.translate(1050, 86);
    this.ctx.rotate(this.soundAngle * Math.PI / 180);
    this.ctx.beginPath();
    this.ctx.moveTo(0,0);
    this.ctx.lineTo(0, -46);
    this.ctx.stroke();

    this.ctx.restore();
  }
}

export { Hud };
