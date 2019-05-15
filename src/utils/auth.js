// 
import * as storage from './storage'
import { TOKEN_KEY, DATA_SERVER_URL, CAN_LOGIN_FLAG } from './keys'

export function getBaseUrl() {
  return storage.getLocalStorage(DATA_SERVER_URL)
}

export function getToken() {
  return storage.getSessionStorage(TOKEN_KEY)
}

export function setToken(token) {
  storage.setSessionStorage(TOKEN_KEY, token)
}

export function setLoginFlag(b) {
  storage.setLocalStorage(CAN_LOGIN_FLAG, b)
}

export function getLoginFlag() {
  return storage.getLocalStorage(CAN_LOGIN_FLAG)
}

