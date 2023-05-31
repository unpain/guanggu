/** @format */

export function setCanvas(map) {
  const canvas = document.createElement('canvas');
  let size = 40;
  canvas.width = size;
  canvas.height = size;
  let radius = size / 4; //10;
  let increase = true;
  let ctx = canvas.getContext('2d');
  function draw() {
    ctx.clearRect(0, 0, size, size);
    /* 第一个圆 */
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = '409eff8f';
    ctx.fill();
    /* 设置第二个圆 */
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 8, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = '#0D5EFF5f';
    ctx.fill();
    if (radius > 14) {
      increase = false;
    }
    if (radius < 10) {
      increase = true;
    }
    if (increase) {
      radius++;
    } else {
      radius--;
    }
    setTimeout(draw, 100);
    map.render(); //让地图重新渲染一下
  }
  draw();
  return canvas;
}
