/**
 * @format
 * @param {object} service {name,layerId}
 * @param {array} featureIds
 */

function delFeature({ service, featureIds, docLayer }) {
  var deleteService = new Zondy.Service.EditDocFeature(
    service.name,
    service.layerId,
    {}
  );
  deleteService.deletes(featureIds, onPntSuccess(docLayer));
}
function onPntSuccess(docLayer) {
  return function (result) {
    if (result) {
      alert('删除要素成功！');
      docLayer.refresh();
    } else {
      alert('删除要素失败！');
    }
  };
}
