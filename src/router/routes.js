// import
import MainLayout from 'layouts/main'
import Home from 'pages/home/index.vue'
import PhysicianVisits from 'pages/physicianVisits/index.vue'
import Mine from 'pages/mine/index.vue'
// 主要的菜单路由
export const menuList = [
  {
    path: "home",
    name: "home",
    component: Home
  },
  {
    path: "mine",
    name: "mine",
    component: Mine
  },
  {
    path: "physicianVisits",
    name: "physicianVisits",
    component: PhysicianVisits
  }
];
// router
export default [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/",
    // redirect: "/home",
    component: MainLayout,
    meta: {
      requiresAuth: true
    },
    children: menuList
  },
  {
    path: "/login",
    name: "login",
    component: () => import("pages/login")
  },
  {
    path: "/guide",
    name: "guide",
    component: () => import("pages/guide")
  },
  {
    // Always leave this as last one
    path: "*",
    component: () => import("pages/404")
  }
];
