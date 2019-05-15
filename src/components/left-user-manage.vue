<template>
  <div class="about-mine">
    <div class="mine-header">
      <img :src="avatarURL" alt="">
      <div class="mine-nickname">{{ userinfo.userName || userinfo.username }}</div>
    </div>
    <q-list highlight separator class="ops-items">
      <q-item @click.native="itemClick('checkVersion')" v-ripple>
        <q-item-side icon="autorenew" />
        <q-item-main :label="$t('检查更新')" />
        <q-item-side class="appent">{{ $t('当前版本') }}：V{{ version }}</q-item-side>
      </q-item>
      <q-item @click.native="itemClick('changeLang')" v-ripple>
        <q-item-side icon="translate" />
        <q-item-main :label="$t('修改语言')" />
        <q-item-side class="appent">{{ $t('当前语言') }}：{{ langKeyMaps[currentLang] }}</q-item-side>
      </q-item>
      <q-item @click.native="itemClick('cleanStore')" v-ripple>
        <q-item-side icon="delete_forever" />
        <q-item-main :label="$t('清除缓存')" />
      </q-item>
      <q-item @click.native="itemClick('changePwd')" v-ripple>
        <q-item-side icon="settings" />
        <q-item-main :label="$t('修改密码')" />
      </q-item>
    </q-list>
    <!-- 支持 -->
    <div v-if="super_info" v-html="super_info" class="super"></div>
    <!-- 退出按钮 -->
    <q-btn class="logout-btn" color="grey-5" :label="$t('退出')" icon="power_settings_new" @click="logout" />
  </div>
</template>

<script>
export default {
  name: 'leftUserManage',
  data () {
    return {
      avatarURL: require('src/statics/boy-avatar.png'),
      langKeyMaps: {
        'zh-cn': '简体中文',
        'en-us': 'English'
      }
    }
  },
  computed: {
    version() {
      return this.$store.getters.wgtinfo.version;
    },
    super_info() {
      let manifest = this.$store.getters.manifest
      let sub = manifest ? manifest.sub : false, res = false
      if(sub) {
        if(sub.des instanceof Array) {
          res = sub.des.join('<br>')
        } else if(sub.des) {
          res = sub.des
        }
      }
      return res
    },
    userinfo() {
      return this.$store.getters.userinfo;
    },
    currentLang() {
      return this.$store.getters.lang;
    }
  },
  methods: {
    itemClick(type) {
      switch(type) {
        case 'checkVersion':
        this.$q.loading.show({
          delay: 100 // ms
        })
        setTimeout(() => {
          this.$q.notify({
            message: this.$t('已经是最新版本'),
            timeout: 1000,
            type: 'positive',
          })
          this.$q.loading.hide();
        }, 800);
        break;
        case 'changeLang':
        // this.$q.i18n.set('en-us') quasar的i18n
        // 切换语言并重新加载应用
        let langStr = this.currentLang === 'zh-cn' ? 'en-us' : 'zh-cn'
        this.$changeLang(langStr)
        break;
        case 'cleanStore':
        this.$q.loading.show({
          delay: 100 // ms
        })
        setTimeout(() => {
          this.$q.notify({
            message: this.$t('缓存清除成功'),
            timeout: 1000,
            type: 'positive',
          })
          this.$q.loading.hide();
        }, 800);
        break;
        case 'changePwd':
        this.$q.notify({
          message: this.$t('暂时无法修改密码'),
          timeout: 1000,
          type: 'info',
        })
        break;
      }
    },
    logout() {
      this.$store.dispatch('UserLogOut').then(() => {
        this.$router.replace({
          name: 'login'
        });
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.about-mine {
  .mine-header {
    text-align: center;
    background $primary
    padding 20px 0

    img {
      width: 128px;
      height: 128px;
      border-radius: 50%;
    }
    .mine-nickname {
      font-size 18px
      color #ffffff
    }
  }

  .ops-items {
    padding: 0;

    .q-item {
      .appent {
        font-size: .7rem;
      }
    }
    .q-item:focus,
    .q-item:active {
      background: transparent;
    }
  }

  .logout-btn {
    width: 200px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  // 版权开发
  .super{
    margin-top: 25px;
    text-align: center;
    font-size: .8rem;
    color: rgba(0, 0, 0, .5);
  }
}

</style>
