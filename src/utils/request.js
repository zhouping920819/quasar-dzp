import axios from 'axios'

import store from 'src/store'
import { getToken, getBaseUrl, setLoginFlag, getLoginFlag } from 'src/utils/auth'

import router from 'src/router/index.js'

import { Notify } from 'quasar'

// 语言字段对应表
const LANG_KEY_MAP = {
  'zh-cn': 'zh_CN',
  'en-us': 'en'
}

const service = axios.create({
  baseURL: '',
  timeout: 120000
})

// Add a request interceptor
service.interceptors.request.use(
  config => {
    // 当自动请求时，重置baseurl
    config.baseURL = process.env.NODE_ENV === 'development' ? '/api/v2' : getBaseUrl()
    if (!config.headers['token']) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['token'] = getToken()
    }
    // 携带语言指令
    config.headers['lang'] = LANG_KEY_MAP[store.getters.lang] || 'zh_CN';
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// Add a response interceptor
service.interceptors.response.use(
  async response => {
    let data = response.data, xhr_config = response.config
    // 请求不成功返回，或没有数据
    if(data.code !== 0 && data.code !== 20001){
      // 访问受限
      if(data.code === 40004) {
        try {
          // 自动登录
          let res_login = await store.dispatch('UserLogin')
          if(res_login.code === 20001) {
            xhr_config['baseURL'] = ''
            xhr_config.headers['token'] = res_login.data.token
            // 重新发送请求
            let re_res = await axios(xhr_config)
            return re_res
          } else {
            throw new Error({
              msg: '授权登录失败，需要重新登录'
            })
          }
        } catch(err) {
          Notify.create({
            message: '授权失败，请重新登录',
            type: 'warning',
            timeout: 500,
            position: 'center'
          })
          setLoginFlag(false)
          // 进入登陆界面
          router.replace({
            name: 'login'
          })
          return Promise.reject(data)
        }
      }
      return Promise.reject(data)
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service