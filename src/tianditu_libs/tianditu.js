var TiandiMap_vec = new ol.layer.Tile({
  name: '天地图矢量图层',
  source: new ol.source.XYZ({
    url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=8a5c2b00e94b49659861e064c37f778d',
    wrapX: false,
  }),
})
var TiandiMap_cva = new ol.layer.Tile({
  name: '天地图矢量注记图层',
  source: new ol.source.XYZ({
    url: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=8a5c2b00e94b49659861e064c37f778d',
    wrapX: false,
  }),
})
var TiandiMap_img = new ol.layer.Tile({
  name: '天地图影像图层',
  source: new ol.source.XYZ({
    url: 'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=8a5c2b00e94b49659861e064c37f778d',
    wrapX: false,
  }),
})
var TiandiMap_cia = new ol.layer.Tile({
  name: '天地图影像注记图层',
  source: new ol.source.XYZ({
    url: 'http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=8a5c2b00e94b49659861e064c37f778d',
    wrapX: false,
  }),
})
var TiandiMap_ter = new ol.layer.Tile({
  name: '天地图地形图层',
  source: new ol.source.XYZ({
    url: 'http://t0.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=8a5c2b00e94b49659861e064c37f778d',
    wrapX: false,
  }),
})
var TiandiMap_cta = new ol.layer.Tile({
  name: '天地图地形注记图层',
  source: new ol.source.XYZ({
    url: 'http://t0.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=8a5c2b00e94b49659861e064c37f778d',
    wrapX: false,
  }),
})

export {
  TiandiMap_vec,
  TiandiMap_cva,
  TiandiMap_img,
  TiandiMap_cia,
  TiandiMap_ter,
  TiandiMap_cta,
}
