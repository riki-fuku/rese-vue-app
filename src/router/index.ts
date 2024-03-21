import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/user/Home.vue'
import StoreDetail from '@/views/user/StoreDetail.vue'
import Mypage from '@/views/user/Mypage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/store/:id',
    name: 'StoreDetail',
    component: StoreDetail
  },
  {
    path: '/mypage',
    name: 'Mypage',
    component: Mypage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router