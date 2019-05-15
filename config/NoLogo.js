/**
 * 无Logo的版本
 */
module.exports = {
  "id": "NoLogo",
  "name": "监测助手",
  "version" : {
      "name" : "1.0.0",
      "code" : 1
  },
  "plus": {
    "distribute": {
      "google" : {
        "packagename" : "com.zzw.nologo",
        "keystore" : "./statics/keystore/NoLogo.keystore",
        "password" : "nologo",
        "aliasname" : "nologo"
      },
      "icons": {
        "ios": {
          "appstore": "./statics/icons/No-IOSLogo.png"
        }
      }
    }
  }
}