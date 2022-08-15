var floorData;
var ceilingData;

var tempCanvas = document.createElement('canvas');
var tempCtx = tempCanvas.getContext('2d');
tempCanvas.width = 576;
tempCanvas.height = 128;

var tempCanvas2 = document.createElement('canvas');
var tempCtx2 = tempCanvas.getContext('2d');
tempCanvas2.width = 576;
tempCanvas2.height = 128;

var floorSprite = new Image();

floorSprite.onload = function () {
  tempCtx.drawImage(floorSprite, 0, 0);
  floorData = tempCtx.getImageData(0, 0, 576, 128);
}

floorSprite.src = "./assets/floor.png";

var ceilingSprite = new Image();

ceilingSprite.onload = function () {
  tempCtx2.drawImage(ceilingSprite, 0, 0);
  ceilingData = tempCtx.getImageData(0, 0, 576, 128);
}

ceilingSprite.src = "./assets/ceiling.png";


export { floorData, ceilingData };