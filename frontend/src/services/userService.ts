import api from './api'

export async function getUsers() {
  const res = await api.get('/api/v1/users')
  return res.data
}

export async function addUser(data: any) {
  const res = await api.post('/api/v1/users', data)
  return res.data
} 