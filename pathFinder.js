import { heuristic } from "./functions.js";

let cols = 26;
let rows = 20;
let grid;
let openSet = [];
let closedSet = [];
let start;
let end;
let path = [];
var pathToDraw = [];

function getPath(ctx, player, map, nmeX, nmeY) {  

  pathToDraw = search(map, player, nmeX, nmeY);

  return pathToDraw;
}

class GridPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;   
    this.parent = undefined;
    this.diagonal = false;
  }
  updateNeighbors(grid) {
    let i = this.x;
    let j = this.y;
    this.neighbors = [];

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

    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
      this.diagonal = true;
    }
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
      this.diagonal = true;   
    }    
    if (i > 0 && j < rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
      this.diagonal = true;
    }
    if (i < cols - 1 && j < cols - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
      this.diagonal = true;  
    }

    return this.neighbors;
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

  end = grid[startX][startY];
  start = grid[endX][endY];

  openSet.push(start);
}


function search(map, player, nmeX, nmeY) {

  populateGrid(map)

  init(map, player, nmeX, nmeY);

  while (openSet.length > 0) {
    
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
    
    let neighbors = current.updateNeighbors(grid);
    
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && map.wall[neighbor.y][neighbor.x] == 0) {
        let possibleG;
        
        neighbor.diagonal ? possibleG = current.g + 1.4 : possibleG = current.g + 1;
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
  grid = new Array(cols);
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new GridPoint(i, j, map);
    }
  }
}


export { getPath };
