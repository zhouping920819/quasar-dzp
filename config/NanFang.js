/**
 * 南方测绘
 * 中国中铁
 */
module.exports = {
  "id": "NanFang",
  "name": "中国中铁",
  "version" : {
      "name" : "1.0.0",
      "code" : 1
  },
  /** 广州南方测绘科技股份有限公司研发<br>技术支持：李中立 18688907500 */
  "sub": {
    "des": [
      "广州南方测绘科技股份有限公司研发",
      "技术支持：李中立 18688907500"
    ],
  },
  "plus": {
    "distribute": {
      "google" : {
        "packagename" : "com.zzw.x01.nanfang",
        "keystore" : "./statics/keystore/NanFang.keystore",
        "password" : "zzwzzw",
        "aliasname" : "nanfang"
      },
      "icons": {
        "ios": {
          "appstore": "./statics/icons/NanFang-IOSLogo.png"
        }
      }
    }
  }
}