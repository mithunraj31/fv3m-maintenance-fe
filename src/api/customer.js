import request from '@/utils/request'

export function fetchCustomers() {
  return request({
    url: '/customer',
    method: 'get'
  })
}
