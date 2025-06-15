import api from './api'

export async function getWasteIntakes() {
  const res = await api.get('/api/v1/waste/intake')
  return res.data
}

export async function addWasteIntake(data: any) {
  const res = await api.post('/api/v1/waste/intake', data)
  return res.data
}

export async function getWasteSortings() {
  const res = await api.get('/api/v1/waste/sorting')
  return res.data
}

export async function addWasteSorting(data: any) {
  const res = await api.post('/api/v1/waste/sorting', data)
  return res.data
} 