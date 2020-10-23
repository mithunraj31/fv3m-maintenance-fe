import request from '@/utils/request'

export function fetchCustomers(query) {
  return request({
    url: `/customers?perPage=${query.limit}&page=${query.page}`,
    method: 'get'
  })
}

export function fetchCustomerById(customerId) {
  return request({
    url: `/customers/${customerId}`,
    method: 'get'
  })
}

export function newCustomer(customer) {
  const data = {
    name: customer.name,
    description: customer.description,
    furigana: customer.furigana
  }
  return request({
    url: `/customers`,
    method: 'post',
    data
  })
}

export function editCustomer(customer) {
  const data = {
    id: customer.id,
    name: customer.name,
    description: customer.description,
    furigana: customer.furigana
  }

  return request({
    url: `/customers/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteCustomer(id) {
  return request({
    url: `/customers/${id}`,
    method: 'delete'
  })
}

