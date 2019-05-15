import VueI18n from "vue-i18n";
import messages from "src/i18n";

export default ({ app, store, Vue }) => {
  Vue.use(VueI18n);
  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: store.getters.lang || "zh-cn",
    fallbackLocale: "zh-cn",
    messages
  });
  // 切换语言
  Vue.prototype.$changeLang = function(langStr) {
    app.i18n.locale = langStr;
    store.dispatch('changeLang', langStr);
    return langStr
  }
};
