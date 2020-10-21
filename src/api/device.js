import request from '@/utils/request'
import * as moment from 'moment'

export function fetchDevices(query, cancelToken = null) {
  let url = `/devices?perPage=${query.limit}&page=${query.page}`

  if (query.freeTextSearch && query.freeTextSearch) {
    url += `&search=${query.freeTextSearch}`
  }

  return request({
    url,
    method: 'get',
    cancelToken
  })
}

export function fetchDeviceById(id) {
  return request({
    url: `/devices/${id}`,
    method: 'get'
  })
}

export function fetchDeviceByCustomerId(customerId, query, cancelToken = null) {
  let url = `/customers/${customerId}/devices?perPage=${query.limit}&page=${query.page}`

  if (query.freeTextSearch && query.freeTextSearch) {
    url += `&search=${query.freeTextSearch}`
  }

  return request({
    url,
    method: 'get',
    cancelToken
  })
}

export function newDevice(device) {
  const data = {
    name: device.name,
    customer_id: device.customerId,
    status_id: device.status,
    imageUrls: device.imageUrls.map(x => x.url),
    serial_number: device.serialNumber,
    regist_date: moment(device.registerDate).format('YYYY-MM-DD'),
    mutated_date: moment(device.mutatedDate).format('YYYY-MM-DD'),
    os: device.os,
    description: device.description
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
    status_id: device.status,
    imageUrls: device.imageUrls.map(x => x.url),
    serial_number: device.serialNumber,
    regist_date: moment(device.registerDate).format('YYYY-MM-DD'),
    mutated_date: moment(device.mutatedDate).format('YYYY-MM-DD'),
    os: device.os,
    description: device.description
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

export function fetchMaintenanceHistoryByDeviceId(id, query) {
  return request({
    url: `/devices/${id}/maintenances?perPage=${query.limit}&page=${query.page}&order=${query.order}`,
    method: 'get'
  })
}

export function fetechMemoByMaintenaceId(mentenanceId, amount = 1000) {
  return request({
    url: `/maintenances/${mentenanceId}/memos?perPage=${amount}&order=newest`,
    method: 'get'
  })
}

export function newMemo(memo) {
  const data = {
    name: memo.description, // temp value TODO: pongpeera
    maintenance_id: memo.maintenanceId,
    description: memo.description,
    imageUrls: memo.imageUrls.map(x => x.url)
  }

  return request({
    url: `/memos`,
    method: 'post',
    data
  })
}

export function editMemo(memo) {
  const data = {
    id: memo.id,
    name: memo.description, // temp value TODO: pongpeera
    maintenance_id: memo.maintenanceId,
    description: memo.description,
    imageUrls: memo.imageUrls.map(x => x.url)
  }

  return request({
    url: `/memos/${data.id}`,
    method: 'put',
    data
  })
}

export function fetchMemoById(id) {
  return request({
    url: `/memos/${id}`,
    method: 'get'
  })
}

export function deleteMemo(id) {
  return request({
    url: `/memos/${id}`,
    method: 'delete'
  })
}

