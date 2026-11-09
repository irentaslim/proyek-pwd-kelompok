import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'produk-list',
      component: () => import('../views/ProdukListView.vue')
    },
    {
      path: '/produk/create',
      name: 'produk-create',
      component: () => import('../views/ProdukCreateView.vue')
    },
    {
      path: '/produk/edit/:id',
      name: 'produk-edit',
      component: () => import('../views/ProdukEditView.vue')
    }
  ]
})

export default router