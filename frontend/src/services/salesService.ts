import api from './api'

export async function getSales() {
  const res = await api.get('/api/v1/sales')
  return res.data
}

export async function addSale(data: any) {
  const res = await api.post('/api/v1/sales', data)
  return res.data
} 