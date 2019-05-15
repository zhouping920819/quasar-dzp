// import something here
import { date } from 'quasar'
import * as utils from 'src/utils';
/** 自定义组件 */
import breadcrumbs from 'components/breadcrumbs-select.vue'
import PieChart from 'components/Charts/PieChart.vue'
import BarChart from 'components/Charts/BarChart.vue'
import LineChart from 'components/Charts/LineChart.vue'
import DateSelect from 'components/DateSelect/index.vue'// 时间选择
import Statusbar from 'components/statusbar.vue'// 适配系统状态栏

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  /* 注册全局组件 */
  Vue.component(breadcrumbs.name, breadcrumbs);
  Vue.component(PieChart.name, PieChart);
  Vue.component(BarChart.name, BarChart);
  Vue.component(LineChart.name, LineChart);
  Vue.component(DateSelect.name, DateSelect);
  Vue.component(Statusbar.name, Statusbar);
  /* 全局函数注入 */
  Vue.prototype.$formatDate = function(time, formatStr) {
    // 'YYYY-MM-DDTHH:mm:ss.SSSZ'
    return date.formatDate(time, formatStr);
  };
  Vue.prototype.$tools = utils;// 通用工具
  // plus工具
  Vue.prototype.$plusTools = {
    toUpAPP(opt) {
      plus.nativeUI.confirm(opt.note, (event) => {
        if (0 == event.index) {
          this.downWgt(opt.url);// wgt
          // plus.runtime.openURL(opt.url);// apk
				}
      }, '应用需要更新', ["立即更新", "取消"]);
    },
    /**
     * 下载wgt文件
     * @param {String} wgtUrl 
     */
    downWgt(wgtUrl) {
      plus.nativeUI.showWaiting("下载wgt文件...");
      plus.downloader.createDownload(wgtUrl, {filename:"_doc/update/"}, (d,status) =>{
        if( status == 200 ) {
          // 下载wgt成功
          this.installWgt(d.filename);// 安装wgt包
        }else {
          plus.nativeUI.alert("下载wgt失败！");
        }
        plus.nativeUI.closeWaiting();
      }).start();
    },
    /**
     * 更新应用资源
     * @param {*} path 
     */
    installWgt(path) {
      plus.nativeUI.showWaiting("安装wgt文件...");
      plus.runtime.install(path, {}, () => {
        plus.nativeUI.closeWaiting();
        plus.nativeUI.alert("应用资源更新完成！", () => {
          plus.runtime.restart();
        });
      }, (e) => {
        plus.nativeUI.closeWaiting();
        plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
      });
    }
  };
}
