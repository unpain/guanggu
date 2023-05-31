/**
 * @format
 * @param {array} position [[],[]]
 * @param {array} attr [{type:"string",name:"name",value:"长江"},]
 * @param {object} service {name,layerId}
 */

const AREA_STYLE = {
  EndColor: 1,
  FillColor: 40, //填充色
  FillMode: 0,
  OutPenWidth: 1,
  OverMethod: 0,
  PatAngle: 1,
  PatColor: 1,
  PatHeight: 1,
  PatID: 0, //图案编号
  PatWidth: 1,
};
class Area {
  static add({ position, attr, service, docLayer }) {
    var pointObj = [];
    for (let item of position) {
      pointObj.push(new Zondy.Object.Point2D(item[0], item[1]));
    }
    //设置区要素的几何信息
    var gArc = new Zondy.Object.Arc(pointObj);
    //构成区要素折线
    var gAnyLine = new Zondy.Object.AnyLine([gArc]);
    //构成区要素
    var gRegion = new Zondy.Object.GRegion([gAnyLine]);
    //构成区要素的几何信息
    var fGeom = new Zondy.Object.FeatureGeometry({ RegGeom: [gRegion] });
    var cRegionInfo = new Zondy.Object.CRegionInfo(AREA_STYLE);
    //要素图形参数信息
    var graphicInfo = new Zondy.Object.WebGraphicsInfo({
      InfoType: 3,
      RegInfo: cRegionInfo,
    });
    /* 属性 */
    //设置区要素的属性信息
    var attValue = attr.map((item) => item.value);
    //创建一个新的区要素
    var newFeature = new Zondy.Object.Feature({
      AttValue: attValue,
      fGeom: fGeom,
      GraphicInfo: graphicInfo,
    });
    newFeature.setFType(3);
    /* 要素集 */
    //创建一个要素数据集
    var featureSet = new Zondy.Object.FeatureSet();
    var fldNumber = attValue.length;
    var fldName = attr.map((item) => item.name);
    var fldType = attr.map((item) => item.type);
    var cAttValue = new Zondy.Object.CAttStruct({
      FldNumber: fldNumber,
      FldType: fldType,
      FldName: fldName,
    });
    featureSet.AttStruct = cAttValue;
    featureSet.addFeature(newFeature);
    /* 服务 */
    var editDocFeature = new Zondy.Service.EditDocFeature(
      service.name,
      service.layerId,
      {}
    );
    editDocFeature.add(featureSet, this.onPloySuccess(docLayer));
  }
  static onPloySuccess(docLayer) {
    return function (data) {
      if (data.succeed) {
        alert('添加区要素成功！');
        docLayer.refresh();
      } else {
        alert('添加区要素失败！');
      }
    };
  }
}
