import { sprites } from "./raycasting.js";
import { doorsList } from "./init.js";

export class Map {
  constructor(ctx) {
    this.ctx = ctx;
    this.mapX = 32;
    this.mapY = 40;
    this.mapS = 64;
    this.tickCount = 0;
    this.maxTickCount = 6;
    this.tileWidth = 64;
    this.tileHeight = 64;
    this.isSearching = false;
    this.itemTile;
    this.wall = [
      // 0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31 
      [[18], [18], [18], [18], [6.], [16], [16], [16], [16], [16], [16], [16], [16], [16], [16], [16], [16], [16], [16], [16], [16], [16], [16], [22], [22], [22], [22], [22], [6.], [10], [6.], [6.]], //0
      [[18], [0.], [0.], [0.], [6.], [0.], [0.], [22], [0.], [0.], [0.], [14], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [14], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [6.]], //1
      [[18], [0.], [0.], [0.], [6.], [0.], [0.], [22], [0.], [0.], [0.], [14], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [14], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [10]], //2
      [[18], [0.], [0.], [0.], [6.], [0.], [0.], [22], [0.], [0.], [0.], [14], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [14], [0.], [16], [0.], [0.], [6.], [0.], [0.], [0.], [6.]], //3
      [[18], [0.], [0.], [0.], [6.], [0.], [0.], [22], [0.], [0.], [0.], [14], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [14], [0.], [16], [0.], [0.], [6.], [0.], [0.], [0.], [6.]], //4
      [[18], [0.], [0.], [0.], [6.], [0.], [0.], [24], [0.], [0.], [0.], [24], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [14], [0.], [16], [0.], [0.], [6.], [0.], [0.], [0.], [18]], //5
      [[18], [0.], [0.], [0.], [6.], [0.], [0.], [22], [0.], [0.], [0.], [14], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [14], [0.], [16], [0.], [0.], [6.], [0.], [0.], [0.], [18]], //6
      [[18], [0.], [0.], [0.], [6.], [0.], [0.], [22], [0.], [0.], [0.], [14], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [14], [24], [16], [0.], [0.], [6.], [0.], [0.], [0.], [6.]], //7
      [[18], [0.], [0.], [0.], [6.], [0.], [0.], [22], [0.], [0.], [0.], [14], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [0.], [0.], [0.], [16], [0.], [0.], [6.], [6.], [6.], [0.], [6.]], //8
      [[18], [0.], [0.], [0.], [6.], [0.], [0.], [22], [0.], [0.], [0.], [14], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [16], [0.], [0.], [0.], [0.], [6.], [0.], [10]], //9
      [[18], [18], [24], [2.], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [6.], [14], [14], [14], [14], [0.], [6.], [0.], [6.]], //10
      [[2.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [6.]], //11
      [[4.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [6.], [6.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [6.]], //12
      [[2.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [24], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [6.]], //13
      [[4.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [18]], //14
      [[2.], [0.], [0.], [2.], [18], [18], [2.], [18], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [6.], [0.], [0.], [14], [0.], [0.], [6.], [24], [10]], //15
      [[2.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [0.], [6.]], //16
      [[4.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [18], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [6.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [6.]], //17
      [[2.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [6.], [6.], [6.], [0.], [0.], [0.], [6.], [6.], [6.], [6.], [0.], [6.], [0.], [18], [0.], [6.], [0.], [10], [6.], [6.]], //18
      [[4.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [2.], [6.], [24], [6.], [0.], [0.], [6.], [24], [6.], [0.], [6.], [0.], [0.], [0.], [6.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [10]], //19
      [[2.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [18], [0.], [0.], [6.], [0.], [0.], [6.], [0.], [6.], [0.], [6.], [0.], [0.], [0.], [6.], [0.], [6.], [10], [6.], [6.], [6.], [0.], [6.]], //20
      [[4.], [20], [4.], [20], [20], [4.], [20], [20], [20], [2.], [0.], [6.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [6.], [6.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [6.]], //21
      [[2.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [4.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [6.], [6.], [6.], [0.], [6.], [0.], [0.], [18], [6.]], //22
      [[4.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [20], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [6.], [0.], [6.], [0.], [10], [0.], [0.], [0.], [6.]], //23
      [[2.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [4.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [6.], [0.], [18], [0.], [6.], [0.], [6.], [0.], [18]], //24
      [[4.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [2.], [0.], [0.], [0.], [6.], [0.], [6.], [0.], [0.], [0.], [6.], [0.], [0.], [24], [0.], [6.], [0.], [0.], [0.], [6.], [0.], [10], [0.], [6.]], //25
      [[2.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [6.], [6.], [0.], [0.], [6.], [0.], [0.], [6.], [24.], [6.]], //26
      [[4.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [6.], [6.], [6.], [0.], [0.], [0.], [6.], [0.], [18]], //27
      [[20], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [4.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [10], [0.], [6.], [0.], [0.], [0.], [6.]], //28
      [[2.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [2.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [6.], [6.], [10], [0.], [0.], [6.], [0.], [18], [0.], [6.], [10], [6.], [0.], [6.]], //29
      [[4.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [18], [0.], [0.], [0.], [6.], [0.], [6.], [0.], [0.], [0.], [6.], [0.], [0.], [6.], [0.], [10], [0.], [6.], [18], [6.], [0.], [0.], [0.], [6.]], //30
      [[2.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [4.], [18], [18], [6.], [6.], [6.], [6.], [0.], [6.], [0.], [0.], [6.], [0.], [6.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [10]], //31
      [[4.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [18], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [24], [0.], [10], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [6.], [0.], [6.]], //32
      [[2.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [4.], [0.], [0.], [0.], [0.], [0.], [24], [0.], [0.], [0.], [0.], [6.], [0.], [6.], [6.], [0.], [6.], [10], [6.], [6.], [0.], [6.], [0.], [6.]], //33
      [[4.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [20], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [6.], [0.], [0.], [6.], [0.], [0.], [18], [0.], [0.], [0.], [0.], [6.], [0.], [10]], //34
      [[20], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [2.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [6.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [6.], [6.], [6.], [6.], [6.], [0.], [0.], [6.]], //35
      [[4.], [0.], [4.], [2.], [4.], [2.], [4.], [2.], [4.], [0.], [2.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [6.], [0.], [18], [0.], [6.], [6.], [6.], [0.], [0.], [0.], [6.], [6.], [6.], [6.]], //36
      [[2.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [2.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [6.], [6.], [6.], [6.], [6.], [0.], [0.], [0.], [0.], [0.], [24], [0.], [0.], [6.]], //37
      [[4.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [4.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [6.], [0.], [0.], [0.], [6.], [0.], [0.], [6.]], //38
      [[4.], [2.], [4.], [20], [4.], [2.], [4.], [20], [4.], [4.], [4.], [4.], [20], [4.], [4.], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [6.], [6.]], //39
      // 0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31 

    ];
    this.sprites = [
      // 0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31 
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //0
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //1
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //2
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //3
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //4
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //5
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //6
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //7
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //8
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //9
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //10
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //11
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //12
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //13
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //14
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //15
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //16
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //17
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //18
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //19
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //20
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //21
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //22
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //23
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //24
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //25
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //26
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //27
      [[0.], [0.], [0.], [18], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //28
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //29
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //30
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //30
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //32
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //33
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //34
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //35
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [10], [0.], [0.], [0.], [0.], [0.], [0.]], //36
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [16], [0.], [0.], [0.], [0.], [0.]], //37
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [10], [0.], [0.], [0.], [0.], [0.], [0.]], //38
      [[0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.], [0.]], //39
      // 0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31 

    ];
    this.spritesList = [];
    this.doors = doorsList(this.mapY, this.mapX, this.wall);    
    this.enemiesList = [
      // [800, 800, 0, "officer", true], [900, 800, 0, "dog", false],
      // [80, 80, 0, "officer", true], [190, 800, 0, "dog", false],
      // [100, 100, 0, "officer", true], [900, 100, 0, "dog", false],
      // [200, 100, 0, "zombi", false], [900, 200, 0, "guard", true],
      // [300, 100, 0, "officer", true], [900, 300, 0, "guard", true]
    ]
    this.blockBlocks = [4, 9, 18, 37, 38, 39, 47, 48];
  }
  update() {
    for (let i = 0; i < this.doors.length; i++) {
      if (this.doors[i].status == 1 && this.doors[i].yOffset < 64) {
        this.doors[i].yOffset += 0.5;
      } else if (this.doors[i].status == 1 && this.doors[i].yOffset === 64) {
        this.doors[i].status = 0;
      }
      if (this.doors[i].status == 2 && this.doors[i].yOffset > 0) {
        this.doors[i].yOffset -= 0.5;
      }
    }    
  }
  getDoor(x, y) {
    for (let i = 0; i < this.doors.length; i++) {
      if (this.doors[i].x === x && this.doors[i].y === y) {
        return i;
      }
    }
  }
  checkPlayerCollision(y, x) {

    var collision = false;

    if (this.wall[y][x] != 0 && this.wall[y][x] != 24 || this.blockBlocks.includes(parseInt(this.sprites[y][x]))) {
      collision = true;
    } else if (this.wall[y][x] == 24) {
      var i = this.getDoor(x, y);
      if (this.doors[i].status != 0) {
        collision = true;
      }
    }
    return collision;
  }
  checkCollision(y, x, wallX, wallY, angle, XYcollision, direction) {
    var collision = false;
    var tile = this.wall[y][x];
    var X = Math.floor(wallX / 64);
    var Y = Math.floor(wallY / 64);
    if (tile == 24 ) {     
      var i = this.getDoor(X, Y);
      var doorOffset = this.doors[i].yOffset;
      if (XYcollision === "xCollision") {
        if (direction) {
          wallX += 32;
          wallY += 32 * Math.tan(angle);
        } else {
          wallX -= 32;
          wallY -= 32 * Math.tan(angle);
        }
        var square = Math.floor(wallY / 64);
        var texturePix = Math.floor(wallY) - (square * 64);
        texturePix > doorOffset ? collision = true : collision = false;
      } else if (XYcollision === "yCollision") {
        if (!direction) {
          wallX += 32 / Math.tan(angle);
          wallY += 32;
        } else {
          wallX -= 32 / Math.tan(angle);
          wallY -= 32;
        }
        var square = Math.floor(wallX / 64) * 64;
        var texturePix = Math.floor(wallX) - square;
        texturePix > doorOffset ? collision = true : collision = false;
      }
    } else if (tile != 0) {
      collision = true;
    }
    return collision;
  }
  getTile(x, y, grid) {
    var X = Math.floor(x / this.mapS);
    var Y = Math.floor(y / this.mapS);
    if (X >= 0 && Y >= 0 && X < this.mapX && Y < this.mapY) {
      switch (grid) {
        case "wall":
          return this.wall[Y][X]
        case "sprite":
          return this.sprites[Y][X]
        default:
      }
    }
  }
  detectDoor() {
    var X = Math.floor(this.player.x / this.mapS);
    var Y = Math.floor(this.player.y / this.mapS);
   
    if (this.wall[Y][X + 1] == 24) {
      this.doorInteraction(Y, X + 1);
    } else if (this.wall[Y][X - 1] == 24) {
      this.doorInteraction(Y, X - 1);
    } else if (this.wall[Y + 1][X] == 24) {
      this.doorInteraction(Y + 1, X);
    } else if (this.wall[Y - 1][X] == 24) {
      this.doorInteraction(Y - 1, X);
    }
  }
  doorInteraction(Y, X) {
    var i = this.getDoor(X, Y);
   
    switch (this.doors[i].status) {
      case 0:
        this.doors[i].status = 2
        break;
      case 1:
        this.doors[i].status = 2;
        break;
      case 2:
        this.doors[i].status = 1;
        break;
    }
  }
  removeSprite(spr) {
    if (!this.isSearching) {
      this.isSearching = true;
      var index = sprites.findIndex(find);
      function find(sprite) {
        return parseInt(sprite.frame) === spr;
      }
      if (index) {
        var X = Math.floor(this.player.x / 64);
        var Y = Math.floor(this.player.y / 64);

        this.itemTile = [X, Y];
        sprites.splice(index, 1);
      }
    }
  }
}
