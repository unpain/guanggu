import { ref } from 'vue'

export const useMark = () => {
  const source = new ol.source.Vector({})
  const layer = new ol.layer.Vector({
    id: 666,
    source
  })
  const src = ref('')
  const setSrc = state => {
    if (state == 0) {
      src.value = 'src/assets/images/map-marker-red.svg'
    } else if (state == 1) {
      src.value = 'src/assets/images/map-marker-yellow.svg'
    } else {
      src.value = 'src/assets/images/map-marker-green.svg'
    }
  }
  const setStyle = (state, fid) => {
    source.forEachFeature(e => {
      if (e.id_ == fid) {
        setSrc(state)
        let markStyle = ref(
          new ol.style.Style({
            image: new ol.style.Icon({
              anchor: [0.5, 19],
              anchorOrigin: 'center',
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              offsetOrigin: 'center',
              // offset:[0,10],
              //图标缩放比例
              scale: 1.2,
              //透明度
              opacity: 0.9,
              //图标的url
              src: src.value
            })
          })
        )
        e.setStyle(markStyle.value)
      } else {
        setSrc(e.values_.values_['处理状态'])
        let markStyle = ref(
          new ol.style.Style({
            image: new ol.style.Icon({
              anchor: [0.5, 19],
              anchorOrigin: 'center',
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              offsetOrigin: 'center',
              // offset:[0,10],
              //图标缩放比例
              scale: 1.2,
              //透明度
              opacity: 0.9,
              //图标的url
              src: src.value
            })
          })
        )
        e.setStyle(markStyle.value)
      }
    })
  }
  return {
    layer,
    source,
    setStyle
  }
}
