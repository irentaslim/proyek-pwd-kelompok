import api from './api.js'

export default {
  getAll: () => api.get('/buku'),
  getById: (id) => api.get(`/buku/${id}`),
  create: (data) => api.post('/buku', data),
  update: (id, data) => api.put(`/buku/${id}`, data),
  remove: (id) => api.delete(`/buku/${id}`)
}