// Configuration for your app
const path = require('path');
const MergeJsonFile = require('./config/MergeJsonFile');

module.exports = function(ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: ["boot", "app", 'service', "i18n", "photoswipe/index.js"],
    css: ["app.styl"],
    extras: [
      ctx.theme.mat ? "roboto-font" : null,
      "material-icons" // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      // publicPath: '',
      scopeHoisting: true,
      vueRouterMode: "hash",// history
      // webpackManifest: true,
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        // 命令行参数
        let customerConfig = process.argv[2];
        let maps = {
          'demo': 'Demo',
          'Demo': 'Demo',
          'nanfang': 'NanFang',
          'NanFang': 'NanFang',
          'nologo': 'NoLogo',
          'NoLogo': 'NoLogo',
          'jiaojian': 'JiaoJian',
          'JiaoJian': 'JiaoJian',
        };
        // 开发环境不需要 manifest.json 文件
        if(cfg.mode !== 'development') {
          cfg.plugins.push(new MergeJsonFile({
            from: path.resolve(__dirname, `config/${ maps[customerConfig] || 'Demo' }.js`),
            to: path.resolve(cfg.output.path, 'manifest.json')
          }));
        }
      },
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
      proxy: {
        '/api/v2/remote': {
          target: 'http://rms.groupinno.com/api/register/loginurl',
          pathRewrite: {'/api/v2/remote' : ''},
          changeOrigin: true,
        },
        '/api': {
          // target: 'http://192.168.0.120:81',
          target: 'http://x01.ngrok.groupinno.com',
          // changeOrigin 的意思就是把 http 请求中的 Origin 字段进行变换
          // 在浏览器接收到后端回复的时候，浏览器会以为这是本地请求，而在后端那边会以为是在站内的调用
          changeOrigin: true,
        },
        '/file': {
          // target: 'http://192.168.0.120:81',
          target: 'http://x01.ngrok.groupinno.com',
          changeOrigin: true
        }
      }
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        "QLayout",
        "QLayoutHeader",
        "QLayoutFooter",
        "QLayoutDrawer",
        "QPageContainer",
        "QPage",
        "QToolbar",
        "QToolbarTitle",
        "QPageSticky",
        "QBtn",
        "QIcon",
        // 导航
        "QTabs",
        "QTab",
        "QTabPane",
        "QRouteTab",
        "QPullToRefresh",
        // 面包屑
        "QBreadcrumbs",
        "QBreadcrumbsEl",
        // 列表和列表项
        "QList",
        "QListHeader",
        "QItem",
        "QItemTile",
        "QItemMain",
        "QItemSeparator",
        "QItemSide",
        // 表单输入
        "QField",
        "QInput",
        "QSpinner",
        "QDatetime",
        "QToggle",
        "QCheckbox",
        "QBtnToggle",
        // 模态框
        "QModal",
        "QModalLayout",
        // 进度条
        "QProgress",
        // 加载
        "QInnerLoading",
        //... 如果使用自定义旋转器，
        //无论如何请将其添加
        "QSpinnerGears",
        // 分组
        "QTree",
        // 滚动
        "QInfiniteScroll",
        // 动画过滤
        "QSlideTransition",
      ],
      directives: ["Ripple", "CloseOverlay", "BackToTop"],
      // Quasar plugins
      plugins: [
        "Notify",
        "ActionSheet",
        "Dialog",
        "Loading"
      ],
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      i18n: 'zh-hans' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: '',
        short_name: '',
        description: '',
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: [
          {
            src: "statics/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "statics/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "statics/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "statics/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "statics/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      }
    }
  };
};
