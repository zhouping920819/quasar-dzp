import Vue from "vue";
import Vuex from "vuex";

import app from "./app";
import user from "./user";

import getters from './getters'

let storage = require('src/utils/storage');
let { LANG, LAUCH_FLAG } = require('src/utils/keys');

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    lang: storage.getLocalStorage(LANG) || (navigator.browserLanguage || navigator.language).toLowerCase(),
    theme: "primary",
    lauchFlag: storage.getLocalStorage(LAUCH_FLAG)
  },
  mutations: {
    SET_THEME(state, theme_str) {
      state.theme = theme_str;
    },
    SET_LANG(state, langKey) {
      storage.setLocalStorage(LANG, langKey);
      state.lang = langKey;
    }
  },
  actions: {
    setTheme({commit, state}, theme_str) {
      commit("SET_THEME", theme_str || "dark");
    },
    changeLang({commit, state}, langStr) {
      commit("SET_LANG", langStr);
    },
    setLauchFlag({ commit, state }, b) {
      state.lauchFlag = b
      storage.setLocalStorage(LAUCH_FLAG, b)
    }
  },
  modules: {
    user,
    app
  },
  getters
});

export default store;
