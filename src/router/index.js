import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

// store
import store from 'src/store'

Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/**
 * 路由守卫
 */
Router.beforeEach((to, from, next) => {
  // routers理设置是否授权，并，登陆跳转的不需要验证授权、默认授权
  if(to.matched.some(record => record.meta.requiresAuth) && from.name !== 'login') {
    // 验证token
    if(store.getters.isLoginFlag) {
      // 触发检查token是否有效
      next();
    } else {
      next({
        replace: true,
        name: 'login'
      });
    }
  } else {
    next();
  }
})

export default Router
