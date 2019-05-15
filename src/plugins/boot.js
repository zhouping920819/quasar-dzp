/**
 * 该js为所有页面都必须加载的js
 * 可以用于全局添加某功能
 */
import FastClick from "fastclick";
// 去除300ms延迟
FastClick.attach(document.body);
// document.addEventListener(
//   "DOMContentLoaded",
//   function () {
//     FastClick.attach(document.body);
//   },
//   false
// );

// 开发环境显示
if(process.env.NODE_ENV === 'development') {
  // 移动端
  //if(window.navigator.platform === 'Win32') {

    // 移动端调试插件
    let VConsole = require('vconsole/dist/vconsole.min.js')
    new VConsole() // 初始化
    console.log('asda111111')
  //} else {
    console.log('asdasd121212')
    // 电脑端
    let { Notify } = require('quasar')
    // 挂载 plus 值
    window.plus = {
      nativeUI: {
        toast(message, option) {
          Notify.create({
            message,
            type: 'info',
            position: 'bottom',
            timeout: 1000,
          })
        }
      },
      navigator: {
        getStatusbarHeight() {
          return 0
        },
        hasSplashscreen() {
          return false
        },
        // 关闭应用启动界面
        closeSplashscreen() {}
      }
    }
 // }
}
// "boot" 命名的插件具有特殊意义，需要手动初始化实例，new Vue()
export default ({ app, router, store, Vue }) => {
  // 自动关闭窗口 可根据具体逻辑自定义
  async function plusReady() {
    /**
     * 获取当前应用信息
     */
    await new Promise((resolve, reject) => {
      plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
        store.dispatch('wgtinfo', wgtinfo);
        resolve()
      });
    });
    // plus.nativeUI.showWaiting("下载wgt文件...");
    // plus.nativeUI.closeWaiting();
    /**
     * 绑定退出按钮事件
     */
    plus.key.addEventListener("backbutton", () => {
      var ws = plus.webview.currentWebview();
      store.dispatch('RemoveSubPage', ws)
    },false);
    // 启动网站-应用程序
    new Vue(app)
  }
  // 简易区分硬件平台，用于开发调试
  if(window.navigator.platform !== 'Win32') {
    // console.log(app)
    new Vue(app)
    return
  }
  // 入口
  if (window.plus) {
    plusReady();
  } else {
    document.addEventListener("plusready", plusReady, false);
  }
}
