var gaode_vector = new ol.layer.Tile({
  title: "高德地图-矢量图层",
  source: new ol.source.XYZ({
      url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
      wrapX: false
  })
});
var gaode_image = new ol.layer.Tile({
  title: "高德地图-影像图层",
  source: new ol.source.XYZ({
      url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}",
      wrapX: false
  })
})
export { gaode_vector, gaode_image }