import request from '@/utils/request'
import { getImageUrl } from '@/utils'

export function newMaintenance(maintenance) {
  const data = {
    name: 'No title',
    description: maintenance.description,
    lat: maintenance.lat,
    lng: maintenance.lng,
    imageUrls: maintenance.imageUrls.map(getImageUrl),
    device_id: maintenance.deviceId
  }
  return request({
    url: `/maintenances`,
    method: 'post',
    data
  })
}

export function editMaintenance(maintenance) {
  const data = {
    id: maintenance.id,
    name: 'No title',
    description: maintenance.description,
    lat: maintenance.lat,
    lng: maintenance.lng,
    imageUrls: maintenance.imageUrls.map(getImageUrl)
  }
  return request({
    url: `/maintenances/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteMaintenance(id) {
  return request({
    url: `/maintenances/${id}`,
    method: 'delete'
  })
}

export function fetchMaintenanceById(id) {
  return request({
    url: `/maintenances/${id}`,
    method: 'get'
  })
}
