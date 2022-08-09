let cols = 26; //columns in the grid
let rows = 20; //rows in the grid

let grid;

let openSet = [];
let closedSet = [];

let start;
let end;
let path = [];

var hasStarted = false;

var pathToDraw = [];


function heuristic(position0, position1) {
  let d1 = Math.abs(position1.x - position0.x);
  let d2 = Math.abs(position1.y - position0.y);

  return d1 + d2;
}


function GridPoint(x, y) {

  this.x = x; //x location of the grid point
  this.y = y; //y location of the grid point
  this.f = 0; //total cost function
  this.g = 0; //cost function from start to the current grid point
  this.h = 0; //heuristic estimated cost function from current grid point to the goal
  this.neighbors = []; // neighbors of the current grid point
  this.parent = undefined; // immediate source of the current grid point


  this.updateNeighbors = function(grid) {
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

//initializing the grid
function init(map, player) {
  openSet = []; //array containing unevaluated grid points
  closedSet = []; //array containing completely evaluated grid points
  path = [];

  var startX = Math.floor(player.x / 64);
  var startY = Math.floor(player.y / 64);

  var endX = Math.floor(map.enemiesList[1][0] / 64);
  var endY = Math.floor(map.enemiesList[1][1] / 64);

  end = grid[startX][startY];
  start = grid[endX][endY];

  openSet.push(start);
}

function populateGrid(map) {
  hasStarted = true
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


function search(map, player) {
  if (!hasStarted ) populateGrid(map)
  init(map, player);
  while (openSet.length > 0) {
    //assumption lowest index is the first one to begin with
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

    //remove current from openSet
    openSet.splice(lowestIndex, 1);
    //add current to closedSet
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

  //no solution by default
  return [];
}



function drawPath(ctx, player, map) {

  var playerX = Math.floor(player.x / 64 * 6);
  var playerY = Math.floor(player.y / 64 * 6);

  ctx.save();
  ctx.translate(150, 200);
  ctx.rotate(3 * Math.PI / 2 - player.angle);

  setInterval(update, 2000, map, player);

  pathToDraw.forEach((node, i) => {
    ctx.fillStyle = "green";
    ctx.fillRect(node.x * 6 - playerX, node.y * 6 - playerY, 6, 6);
  });
  ctx.restore();


}

function update(map, player) {
  pathToDraw = search(map, player);
}

export {
  drawPath
};
