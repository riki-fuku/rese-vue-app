import { createRouter, createWebHistory } from 'vue-router'
import UserHome from '@/views/user/Home.vue'
import UserStoreDetail from '@/views/user/StoreDetail.vue'
import UserMypage from '@/views/user/Mypage.vue'

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