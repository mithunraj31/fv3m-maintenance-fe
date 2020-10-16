import request from '@/utils/request'

export function fetchCustomers() {
  return request({
    url: '/customers',
    method: 'get'
  })
}
