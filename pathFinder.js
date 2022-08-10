import { heuristic } from "./functions.js";

let cols = 26;
let rows = 20;
let grid;
let openSet = [];
let closedSet = [];
let start;
let end;
let path = [];
var hasStarted = false;
var pathToDraw = [];

function getPath(ctx, player, map, nmeX, nmeY) {

  var playerX = Math.floor(player.x / 64 * 6);
  var playerY = Math.floor(player.y / 64 * 6);
  ctx.save();
  ctx.translate(150, 200);
  ctx.rotate(3 * Math.PI / 2 - player.angle);

  pathToDraw = search(map, player, nmeX, nmeY);

  pathToDraw.forEach((node, i) => {
    ctx.fillStyle = "green";
    ctx.fillRect(node.x * 6 - playerX, node.y * 6 - playerY, 6, 6);
  });
  ctx.restore();
}

class GridPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.parent = undefined;
  }
  updateNeighbors(grid) {
    let i = this.x;
    let j = this.y;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  };
}


function init(map, player, nmeX, nmeY) {
  openSet = [];
  closedSet = [];
  path = [];

  var startX = Math.floor(player.x / 64);
  var startY = Math.floor(player.y / 64);

  var endX = Math.floor(nmeX / 64);
  var endY = Math.floor(nmeY / 64);

  // var endX = 8;
  // var endY = 8;

  end = grid[startX][startY];
  start = grid[endX][endY];

  openSet.push(start);
}


function search(map, player, nmeX, nmeY) {

  if (!hasStarted) populateGrid(map)

  init(map, player, nmeX, nmeY);

  while (openSet.length > 0) {
    console.log("dd");
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }

    let current = openSet[lowestIndex];

    if (current === end) {
      let temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      return path.reverse();
    }

    openSet.splice(lowestIndex, 1);

    closedSet.push(current);

    let neighbors = current.neighbors;

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && map.wall[neighbor.y][neighbor.x] == 0) {
        let possibleG = current.g + 1;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } else if (possibleG >= neighbor.g) {
          continue;
        }

        neighbor.g = possibleG;
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = current;
      }
    }
  }
  return [];
}

function populateGrid(map) {
  hasStarted = true;
  grid = new Array(cols);
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new GridPoint(i, j, map);
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].updateNeighbors(grid);
    }
  }
}


export { getPath };
