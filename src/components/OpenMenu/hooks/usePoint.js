export const usePoint = () => {
  const POINT_STYLE = {
    Angle: 0,
    Color: 11, //子图颜色
    Space: 0,
    SymHeight: 6,
    SymID: 31, //子图号
    SymWidth: 6
  }
  class Point {
    /* 向gdb数据库添加点要素 */
    static add({ position, service, docLayer }) {
      var gpoint = new Zondy.Object.GPoint(position[0], position[1])
      var fGeom = new Zondy.Object.FeatureGeometry({ PntGeom: [gpoint] })
      //样式信息
      var pointInfo = new Zondy.Object.CPointInfo(POINT_STYLE)
      //设置当前点要素的图形参数信息
      var webGraphicInfo = new Zondy.Object.WebGraphicsInfo({
        /* 1 point 2 line 3 area */
        InfoType: 1,
        PntInfo: pointInfo
      })
      /* 属性信息 */
      //设置添加点要素的属性信息
      var attValue = []
      //创建一个要素
      /* new ol.Feature({
                geometry,
                style
            }) */
      var feature = new Zondy.Object.Feature({
        fGeom: fGeom,
        GraphicInfo: webGraphicInfo,
        AttValue: attValue
      })
      //设置要素为点要素
      feature.setFType(1)
      /* 2、创建要素集 --source */
      //创建一个要素数据集
      var featureSet = new Zondy.Object.FeatureSet()
      //设置属性结构
      var cAttStruct = new Zondy.Object.CAttStruct({
        FldName: [],
        FldNumber: 0,
        FldType: []
      })
      featureSet.AttStruct = cAttStruct
      //添加要素到要素数据集
      featureSet.addFeature(feature)
      /* 3、调用服务添加要素 */
      //创建一个编辑服务类
      /* 第一个参数  igserver服务的名称 第二个参数 是编辑要素所在的图层位置 */
      var editService = new Zondy.Service.EditDocFeature(
        service.name,
        service.layerId,
        {
          ip: 'localhost',
          port: '6163' //访问IGServer的端口号，.net版为6163，Java版为8089
        }
      )
      //执行添加点要素功能
      editService.add(featureSet, this.onPntSuccess(docLayer))
    }
    static onPntSuccess(docLayer) {
      return function (data) {
        if (data.succeed) {
          alert('添加点要素成功！')
          docLayer.refresh()
        } else {
          alert('添加点要素失败！')
        }
      }
    }
  }
  return Point
}
