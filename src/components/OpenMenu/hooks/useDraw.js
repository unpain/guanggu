export const useDraw = () => {
  const createDraw = ({ source, type, callback }) => {
    let draw = null
    let geometryFunction = null
    let maxPoints = null
    if (type == 'Square') {
      /* 正方形 */
      type = 'Circle'
      geometryFunction = ol.interaction.Draw.createRegularPolygon(4)
    } else if (type == 'Box') {
      /* 矩形 */
      type = 'LineString'
      maxPoints = 2
      geometryFunction = function (coordinates, geometry) {
        if (!geometry) {
          //多边形
          geometry = new ol.geom.Polygon(null)
        }
        var start = coordinates[0]
        var end = coordinates[1]
        geometry.setCoordinates([
          [start, [start[0], end[1]], end, [end[0], start[1]], start]
        ])
        return geometry
      }
    }
    draw = new ol.interaction.Draw({
      type,
      source,
      geometryFunction,
      maxPoints
    })
    if (callback) {
      draw.on('drawend', callback)
    }
    return draw
  }
  return { createDraw }
}
