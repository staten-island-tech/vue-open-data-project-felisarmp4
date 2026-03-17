import { createRouter, createWebHistory } from 'vue-router'
import business from '@/views/api.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: business,
    },
  ],
})

export default router
