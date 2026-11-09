import api from './api.js'

export default {
  getAll: () => api.get('/barang'),
  getById: (id) => api.get(`/barang/${id}`),
  create: (data) => api.post('/barang', data),
  update: (id, data) => api.put(`/barang/${id}`, data),
  remove: (id) => api.delete(`/barang/${id}`)
}