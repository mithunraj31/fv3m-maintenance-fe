import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserInfoKey = 'USER_INFO'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserInfo(userInfo) {
  localStorage.setItem(UserInfoKey, JSON.stringify(userInfo))
}

export function getUserInfo() {
  const userInfo = localStorage.getItem(UserInfoKey)
  return JSON.parse(userInfo)
}

export function removeUserInfo() {
  localStorage.removeItem(UserInfoKey)
}
