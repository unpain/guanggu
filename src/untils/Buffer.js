/**
    * 发布公告绘制线结束的回调函数
    * @param {ol.interaction.Draw.Event} result 事件对象
    */
let resultname = null;
let resultClipLayer
export class Buffer {
  static singleBuffAnalysis = ({ radius, arc_points, $map, arr }) => {
    const gArc = new Zondy.Object.Arc(arc_points);
    //构成线的折线
    const gAnyLine = new Zondy.Object.AnyLine([gArc]);
    //设置线要素的⼏何信息
    const gline = new Zondy.Object.GLine(gAnyLine);
    //设置要素的⼏何信息
    const fGeom = new Zondy.Object.FeatureGeometry({ LinGeom: [gline] });
    //设置属性结构
    const regAttStr = new Zondy.Object.CAttStruct({
      FldName: ["ID", "⾯积", "周⻓", "LayerID"],
      FldNumber: 4,
      FldType: ["FldLong", "FldDouble", "FldDouble", "FldLong"]
    });
    var values = [0, 62.566714, 50.803211, 0];
    //实例化CAttDataRow类
    const valuesRow = new Zondy.Object.CAttDataRow(values, 1);
    //实例化FeatureBuffBySingleRing类，设置要素缓冲分析必要参数，输出分析结果到缓冲
    // 分析结果图层
    const featureBufBySR = new Zondy.Service.FeatureBuffBySingleRing({
      ip: 'localhost',
      port: '6163', //访问IGServer的端⼝号，.net版为6163，Java版为8089,
      //设置要素缓冲分析左半径
      leftRad: radius,
      //设置要素缓冲分析右半径
      rightRad: radius,
    });
    resultname = 'gdbp://MapGisLocal/wuhan/ds/buffer/sfcls/bufferresult' + this.getCurrentTime();
    /*设置缓冲分析参数*/
    //设置⼏何信息
    featureBufBySR.sfGeometryXML = JSON.stringify([fGeom]);
    //设置属性结构
    featureBufBySR.attStrctXML = JSON.stringify(regAttStr);
    //设置属性值
    featureBufBySR.attRowsXML = JSON.stringify([valuesRow]);
    //设置追踪半径
    featureBufBySR.traceRadius = 0.0001;
    //设置缓冲结果的名称以及存放地址
    featureBufBySR.resultName = resultname;
    //调⽤Zondy.Service.AnalysisBase基类的execute⽅法执⾏要素缓冲分析，AnalysisSuccess为回调函数。
    featureBufBySR.execute(this.bufferAnalysisSuccess($map,arr), 'post', false, 'json');
  }
  static bufferAnalysisSuccess = ($map,arr) => {
    return (result) => {
      var clspath = result.results[0].Value;
      //实例化ClipByLayer类
      var clipParam = new Zondy.Service.ClipByLayer({
        //源简单要素类的URL
        srcInfo1: clspath,
        srcInfo2: "gdbp://MapGisLocal/wuhan/sfcls/居民区",
        //裁剪框简单要素类的URL
        //设置结果URL
        desInfo: "gdbp://MapGisLocal/wuhan/ds/clip/sfcls/clipresult" + this.getCurrentTime(),
        infoOptType: 0
      });
      //调⽤基类的execute⽅法，执⾏图层裁剪分析。AnalysisSuccess为结果回调函数
      clipParam.execute(this.clipSuccess($map,arr), "post", false, "json");
    }
  }
  static clipSuccess = ($map,arr) => {
    return (data) => {
      const newpath = data.results[0].Value
      $map.removeLayer(resultClipLayer);
      if (data.succeed) {
        //将结果图层添加到地图视图中显示
        resultClipLayer = new Zondy.Map.GdbpLayer(
          'resultClipLayer',
          [newpath],
          {
            crossOrigin: 'Anonymous',
          }
        );
        $map.addLayer(resultClipLayer);
        this.queryVectorLayer({
          url: newpath,
          success: this.handleClipSuccess(arr)
        })
      } else {
        alert('叠加分析失败，请检查参数！');
      }
    }
  }
  static handleClipSuccess(arr) {
    return (res) => {
      res.SFEleArray.forEach(item => {
        arr.push({ name: item.AttValue[4], tel: item.AttValue[5] })
      })
    }
  }
  static queryVectorLayer({ url, success }) {
    //初始化查询结构对象，设置查询结构包含⼏何信息
    var queryStruct = new Zondy.Service.QueryFeatureStruct();
    //是否包含⼏何图形信息
    queryStruct.IncludeGeometry = false;
    //是否包含属性信息
    queryStruct.IncludeAttribute = true;
    //是否包含图形显示参数
    queryStruct.IncludeWebGraphic = false;
    //var objectIds = "10,104,185,238";
    //实例化查询参数对象
    var queryParam = new Zondy.Service.QueryByLayerParameter(url, {
      resultFormat: "json",
      struct: queryStruct
    });
    queryParam.recordNumber = 1000
    //实例化地图⽂档查询服务对象
    var queryService = new Zondy.Service.QueryLayerFeature(queryParam, {
      ip: "localhost",
      port: "6163" //访问IGServer的端⼝号，.net版为6163，Java版为8089
    });
    //执⾏查询操作，querySuccess为查询回调函数
    queryService.query(success);
  }
  static getCurrentTime() {
    var now = new Date();
    //获取当前年份
    var year = now.getFullYear();
    //获取当前月份     
    var month = now.getMonth() + 1;
    //获取当前日期   
    var day = now.getDate();
    //获取当前时刻
    var hh = now.getHours();
    //获取当前分钟
    var mm = now.getMinutes();
    //获取当前秒钟
    var ss = now.getSeconds();
    //将当前的日期拼串
    var clock = year + "-";
    if (month < 10)
      clock += "0";
    clock += month + "-";
    if (day < 10)
      clock += "0";
    clock += day + "-";
    if (hh < 10)
      clock += "0";
    clock += hh;
    if (mm < 10) clock += '0';
    clock += mm;
    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
  }
}
