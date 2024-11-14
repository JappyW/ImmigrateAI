export function snapToGrid(x, y) {
    const snappedX = Math.round(x / 42) * 42
    const snappedY = Math.round(y / 42) * 42
    return [snappedX, snappedY]
  }
  