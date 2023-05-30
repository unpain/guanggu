// 传入$map,数据源source，以及绘制类型
function measure({$map,source,type}){
// 获取上一次的画笔，将其移除
  const res = $map.getInteractions().array_[9]
  $map.removeInteraction(res) //移除绘制图形
 /**
   * 当前绘制的要素（Currently drawn feature.）
   * @type {ol.Feature}
   */
 var sketch
 /**
  * 帮助提示框对象（The help tooltip element.）
  * @type {Element}
  */
 var helpTooltipElement
 /**
  *帮助提示框显示的信息（Overlay to show the help messages.）
  * @type {ol.Overlay}
  */
 var helpTooltip
 /**
  * 测量工具提示框对象（The measure tooltip element. ）
  * @type {Element}
  */
 var measureTooltipElement
 /**
  *测量工具中显示的测量值（Overlay to show the measurement.）
  * @type {ol.Overlay}
  */
 var measureTooltip
 /**
  *  当用户正在绘制多边形时的提示信息文本
  * @type {string}
  */
 var continuePolygonMsg = 'Click to continue drawing the polygon'
 /**
  * 当用户正在绘制线时的提示信息文本
  * @type {string}
  */
 var continueLineMsg = 'Click to continue drawing the line'

 /**
  * 鼠标移动事件处理函数
  * @param {ol.MapBrowserEvent} evt
  */
 var pointerMoveHandler = function (evt) {
   if (evt.dragging) {
     return
   }
 
   /** @type {string} */
   var helpMsg = 'Click to start drawing' //当前默认提示信息
   //判断绘制几何类型设置相应的帮助提示信息
   if (sketch) {
     var geom = sketch.getGeometry()
     if (geom instanceof ol.geom.Polygon) {
       helpMsg = continuePolygonMsg //绘制多边形时提示相应内容
     } else if (geom instanceof ol.geom.LineString) {
       helpMsg = continueLineMsg //绘制线时提示相应内容
     }
   }
   helpTooltipElement.innerHTML = helpMsg //将提示信息设置到对话框中显示
   helpTooltip.setPosition(evt.coordinate) //设置帮助提示框的位置
   $(helpTooltipElement).removeClass('hidden') //移除帮助提示框的隐藏样式进行显示
 }
 $map.on('pointermove', pointerMoveHandler) //地图容器绑定鼠标移动事件，动态显示帮助提示框内容
 //地图绑定鼠标移出事件，鼠标移出时为帮助提示框设置隐藏样式
 $($map.getViewport()).on('mouseout', function () {
   $(helpTooltipElement).addClass('hidden')
 })

//  var typeSelect = document.getElementById('type') //测量类型对象
 var draw // global so we can remove it later
 /**
  * 加载交互绘制控件函数
  */
 function addInteraction() {
   // var type = typeSelect.value == 'area' ? 'Polygon' : 'LineString'
   
   draw = new ol.interaction.Draw({
     source: source, //测量绘制层数据源
     type: /** @type {ol.geom.GeometryType} */ (type), //几何图形类型
     style: new ol.style.Style({
       //绘制几何图形的样式
       fill: new ol.style.Fill({
         color: 'rgba(255, 255, 255, 0.2)',
       }),
       stroke: new ol.style.Stroke({
         color: 'rgba(217, 3, 21, 0.8)',
         lineDash: [10, 10],
         width: 3,
       }),
       image: new ol.style.Circle({
         radius: 5,
         stroke: new ol.style.Stroke({
           color: 'rgba(0, 0, 0, 0.7)',
         }),
         fill: new ol.style.Fill({
           color: 'rgba(242, 89, 82, 0.8)',
         }),
       }),
     }),
   })
   $map.addInteraction(draw)

   createMeasureTooltip() //创建测量工具提示框
   createHelpTooltip() //创建帮助提示框

   var listener
   //绑定交互绘制工具开始绘制的事件
   draw.on(
     'drawstart',
     function (evt) {
       // set sketch
       sketch = evt.feature //绘制的要素

       /** @type {ol.Coordinate|undefined} */
       var tooltipCoord = evt.coordinate // 绘制的坐标
       //绑定change事件，根据绘制几何类型得到测量长度值或面积值，并将其设置到测量工具提示框中显示
       listener = sketch.getGeometry().on('change', function (evt) {
         var geom = evt.target //绘制几何要素
         var output
         if (geom instanceof ol.geom.Polygon) {
           output = formatArea(/** @type {ol.geom.Polygon} */ (geom)) //面积值
           tooltipCoord = geom.getInteriorPoint().getCoordinates() //坐标
         } else if (geom instanceof ol.geom.LineString) {
           output = formatLength(/** @type {ol.geom.LineString} */ (geom)) //长度值
           tooltipCoord = geom.getLastCoordinate() //坐标
         }
         measureTooltipElement.innerHTML = output //将测量值设置到测量工具提示框中显示
         measureTooltip.setPosition(tooltipCoord) //设置测量工具提示框的显示位置
       })
     },
     this
   )
   //绑定交互绘制工具结束绘制的事件
   draw.on(
     'drawend',
     function (evt) {
       measureTooltipElement.className = 'tooltip tooltip-static' //设置测量提示框的样式
       measureTooltip.setOffset([0, -7])
       // unset sketch
       sketch = null //置空当前绘制的要素对象
       // unset tooltip so that a new one can be created
       measureTooltipElement = null //置空测量工具提示框对象
       createMeasureTooltip() //重新创建一个测试工具提示框显示结果
       ol.Observable.unByKey(listener)
     },
     this
   )
 }

 /**
  *创建一个新的帮助提示框（tooltip）
  */
 function createHelpTooltip() {
   if (helpTooltipElement) {
     helpTooltipElement.parentNode.removeChild(helpTooltipElement)
   }
   helpTooltipElement = document.createElement('div')
   helpTooltipElement.className = 'tooltip hidden'
   helpTooltip = new ol.Overlay({
     element: helpTooltipElement,
     offset: [15, 0],
     positioning: 'center-left',
   })
   $map.addOverlay(helpTooltip)
 }
 /**
  *创建一个新的测量工具提示框（tooltip）
  */
 function createMeasureTooltip() {
   if (measureTooltipElement) {
     measureTooltipElement.parentNode.removeChild(measureTooltipElement)
   }
   measureTooltipElement = document.createElement('div')
   measureTooltipElement.className = 'tooltip tooltip-measure'
   measureTooltip = new ol.Overlay({
     element: measureTooltipElement,
     offset: [0, -15],
     positioning: 'bottom-center',
   })
   $map.addOverlay(measureTooltip)
 }

 /**
  * 测量长度输出
  * @param {ol.geom.LineString} line
  * @return {string}
  */
 var formatLength = function (line) {
   var length
   var sphere = new ol.Sphere()

   //若使用测地学方法测量(这里默认就是采用测地学方法测量，去掉了普通的测量，普通测量显示的结果不是我们想要的)
   var sourceProj = $map.getView().getProjection() //地图数据源投影坐标系
   length = sphere.getLength(line, {
     projection: sourceProj,
     radius: 6378137,
   })

   var output
   if (length > 100) {
     output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km' //换算成KM单位
   } else {
     output = Math.round(length * 100) / 100 + ' ' + 'm' //m为单位
   }
   return output //返回线的长度
 }
 /**
  * 测量面积输出
  * @param {ol.geom.Polygon} polygon
  * @return {string}
  */
 var formatArea = function (polygon) {
   var area
   var sphere = new ol.Sphere()
//若使用测地学方法测量(这里默认就是采用测地学方法测量，去掉了普通的测量，普通测量显示的结果不是我们想要的)
   var sourceProj = $map.getView().getProjection() //地图数据源投影坐标系
   var geom = /** @type {ol.geom.Polygon} */ (
     polygon.clone().transform(sourceProj, 'EPSG:4326')
   ) //将多边形要素坐标系投影为EPSG:4326
   area = Math.abs(
     sphere.getArea(geom, { projection: sourceProj, radius: 6378137 })
   ) //获取面积

   var output
   if (area > 10000) {
     output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>' //换算成KM单位
   } else {
     output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>' //m为单位
   }
   return output //返回多边形的面积
 }

 addInteraction() //调用加载绘制交互控件方法，添加绘图进行测量
}
