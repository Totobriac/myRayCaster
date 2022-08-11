export class Controls {
  constructor(player, map) {
    document.addEventListener('keydown', function(e) {     
      switch (e.key) {
        case "ArrowUp":
          player.up();
          break;
        case "ArrowDown":
          player.down();
          break;
        case "ArrowRight":
          player.right();
          break;
        case "ArrowLeft":
          player.left();
          break;
        case " ":
          map.detectDoor();
          break;
        case "f":
          player.shoot();
          break;
      }
    });
    document.addEventListener('keyup', function(e) {
      switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
          player.stopMove();
          break;
        case "ArrowRight":
        case "ArrowLeft":
          player.stopTurn();
          break;
      }
    });
  }
}
