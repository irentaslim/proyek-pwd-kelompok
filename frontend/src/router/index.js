import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'buku-list',
      component: () => import('../views/BukuListView.vue')
    },
    {
      path: '/buku/create',
      name: 'buku-create',
      component: () => import('../views/BukuCreateView.vue')
    },
    {
      path: '/buku/edit/:id',
      name: 'buku-edit',
      component: () => import('../views/BukuEditView.vue')
    }
  ]
})

export default router