import { createRouter, createWebHistory } from 'vue-router'
import UserHome from '@/views/user/UserHome.vue'
import UserStoreDetail from '@/views/user/UserStoreDetail.vue'
import UserMypage from '@/views/user/UserMypage.vue'

const routes = [
  {
    path: '/',
    name: 'UserHome',
    component: UserHome
  },
  {
    path: '/store/:id',
    name: 'UserStoreDetail',
    component: UserStoreDetail
  },
  {
    path: '/mypage',
    name: 'UserMypage',
    component: UserMypage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router