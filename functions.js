function normalizeAngle(angle) {
  angle = angle % (2 * Math.PI)

  if (angle < 0) {
    angle = angle + (2 * Math.PI)
  }
  return angle;
}

function distance(x1,x2,y1,y2) {
  return Math.sqrt((x2-x1)*(x2-x1)+ (y2-y1)*(y2-y1))
}

export { normalizeAngle, distance };