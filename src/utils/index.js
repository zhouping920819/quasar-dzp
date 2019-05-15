/**
 * 文件大小计算
 * @param {Number} bytes 
 */
export function humanStorageSize (bytes) {
  const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB']
  let u = 0

  while (parseInt(bytes, 10) >= 1024 && u < units.length - 1) {
    bytes /= 1024
    ++u
  }

  return `${bytes.toFixed(1)} ${units[u]}`
}
/**
 * 报警级别统一计算
 * @param {Number} level 
 */
export function alertLevelColor(level) {
  let color = "";
  switch (Math.floor(level / 10)) {
    case 0:
      color = "yellow";
      break;
    case 1:
      color = "orange";
      break;
    case 2:
      color = "red";
      break;
    default:
      break;
  }
  return color;
}
