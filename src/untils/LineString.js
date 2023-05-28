/**
 * @format
 * @param {array} position [[113,40],[117,40],[118,40]] 二维数组
 * @param {array} attr [{type:"string",name:"name",value:"长江"},]
 * @param {object} service  {name,layerId}name是igserver服务的名称
 * @param {object} doclayer  地图文档的图层
 */

const LINE_STYLE = {
  Color: 1, //线颜色
  LinStyleID: 0, //线型号
  LinStyleID2: 24, //线型号
  LinWidth: 0.05, //线宽
  Xscale: 10,
  Yscale: 10,
};






class LineString {
  static add({ position, attr, service, docLayer }) {
    var pointObj = [];
    for (let item of position) {
      pointObj.push(new Zondy.Object.Point2D(item[0], item[1]));
    }
    //构成折线的弧段
    var gArc = new Zondy.Object.Arc(pointObj);
    //构成线的折线
    var gAnyLine = new Zondy.Object.AnyLine([gArc]);
    //设置线要素的几何信息
    var gline = new Zondy.Object.GLine(gAnyLine);
    //设置要素的几何信息
    var fGeom = new Zondy.Object.FeatureGeometry({ LinGeom: [gline] });
    /* style 图形参数信息 */
    //随机输出1~8之间的整数,作为新添加的要素的颜色号

    //设置添加线要素的图形参数信息
    var clineInfo = new Zondy.Object.CLineInfo(LINE_STYLE);
    //设置要素的图形参数信息
    var graphicInfo = new Zondy.Object.WebGraphicsInfo({
      /* 
            1-Point
            2-LineString
            3-Area
             */
      InfoType: 2,
      LinInfo: clineInfo,
    });






    /* 属性信息 */
    var attValue = attr.map((item) => item.value);

    var newFeature = new Zondy.Object.Feature({
      fGeom: fGeom,
      GraphicInfo: graphicInfo,
      AttValue: attValue,
    });
    //设置要素为线要素
    newFeature.setFType(2);

    /* 2、设置要素集 */
    //创建一个要素数据集
    var featureSet = new Zondy.Object.FeatureSet();
    var fldNumber = attValue.length; //属性个数
    /* 默认参数不用映射 */
    var fldName = attr.map((item) => item.name);
    var fldType = attr.map((item) => item.type);
    //创建属性结构设置对象
    var cAttStruct = new Zondy.Object.CAttStruct({
      FldName: fldName,
      FldNumber: fldNumber,
      FldType: fldType,
    });
    //设置要素数据集的树形结构
    featureSet.AttStruct = cAttStruct;
    //将添加的线要素添加到属性数据集中
    featureSet.addFeature(newFeature);
    /* 3、调用服务 */



    //创建一个地图编辑对象
    /* 第一个参数  地图文档的名称 第二个参数 要素所在的图层 */
    var editDocFeature = new Zondy.Service.EditDocFeature(
      service.name,
      service.layerId,
      {}
    );

    
    editDocFeature.add(featureSet, this.onLineSuccess(docLayer));
  }











  static onLineSuccess(docLayer) {
    return function (data) {
      if (data.succeed) {
        alert('添加点要素成功！');
        docLayer.refresh();
      } else {
        alert('添加点要素失败！');
      }
    };
  }
}
