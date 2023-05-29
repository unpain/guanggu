export const useQuery = () => {
  class Query {
    /**
     * @param {array} position [113.40,30.5] 数组
     * @param {object} service  {name,layerId}name是igserver服务的名称
     * */
    static queryByFID({ fids, service, callback }) {
      var queryStruct = new Zondy.Service.QueryFeatureStruct()
      //是否包含几何图形信息
      queryStruct.IncludeGeometry = true
      //是否包含属性信息
      queryStruct.IncludeAttribute = true
      //是否包含图形显示参数
      queryStruct.IncludeWebGraphic = false
      //创建查询的OID编号
      var objectIds = fids
      //var objectIds = "10,104,185,238";
      //实例化查询参数对象
      var queryParam = new Zondy.Service.QueryParameter({
        objectIds: objectIds,
        resultFormat: 'json',
        struct: queryStruct
      })
      queryParam.pageIndex = 0
      //设置查询要素数目
      queryParam.recordNumber = 20
      //实例化地图文档查询服务对象
      var queryService = new Zondy.Service.QueryDocFeature(
        queryParam,
        service.name,
        service.layerId,
        {}
      )
      //执行查询操作，querySuccess为查询回调函数
      queryService.query(this.querySuccess(callback))
    }
    static queryByPnt({ position, service, callback }) {
      var pointObj = new Zondy.Object.Point2D(position[0], position[1])
      //设置查询点的搜索半径
      pointObj.nearDis = 0.001
      //1、初始化查询结构对象，设置查询结构包含几何信息
      var queryStruct = new Zondy.Service.QueryFeatureStruct()
      //是否包含几何图形信息
      queryStruct.IncludeGeometry = true
      //是否包含属性信息
      queryStruct.IncludeAttribute = true
      //是否包含图形显示参数
      queryStruct.IncludeWebGraphic = false
      //2、指定查询规则
      var rule = new Zondy.Service.QueryFeatureRule({
        //是否将要素的可见性计算在内
        EnableDisplayCondition: false,
        //是否完全包含
        MustInside: false,
        //是否仅比较要素的外包矩形
        CompareRectOnly: false,
        //是否相交
        Intersect: true
      })
      //实例化查询参数对象
      var queryParam = new Zondy.Service.QueryParameter({
        geometry: pointObj,
        resultFormat: 'json',
        struct: queryStruct,
        rule: rule
      })
      //设置查询分页号
      queryParam.pageIndex = 0
      //设置查询要素数目
      queryParam.recordNumber = 20
      var queryService = new Zondy.Service.QueryDocFeature(
        queryParam,
        service.name,
        service.layerId,
        {}
      )
      //querySuccess为查询回调函数
      queryService.query(this.querySuccess(callback))
    }
    static queryByLayer({ service, callback }) {
      var queryStruct = new Zondy.Service.QueryFeatureStruct()
      //是否包含几何图形信息
      queryStruct.IncludeGeometry = true
      //是否包含属性信息
      queryStruct.IncludeAttribute = true
      //是否包含图形显示参数
      queryStruct.IncludeWebGraphic = false
      //指定查询规则
      var rule = new Zondy.Service.QueryFeatureRule({
        //是否将要素的可见性计算在内
        EnableDisplayCondition: false,
        //是否完全包含
        MustInside: false,
        //是否仅比较要素的外包矩形
        CompareRectOnly: false,
        //是否相交
        Intersect: true
      })
      //实例化查询参数对象
      var queryParam = new Zondy.Service.QueryParameter({
        resultFormat: 'json',
        struct: queryStruct,
        rule: rule
      })
      //设置查询分页号
      queryParam.pageIndex = 0
      //设置查询要素数目
      queryParam.recordNumber = 1000
      var queryService = new Zondy.Service.QueryDocFeature(
        queryParam,
        service.name,
        service.layerId,
        {}
      )
      //执行查询操作，querySuccess为查询回调函数
      queryService.query(this.querySuccess(callback))
    }
    static querySuccess(callback) {
      return res => {
        var format = new Zondy.Format.PolygonJSON()
        var ol_features = format.read(res)
        callback(ol_features)
      }
    }
  }
  return { Query }
}
