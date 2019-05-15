export default {
  lang: state => state.lang,
  lauchFlag: state => state.lauchFlag,
  wgtinfo: state => state.app.wgtinfo,
  manifest: state => state.app.manifest,
  isLoginFlag: state => state.user.isLoginFlag,
  token: state => state.user.token,
  userinfo: state => state.user.userinfo,
  currentNode: state => state.app.currentNode,
  treeList: state => state.app.treeList,
  nodePath: state => state.app.nodePath,
  treebox: state => state.app.treebox,
  subCurrPage: state => state.app.subCurrPage
}