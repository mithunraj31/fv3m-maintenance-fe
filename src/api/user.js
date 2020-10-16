import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function fetchUsers() {
  return request({
    url: '/vue-element-admin/users',
    method: 'get'
  })
}

export function fetchUserById(userId) {
  console.log(`/vue-element-admin/users/${userId}`)
  return request({
    url: `/vue-element-admin/users/${userId}`,
    method: 'get'
  })
}
