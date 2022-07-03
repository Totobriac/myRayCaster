function normalizeAngle(angle) {
  angle = angle % (2 * Math.PI)

  if (angle < 0) {
    angle = angle + (2 * Math.PI)
  }
  return angle;
}

export { normalizeAngle };