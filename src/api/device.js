import request from '@/utils/request'

export function fetchDevices() {
  return request({
    url: '/vue-element-admin/devices',
    method: 'get'
  })
}

export function fetchDeviceByCustomerId(customerId) {
  return request({
    url: `/vue-element-admin/customers/${customerId}/devices`,
    method: 'get'
  })
}
