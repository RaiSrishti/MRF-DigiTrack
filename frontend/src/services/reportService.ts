import api from './api'
 
export async function getReport(params: { startDate: string; endDate: string; wasteType?: string }) {
  const res = await api.get('/api/v1/reports', { params })
  return res.data
} 