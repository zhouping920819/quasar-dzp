import router from '../../router/index.js';

export default {
  // namespaced: true,
  state: {
    treeList: [],
    nodePath: null,
    currentNode: null,
    treebox: false,
    subCurrPage: '',
    subPages: [],
    // 应用信息
    wgtinfo: {},
    manifest: false
  },
  mutations: {
    SET_CURRENT_NODE(state, code) {
      let treelist = Object.assign([], state.treeList);
      // 修改router的路径
      router.app.$router.replace({
        query: {
          fcode: code
        }
      });
      // 获取当前节点的树路径
      let node_path = (function getPathAndNodeById(id, list) {
        //定义变量保存当前结果路径
        var temppath = [], tmpnode = null;
        try {
          // 递归
          function getNodePath(item) {
            let tmpItem = Object.assign({}, item);
            delete tmpItem.next;
            temppath.push(tmpItem);
            //找到符合条件的节点，通过throw终止掉递归
            if (item.fcode === id) {
              tmpnode = item;
              throw ("GOT IT!");
            }
            if (item.next && item.next.length > 0) {
              for (var i = 0; i < item.next.length; i++) {
                getNodePath(item.next[i]);
              }
              //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
              temppath.pop();
            } else {
              //找到叶子节点时，删除路径当中的该叶子节点
              temppath.pop();
            }
          }
          getNodePath(list);
        } catch (e) {
          // got it
          // console.log(temppath)
        }
        return {
          path: temppath,
          node: tmpnode
        };
      })(code, treelist[0] || {});
      // 当前节点
      state.currentNode = node_path.node;
      // 当前节点路径
      state.nodePath = node_path.path;
    },
    SET_TREE_LIST(state, tree) {
      state.treeList = tree;
    },
    TOGGLE_TREE_BOX(state, b) {
      state.treebox = b ? b : !state.treebox;
    },
    UP_SUB_PAGES(state, args) {
      state.subPages = args
    },
    SET_WGT_INFO(state, info) {
      state.wgtinfo = info;
    },
    SET_MANIFEST(state, data) {
      state.manifest = data
    }
  },
  actions: {
    TreeList({ commit, dispatch }, tree) {
      return new Promise((resolve, reject) => {
        commit('SET_TREE_LIST', tree);
        if (tree[0] && tree[0].next[0]) {
          let cur_node = tree[0].next[0], rt_node = router.app.$route.query;
          commit('SET_CURRENT_NODE', rt_node.fcode ? rt_node.fcode : cur_node.fcode);
        }
        resolve();
      });
    },
    SelectNode({ commit }, node_data) {
      return new Promise((resolve, reject) => {
        commit('SET_CURRENT_NODE', node_data.fcode);
        resolve();
      });
    },
    ToggleTreeBox({ commit }, b) {
      commit('TOGGLE_TREE_BOX', b);
    },
    AddSubPage({ commit, state }, key, isInit) {
      let subPages = state.subPages
      state.subCurrPage = ''
      if(isInit) {
        subPages = []
      }
      subPages.push(key)
      commit('UP_SUB_PAGES', subPages)
    },
    RemoveSubPage({ commit, state }, webViewObject) {
      let subPages = state.subPages.slice(0)
      state.subCurrPage = subPages.pop()
      commit('UP_SUB_PAGES', subPages)
      if(!state.subCurrPage && webViewObject) {
        // 应用退出
        // webViewObject.close('auto')
        if(confirm('确认退出？')){
          plus.runtime.quit();
        }
      }
    },
    CheckVersion({ commit, state }) {
      let wgtVer = state.wgtinfo.version
      // 请求服务器是否需要更新版本
      return new Promise((resolve, reject) => {
        reject({status: 0, note: '无新版本可更新'})
        // resolve({
        //   status: 1,
        //   type: 'wgt',// apk、wgt
        //   version: '2.0.0',
        //   note: '测试数据包更新',
        //   url: 'http://demo.dcloud.net.cn/test/update/H5EF3C469.wgt'
        // })
      })
    },
    wgtinfo({ commit }, wgt_info) {
      commit('SET_WGT_INFO', wgt_info)
    },
    manifest({ commit }, manifest_data) {
      commit('SET_MANIFEST', manifest_data)
    }
  }
}
