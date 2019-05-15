# X01 管理端APP

基于 Vue 的框架 quasar 组件开发。

> 主要提供样式：[quasar](http://www.quasarchs.com/)
> Vue全家桶：[vue](https://cn.vuejs.org/)、[vue-router](https://router.vuejs.org/zh/)、[vuex](https://vuex.vuejs.org/zh/)

# 开发背景

起初管理端APP开发使用 [ApiCloud](https://www.apicloud.com/) 进行开发和打包apk，但是由于JS解析引擎过于老旧新特性使用受限且使用框架开发很不方便（并且名声不太好，据说是反编译DCloud的软件，被罚180多万）。所以检索后使用现有Vue技术栈开发APP主要有以下解决方案：

- weex 阿里开源，VUE技术下比较看好的技术 由于繁琐的打包以及各种坑，和Echarts显示上的解决方案很是不友好
- cordova 基于webview但是，我使用quasar的apk打包资源发现图表显示不稳定，据说是要自己优化填坑（安卓、IOS开发经验欠缺）
- DCloud系列（uni-app、HTML5+......）支持国产，在打包后的运行速度上和开发工具的代码提示上都是有优化的，可以在线打包、离线下载打包资源打包，Android和IOS都是支持的。

所以，由于最开始并没有意识到 quasar 图表显示的问题所以基本功能已经开发完成，而后停咯一个月后，发现使用HTML5+的SDK是可以支持到ES6的特性，甚至await/async提案也支持（也就是说运行VUE没有问题，还可以使用新特性，并不用考虑兼容性），然而我并不很想再耗费时间重新使用他家的 uni-app（基于VUE一次开发，多端覆盖）重写一遍。

> 最后确定解决方案：HBuilderX + Vue系列

# 开发环境

## 库环境
- NodeJs@10.10.0
- Npm@6.4.1
- yarn@1.9.4
- quasar-cli@0.16.4
- vue-cli@3.2.1
- HBuilderX@latest 越新内置的SDK越完善

# 开发实时浏览

开发预览时，
最好使用HBuilderX新建项目将项目配置文件的lunch地址改为，[http,https]://[你的IP]:port/，
就可以在手机上运行，并使用，plus，对象。

```bash
$ npm run dev
```

# 构建

## 构建 SPA

```bash
# 默认 Demo 版本
$ npm run build

# 分平台资源打包
$ npm run build -- [Version Name]

# e.g. 现有版本（在项目根目录下的，/config，下）

```

# HBuilderX打包APP

将打包后的文件（路径：/dist/spa-mat）所有文件拷贝至HBuilder的项目（新建项目为HTML5+的项目）路径下

> 运行 → 原生App-云打包

# 阶段性成果（区别于以往的版本）

[*] 分项目或版本加载不同资源打包APP
[*] 在线更新应用（热更新、冷更新）
