import request from '@/utils/request'

export function fetchDevices(query) {
  return request({
    url: `/devices?perPage=${query.limit}&page=${query.page}`,
    method: 'get'
  })
}

export function fetchDeviceById(id) {
  return request({
    url: `/devices/${id}`,
    method: 'get'
  })
}

export function fetchDeviceByCustomerId(customerId, query) {
  return request({
    url: `/customers/${customerId}/devices?perPage=${query.limit}&page=${query.page}`,
    method: 'get'
  })
}

export function newDevice(device) {
  const data = {
    name: device.name,
    customer_id: device.customerId,
    status_id: device.status
  }

  return request({
    url: `/devices`,
    method: 'post',
    data
  })
}

export function editDevice(device) {
  const data = {
    id: device.id,
    name: device.name,
    customer_id: device.customerId,
    status_id: device.status
  }

  return request({
    url: `/devices/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteDevice(id) {
  return request({
    url: `/devices/${id}`,
    method: 'delete'
  })
}
