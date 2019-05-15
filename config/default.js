/** 
 * 默认配置文件
 * 需要手动在 HbuilderX里更新
 */
module.exports = {
  "@platforms": ["android", "iPhone", "iPad"],
  "id": "H5930F249",
  "name": "监测助手",
  "version": {
    "name": "1.0.0",
    "code": 1
  },
  "description": "",
  "icons": {
    "72": "icon.png"
  },
  "launch_path": "index.html",
  "developer": {
    "name": "",
    "email": "",
    "url": ""
  },
  "permissions": {
    "Accelerometer": {
      "description": "访问加速度感应器"
    },
    "Audio": {
      "description": "访问麦克风"
    },
    "Messaging": {
      "description": "短彩邮件插件"
    },
    "Cache": {
      "description": "管理应用缓存"
    },
    "Camera": {
      "description": "访问摄像头"
    },
    "Console": {
      "description": "跟踪调试输出日志"
    },
    "Contacts": {
      "description": "访问系统联系人信息"
    },
    "Device": {
      "description": "访问设备信息"
    },
    "Downloader": {
      "description": "文件下载管理"
    },
    "Events": {
      "description": "应用扩展事件"
    },
    "File": {
      "description": "访问本地文件系统"
    },
    "Gallery": {
      "description": "访问系统相册"
    },
    "Geolocation": {
      "description": "访问位置信息"
    },
    "Invocation": {
      "description": "使用Native.js能力"
    },
    "Orientation": {
      "description": "访问方向感应器"
    },
    "Proximity": {
      "description": "访问距离感应器"
    },
    "Storage": {
      "description": "管理应用本地数据"
    },
    "Uploader": {
      "description": "管理文件上传任务"
    },
    "Runtime": {
      "description": "访问运行期环境"
    },
    "XMLHttpRequest": {
      "description": "跨域网络访问"
    },
    "Zip": {
      "description": "文件压缩与解压缩"
    },
    "Barcode": {
      "description": "管理二维码扫描插件"
    },
    "Maps": {
      "description": "管理地图插件"
    },
    "Speech": {
      "description": "管理语音识别插件"
    },
    "Webview": {
      "description": "窗口管理"
    },
    "NativeUI": {
      "description": "原生UI控件"
    },
    "Navigator": {
      "description": "浏览器信息"
    },
    "NativeObj": {
      "description": "原生对象"
    }
  },
  "plus": {
    "splashscreen": {
      "autoclose": false,
      "waiting": true,
      "delay": ""
    },
    "statusbar": {
      "immersed": "supportedDevice"
    },
    "popGesture": "close",
    "runmode": "normal",
    "signature": "Sk9JTiBVUyBtYWlsdG86aHIyMDEzQGRjbG91ZC5pbw==",
    "distribute": {
      "apple": {
        "appid": "",
        "mobileprovision": "",
        "password": "",
        "p12": "",
        "devices": "universal",
        "frameworks": []
      },
      "google": {
        "packagename": "",
        "keystore": "",
        "password": "",
        "aliasname": "",
        "permissions": [
          "<uses-permission android:name=\"android.permission.CHANGE_NETWORK_STATE\"/>",
          "<uses-permission android:name=\"android.permission.MOUNT_UNMOUNT_FILESYSTEMS\"/>",
          "<uses-permission android:name=\"android.permission.READ_CONTACTS\"/>",
          "<uses-permission android:name=\"android.permission.VIBRATE\"/>",
          "<uses-permission android:name=\"android.permission.READ_LOGS\"/>",
          "<uses-permission android:name=\"android.permission.ACCESS_WIFI_STATE\"/>",
          "<uses-feature android:name=\"android.hardware.camera.autofocus\"/>",
          "<uses-permission android:name=\"android.permission.WRITE_CONTACTS\"/>",
          "<uses-permission android:name=\"android.permission.ACCESS_NETWORK_STATE\"/>",
          "<uses-permission android:name=\"android.permission.CAMERA\"/>",
          "<uses-permission android:name=\"android.permission.RECORD_AUDIO\"/>",
          "<uses-permission android:name=\"android.permission.GET_ACCOUNTS\"/>",
          "<uses-permission android:name=\"android.permission.MODIFY_AUDIO_SETTINGS\"/>",
          "<uses-permission android:name=\"android.permission.READ_PHONE_STATE\"/>",
          "<uses-permission android:name=\"android.permission.CHANGE_WIFI_STATE\"/>",
          "<uses-permission android:name=\"android.permission.WAKE_LOCK\"/>",
          "<uses-permission android:name=\"android.permission.CALL_PHONE\"/>",
          "<uses-permission android:name=\"android.permission.FLASHLIGHT\"/>",
          "<uses-permission android:name=\"android.permission.ACCESS_COARSE_LOCATION\"/>",
          "<uses-feature android:name=\"android.hardware.camera\"/>",
          "<uses-permission android:name=\"android.permission.ACCESS_FINE_LOCATION\"/>",
          "<uses-permission android:name=\"android.permission.WRITE_SETTINGS\"/>"
        ]
      },
      "orientation": ["portrait-primary"],
      "icons": {
        "ios": {
          "prerendered": true,
          "auto": "",
          "iphone": {
            "normal": "",
            "retina": "",
            "retina7": "",
            "retina8": "",
            "spotlight-normal": "",
            "spotlight-retina": "",
            "spotlight-retina7": "",
            "settings-normal": "",
            "settings-retina": "",
            "settings-retina8": "",
            "app@2x": "unpackage/res/icons/120x120.png",
            "app@3x": "unpackage/res/icons/180x180.png",
            "notification@2x": "unpackage/res/icons/40x40.png",
            "notification@3x": "unpackage/res/icons/60x60.png",
            "settings@2x": "unpackage/res/icons/58x58.png",
            "settings@3x": "unpackage/res/icons/87x87.png",
            "spotlight@2x": "unpackage/res/icons/80x80.png",
            "spotlight@3x": "unpackage/res/icons/120x120.png"
          },
          "ipad": {
            "normal": "",
            "retina": "",
            "normal7": "",
            "retina7": "",
            "spotlight-normal": "",
            "spotlight-retina": "",
            "spotlight-normal7": "",
            "spotlight-retina7": "",
            "settings-normal": "",
            "settings-retina": "",
            "app": "unpackage/res/icons/76x76.png",
            "app@2x": "unpackage/res/icons/152x152.png",
            "notification": "unpackage/res/icons/20x20.png",
            "notification@2x": "unpackage/res/icons/40x40.png",
            "proapp@2x": "unpackage/res/icons/167x167.png",
            "settings": "unpackage/res/icons/29x29.png",
            "settings@2x": "unpackage/res/icons/58x58.png",
            "spotlight": "unpackage/res/icons/40x40.png",
            "spotlight@2x": "unpackage/res/icons/80x80.png"
          },
          "appstore": "./statics/icons/IOSLogo.png"
        },
        "android": {
          "mdpi": "unpackage/res/icons/48x48.png",
          "ldpi": "unpackage/res/icons/48x48.png",
          "hdpi": "unpackage/res/icons/72x72.png",
          "xhdpi": "unpackage/res/icons/96x96.png",
          "xxhdpi": "unpackage/res/icons/144x144.png",
          "xxxhdpi": "unpackage/res/icons/192x192.png"
        }
      },
      "splashscreen": {
        "ios": {
          "iphone": {
            "default": "",
            "retina35": "./statics/launch/launch.png",
            "retina40": "./statics/launch/launch.png",
            "retina47": "./statics/launch/launch.png",
            "retina55": "./statics/launch/launch.png",
            "retina55l": "./statics/launch/launch.png",
            "retina40l": "./statics/launch/launch.png",
            "retina47l": "./statics/launch/launch.png",
            "iphonex": "./statics/launch/launch.png",
            "iphonexl": "./statics/launch/launch.png",
            "portrait-896h@2x": "./statics/launch/launch.png",
            "landscape-896h@2x": "./statics/launch/launch.png",
            "portrait-896h@3x": "./statics/launch/launch.png",
            "landscape-896h@3x": "./statics/launch/launch.png"
          },
          "ipad": {
            "portrait": "",
            "portrait-retina": "",
            "landscape": "",
            "landscape-retina": "",
            "portrait7": "./statics/launch/launch.png",
            "portrait-retina7": "./statics/launch/launch.png",
            "landscape7": "./statics/launch/launch.png",
            "landscape-retina7": "./statics/launch/launch.png",
            "portrait-1112h@2x": "./statics/launch/launch.png",
            "landscape-1112h@2x": "./statics/launch/launch.png",
            "portrait-1194h@2": "./statics/launch/launch.png",
            "landscape-1194h@2x": "./statics/launch/launch.png",
            "portrait-1366h@2x": "./statics/launch/launch.png",
            "landscape-1366h@2x": "./statics/launch/launch.png"
          }
        },
        "android": {
          "mdpi": "",
          "ldpi": "",
          "hdpi": "./statics/launch/launch-min.9.png",
          "xhdpi": "./statics/launch/launch-min.9.png",
          "xxhdpi": "./statics/launch/launch-min.9.png"
        }
      },
      "plugins": {
        "speech": {
          "ifly": {}
        }
      }
    }
  }
}
