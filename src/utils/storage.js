/**
 * 清除所有本地储存
 */
export function clearnLocalStorage() {
  localStorage.clear();
}
/**
 * 储存数据
 */
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
/**
 * 获取数据
 * @param {*} key 
 */
export function getLocalStorage(key) {
  let rt = localStorage.getItem(key);
  try {
    rt = JSON.parse(rt);
  } catch(e) {
    //
  }
  return rt;
}
/**
 * 删除单个数据
 * @param {*} key 
 */
export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

/**
 * 清除所有session储存
 */
export function clearnSessionStorage() {
  sessionStorage.clear();
}
/**
 * 存储session会话数据
 */
export function setSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
/**
 * 获取session会话数据
 * @param {*} key 
 */
export function getSessionStorage(key) {
  let rt = sessionStorage.getItem(key);
  try {
    rt = JSON.parse(rt);
  } catch(e) {
    //
  }
  return rt;
}
/**
 * 删除单个session会话数据
 * @param {*} key 
 */
export function removeSessionStorage(key) {
  sessionStorage.removeItem(key);
}

