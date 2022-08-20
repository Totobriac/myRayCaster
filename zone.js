function getZone(x, y) {

  if (x < 288) {
    if (y < 672) {
      return 0
    } else if (y < 1376) {
      return 5
    } else {
      return 9
    }
  } else if (x < 480) {
    if (y < 672) {
      return 1
    } else if (y < 1376) {
      return 5
    } else {
      return 9
    }
  } else if (x < 736) {
    if (y < 672) {
      return 2
    } else if (y < 1312) {
      return 5
    } else {
      return 9
    }
  } else if (x < 800) {
    if (y < 544) {
      return 2
    } else if (y < 1184) {
      return 6
    } else if (y < 1312) {
      return 5
    } else {
      return 9
    }
  } else if (x < 928) {
    if (y < 512) {
      return 3
    } else if (y < 1152) {
      return 6
    } else if (y < 1920) {
      return 10
    } else {
      return 9
    }
  } 
  else if (x < 1248) {
    if (y < 512) {
      return 3
    } else if (y < 1248) {
      return 6
    } else {
      return 10
    }
  } else if (x < 1312) {
    if (y < 512) {
      return 3
    } else if (y < 1248) {
      return 6
    } else if (y < 1856){
      return 10
    }else {
      return 11
    }
  } else if (x < 1376) {
    return 8
  } else if (x < 1440) {
    return 9
  } else if (x < 1504) {
    return 10
  } else if (x < 1568) {
    return 11
  } else if (x < 1760) {
    return 12
  } else if (x < 1824) {
    return 13
  } else if (x < 1988) {
    return 14
  } else if (x < 2048) {
    return 15
  }

}

function getTextNb(x, y) {

  var zone = getZone(x, y);

  switch (zone) {
    case 0:
    case 1:
    case 4:
      return [0, 3]
    case 4:
    case 6:
      return [2, 2]
    case 8:
      return [13, 11]
    case 10:
      return [1, 2]
    case 12:
    case 14:
      return [1, 1]
    case 3:
    case 2:
      return [4, 11]
    case 5:
      return [1, 12]
    case 7:
      return [1, 11]
    case 9:
      return [5, 1]
    case 11:
      return [2, 2]
    case 13:
      return [2, 3]
    case 15:
      return [1, 1]
  }


}

export { getTextNb }