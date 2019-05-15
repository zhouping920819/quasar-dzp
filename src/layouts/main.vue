<template>
  <!-- 主要包裹组件 -->
  <q-layout view="hHr LpR lFf">
    <!-- 页眉 -->
    <q-layout-header>
      <statusbar></statusbar>

      <!--  -->
      <q-toolbar :color="mainColor">
        <!--
          切换QLayout左侧
          （假设侧滑菜单有一个绑定到“leftSide”的数据模型）
        -->
        <q-btn flat round dense icon="perm_identity" size="16px" @click="leftSide = !leftSide"/>
        <!-- title -->
        <q-toolbar-title>
          {{ title.text }}
          <span slot="subtitle">{{ title.sub }}</span>
        </q-toolbar-title>
        <!-- right -->
      </q-toolbar>
    </q-layout-header>

  <!--  &lt;!&ndash; 侧滑面板 mobile desktop &ndash;&gt;
    <q-layout-drawer side="left" behavior="mobile" v-model="leftSide">
      <leftUserManage v-if="hasCurrentNode"></leftUserManage>
    </q-layout-drawer>

    &lt;!&ndash; 侧滑面板，右 &ndash;&gt;
    <q-layout-drawer side="right" behavior="mobile" v-model="rightSide">
      <right-tree-box v-if="hasCurrentNode"></right-tree-box>
    </q-layout-drawer>-->

    <!-- 必需的 -->
    <q-page-container class="page-container">
      <!--
        这里是Vue Router注入子页面组件的地方

        下面的<router-view />标签可以替换成一个
        实际的网页内容，你应该这样做。
      -->
      <router-view v-if="hasCurrentNode"/>
      <!--
        QPageContainer的第一个子无素必须是QPage，
        所以请确保您的布局路由子组件封装一个QPage。
      -->
    </q-page-container>

   <!--  回到顶部，粘滞性，按钮
   <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        color="primary"
        fab
        class="animate-pop"
        v-back-to-top.animate="{offset: 300, duration: 200}"
      >
        <q-icon name="keyboard_arrow_up"/>
      </q-btn>
    </q-page-sticky>-->

    <!-- 页脚 -->
    <q-layout-footer>
      <q-tabs :color="mainColor" position="bottom" @select="tabSelect">
        <!-- 使用 vue 的 replace 进行路由跳转 -->
        <q-route-tab
          slot="title"
          v-for="(item, idx) in tabs"
          :key="idx"
          :icon="item.icon"
          :name="item.path"
          replace
          :to="{
            path: item.path,
            query: $route.query
          }"
          :label="$t(item.label)"
        ></q-route-tab>
      </q-tabs>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import leftUserManage from 'components/left-user-manage.vue';
import RightTreeBox from './components/right-tree-box.vue';
export default {
  components: {
    leftUserManage,
    RightTreeBox
  },
  data() {
    return {
      title: {
        text: '',
        sub: ''
      },
      tabs: [
        {
          icon: 'home',
          path: '/home',
          label: '主页'
        },
        {
          icon: 'import_contacts',
          path: '/physicianVisits',
          label: '问诊'
        },
        {
          icon: 'notifications_active',
          path: '/mine',
          label: '我的'
        }
      ],
      leftSide: false,
    };
  },
  computed: {
    mainColor() {
      return this.$store.state.theme;
    },
    // 加载 当前节点后才加载 main
    hasCurrentNode() {
      return !!this.$store.getters.currentNode;
    },
    rightSide: {
      get() {
        return this.$store.getters.treebox;
      },
      set(val) {
        this.$store.dispatch('ToggleTreeBox', val);
      }
    }
  },
  created() {

      this.$axios.getOrjTree({}).then(result => {
      this.$store.dispatch('TreeList', result.data);
    });

  },
  methods: {
    tabSelect(tab_name) {
      let tmp;
      for (let i in this.tabs) {
        tmp = this.tabs[i];
        if (tmp.path === tab_name) {
          break;
        }
      }
      this.title = {
        text: this.$t(tmp.label),
        sub: tmp.sub
      };
    },
  }
}
</script>

<style lang="less" scoped>
.q-layout /deep/ {
  .content-padding {
    // padding: 0 10px;
    background-color: #efefef;
    // 滑动主体
    /deep/ .pull-to-refresh-container {
      margin-bottom: -50px;
      min-height: calc(100vh - 65px);
    }
  }
  .pull-to-refresh {
    max-height: none;
  }
}
.page-container {
  min-height: 100vh;
  // overflow: hidden;
}
/*.bg-primary {
  background: #F0F0F0 !important;
  background: #F0F0F0 !important

}*/

</style>

