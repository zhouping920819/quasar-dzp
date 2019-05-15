<template>
  <router-view id="q-app" />
</template>

<script>
export default {
  name: 'App',
  computed: {
    lauchFlag() {
      return this.$store.getters.lauchFlag
    }
  },
  methods: {
    readConfigFile() {
      // 当前应用配置文件读取
     /* plus.io.requestFileSystem(plus.io.PRIVATE_WWW, fs => {
        // fs.root是根目录操作对象DirectoryEntry
        fs.root.getFile('manifest.json', {create: false}, fileEntry => {
          fileEntry.file(file => {
            let fileReader = new plus.io.FileReader();
            fileReader.readAsText(file, 'utf-8');
            fileReader.onloadend = evt => {
              let data = evt.target.result
              data = JSON.parse(data)
              this.$store.dispatch('manifest', data);
            }
          });
        });
      });*/
    },
    lauchGuide() {
      if(!this.lauchFlag) {
        // 需要显示启动导航广告
        this.$store.dispatch('setLauchFlag', true)
      }
    }
  },
  beforeCreate () {
    // 版本检查
    this.$store.dispatch('CheckVersion').then(res => {
      this.$plusTools.toUpAPP(res)
    }).catch(err => {});
  },
  created() {
    this.lauchGuide();
    this.readConfigFile()
  },
  mounted () {
    // 延迟关闭启动界面
    setTimeout(() => {
      let b = plus.navigator.hasSplashscreen()
      // 未关闭
      if(b) {
        plus.navigator.closeSplashscreen();// 关闭应用启动界面
      }
    }, 2000)
  }
}
</script>
