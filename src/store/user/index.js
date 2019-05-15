
let { ajaxLogin, remoteToLogin, getUserInfo }  = require('src/api/login');
let { setToken, getToken, getLoginFlag } = require('src/utils/auth');

let storage = require('src/utils/storage');
let { DATA_SERVER_URL, USER_LOGIN_INFO, USER_INFO, CAN_LOGIN_FLAG } = require('src/utils/keys');

export default {
  // namespaced: true,
  state: {
    isLoginFlag: getLoginFlag(),
    userinfo: storage.getSessionStorage(USER_INFO),
    token: getToken()
  },
  mutations: {
    SET_USER_INFO(state, returninfo) {
      state.userinfo = returninfo;
      storage.setSessionStorage(USER_INFO, returninfo)
    },
    SET_TOKEN(state, token) {
      setToken(token);
      state.token = token;
    },
    SET_IS_LOGIN_FLAG(state, b) {
      storage.setLocalStorage(CAN_LOGIN_FLAG, b);
      state.isLoginFlag = b
    },
    CLEAN_ALL(state) {
      storage.clearnLocalStorage();
      storage.clearnSessionStorage();
      state.token = ''
      state.userinfo = false
    }
  },
  actions: {
    // 远程统一登录
    RemoteLogin({ commit }, userlogininfo) {
      return new Promise((resolve, reject) => {
        remoteToLogin(userlogininfo).then(res => {
          console.log(res)
        }).catch(e_rt => {
          // 登录成功返回token，数据请求的url
          if(e_rt.retUrl && e_rt.token) {
            e_rt.retUrl += '/v2';// url版本
            storage.setLocalStorage(DATA_SERVER_URL, e_rt.retUrl);// 真实请求数据url
            storage.setLocalStorage(USER_LOGIN_INFO, userlogininfo);// 用于自动登录数据
            commit('SET_IS_LOGIN_FLAG', true);
            commit('SET_TOKEN', e_rt.token);
            // 统一登录成功后，获取用户信息
            getUserInfo().then(res => {
              commit('SET_USER_INFO', res.data);
              resolve(e_rt)
            }).catch(r => {
              reject(r)
            })
          } else {
            reject(e_rt)
          }
          
        });
      });
    },
    // 登录
    UserLogin({ commit }) {
      let userlogininfo = storage.getLocalStorage(USER_LOGIN_INFO);
      return new Promise((resolve, reject) => {
        ajaxLogin({
          username: userlogininfo.userName,
          password: userlogininfo.passwd
        }).then((result) => {
          // 存储
          commit('SET_USER_INFO', result.data);
          commit('SET_TOKEN', result.data.token);
          // 回调值
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 退出
    UserLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('CLEAN_ALL')
        resolve()
      });
    }
  }
}
