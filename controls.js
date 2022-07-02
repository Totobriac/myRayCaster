export class Controls {
  constructor(player) {
    document.addEventListener('keydown', function(e) {
      switch (e.keyCode) {
        case 38:
          player.up();
          break;
        case 40:
          player.down();
          break;
        case 39:
          player.right();
          break;
        case 37:
          player.left();
          break;
      }
    });
    document.addEventListener('keyup', function(e) {
      switch (e.keyCode) {
        case 38:
        case 40:
          player.stopMove();
          break;
        case 39:
        case 37:
          player.stopTurn();
          break;
      }
    });
  }
}
