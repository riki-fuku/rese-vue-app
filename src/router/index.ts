import { createRouter, createWebHistory } from 'vue-router'

// 一般ユーザー
import UserHome from '@/views/user/UserHome.vue'
import UserShopDetail from '@/views/user/UserShopDetail.vue'
import UserMypage from '@/views/user/UserMypage.vue'
import UserReservationEdit from '@/views/user/UserReservationEdit.vue'
import UserReservationQRCode from '@/views/user/UserReservationQRCode.vue'
import UserPayment from '@/views/user/UserPayment.vue'
import UserComplete from '@/views/user/UserComplete.vue'

// 管理者
import AdminHome from '@/views/admin/AdminHome.vue'
import AdminAgents from '@/views/admin/AdminAgents.vue'
import AdminMail from '@/views/admin/AdminMail.vue'
import AdminComplete from '@/views/admin/AdminComplete.vue'

const routes = [
  // 一般ユーザー画面
  {
    path: '/',
    name: 'UserHome',
    component: UserHome
  },
    {
    path: '/mypage',
    name: 'UserMypage',
    component: UserMypage
  },
  {
    path: '/shop/:id',
    name: 'UserShopDetail',
    component: UserShopDetail
  },
  {
    path: '/reservation/:reservationId',
    name: 'UserReservationEdit',
    component: UserReservationEdit
  },
  {
    path: '/reservation/qrcode/:reservationId',
    name: 'UserReservationQRCode',
    component: UserReservationQRCode
  },
  {
    path: '/payment/:shopId',
    name: 'UserPayment',
    component: UserPayment
  },
  {
    path: '/complete',
    name: 'UserComplete',
    component: UserComplete
  },

  // 管理者画面
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome
  },
  {
    path: '/admin/agents',
    name: 'AdminAgents',
    component: AdminAgents
  },
  {
    path: '/admin/mail',
    name: 'AdminMail',
    component: AdminMail
  },
  {
    path: '/admin/complete',
    name: 'AdminComplete',
    component: AdminComplete
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router