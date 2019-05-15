
import request from 'src/utils/request'
import { getBaseUrl } from 'src/utils/auth'

// 统一登陆服务器地址
const LOGIN_SERVER = 'http://rms.groupinno.com/api/register/loginurl'

// 统一登录
export function remoteToLogin(userinfo) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/remote' : LOGIN_SERVER,
    method: 'POST',
    data: userinfo
  })
}

// 登录
export function ajaxLogin(userinfo) {
  let url = '/user/login'
  if(process.env.NODE_ENV !== 'development') {
    let baseURL = getBaseUrl()
    url = baseURL + url
  }
  return request({
    url: url,
    method: 'POST',
    data: userinfo
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/user/userInfo',
    method: 'get'
  })
}
