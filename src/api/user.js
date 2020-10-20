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
    url: '/users?perPage=${query.limit}&page=${query.page}',
    method: 'get'
  })
}

export function fetchUserById(userId) {
  return request({
    url: `/users/${userId}`,
    method: 'get'
  })
}

export function newUser(user) {
  const data = {
    name: user.name,
    email: user.email,
    role: user.role,
    password: user.password
  }
  return request({
    url: `/users`,
    method: 'post',
    data
  })
}

export function editUser(user) {
  const data = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    password: user.password
  }

  return request({
    url: `/users/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}

