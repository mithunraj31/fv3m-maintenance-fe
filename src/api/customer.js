import request from '@/utils/request'

export function fetchCustomers() {
  return request({
    url: '/vue-element-admin/customers',
    method: 'get'
  })
}
