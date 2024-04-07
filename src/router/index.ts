import { createRouter, createWebHistory } from 'vue-router'

// 一般ユーザー
import UserLogin from '@/views/user/UserLogin.vue'
import UserRegistration from '@/views/user/UserRegistration.vue'
import UserHome from '@/views/user/UserHome.vue'
import UserShopDetail from '@/views/user/UserShopDetail.vue'
import UserMypage from '@/views/user/UserMypage.vue'
import UserReservationEdit from '@/views/user/UserReservationEdit.vue'
import UserReservationQRCode from '@/views/user/UserReservationQRCode.vue'
import UserPayment from '@/views/user/UserPayment.vue'
import UserComplete from '@/views/user/UserComplete.vue'

// 店舗代表者
import AgentLogin from '@/views/agent/AgentLogin.vue'
import AgentHome from '@/views/agent/AgentHome.vue'
import AgentMail from '@/views/agent/AgentMail.vue'
import AgentComplete from '@/views/agent/AgentComplete.vue'
import AgentPaymentQRCode from '@/views/agent/AgentPaymentQRCode.vue'
import AgentReservasions from '@/views/agent/AgentReservasions.vue'
import AgentReservationDeteil from '@/views/agent/AgentReservationDeteil.vue'
import AgentShopCreation from '@/views/agent/AgentShopCreation.vue'
import AgentShopEdit from '@/views/agent/AgentShopEdit.vue'

// 管理者
import AdminLogin from '@/views/admin/AdminLogin.vue'
import AdminHome from '@/views/admin/AdminHome.vue'
import AdminAgents from '@/views/admin/AdminAgents.vue'
import AdminMail from '@/views/admin/AdminMail.vue'
import AdminComplete from '@/views/admin/AdminComplete.vue'

const routes = [
    // 一般ユーザー画面
    {
        path: '/login',
        name: 'UserLogin',
        component: UserLogin
    },
    {
        path: '/registration',
        name: 'UserRegistration',
        component: UserRegistration
    },
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
        path: '/shop/:shopId',
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

    // 店舗代表者画面
    {
        path: '/agent/login',
        name: 'AgentLogin',
        component: AgentLogin
    },
    {
        path: '/agent',
        name: 'AgentHome',
        component: AgentHome
    },
    {
        path: '/agent/mail',
        name: 'AgentMail',
        component: AgentMail
    },
    {
        path: '/agent/payment/qrcode',
        name: 'AgentPaymentQRCode',
        component: AgentPaymentQRCode
    },
    {
        path: '/agent/reservations',
        name: 'AgentReservasions',
        component: AgentReservasions
    },
    {
        path: '/agent/reservation/:reservationId',
        name: 'AgentReservationDeteil',
        component: AgentReservationDeteil
    },
    {
        path: '/agent/shop/creation',
        name: 'AgentShopCreation',
        component: AgentShopCreation
    },
    {
        path: '/agent/shop/edit',
        name: 'AgentShopEdit',
        component: AgentShopEdit
    },
        {
        path: '/agent/complete',
        name: 'AgentComplete',
        component: AgentComplete
    },

    // 管理者画面
    {
        path: '/admin/login',
        name: 'AdminLogin',
        component: AdminLogin
    },
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