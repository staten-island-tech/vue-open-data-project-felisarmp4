import { createRouter, createWebHistory } from 'vue-router'
import business from '@/views/api.vue'
import chart from '@/views/chart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: business,
    },
    {
      path: '/chart',
      name: 'chart',
      component: chart,
    },
  ],
})

export default router
