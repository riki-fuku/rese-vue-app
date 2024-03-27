import { createRouter, createWebHistory } from 'vue-router'
import UserHome from '@/views/user/UserHome.vue'
import UserShopDetail from '@/views/user/UserShopDetail.vue'
import UserMypage from '@/views/user/UserMypage.vue'
import UserReservationEdit from '@/views/user/UserReservationEdit.vue'
import UserReservationQRCode from '@/views/user/UserReservationQRCode.vue'
import UserPayment from '@/views/user/UserPayment.vue'
import UserComplete from '@/views/user/UserComplete.vue'

const routes = [
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router