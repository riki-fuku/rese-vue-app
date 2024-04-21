import { createRouter, createWebHistory } from 'vue-router'

// 一般ユーザー
import UserLogin from '@/views/user/UserLogin.vue'
import UserRegistration from '@/views/user/UserRegistration.vue'
import UserVerifyEmail from '@/views/user/UserVerifyEmail.vue'
import UserHome from '@/views/user/UserHome.vue'
import UserShopDetail from '@/views/user/UserShopDetail.vue'
import UserMypage from '@/views/user/UserMypage.vue'
import UserReservationEdit from '@/views/user/UserReservationEdit.vue'
import UserReservationQRCode from '@/views/user/UserReservationQRCode.vue'
import UserPayment from '@/views/user/UserPayment.vue'
import UserComplete from '@/views/user/UserComplete.vue'
import UserRating from '@/views/user/UserRating.vue'

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
import AdminRatings from '@/views/admin/AdminRatings.vue'
import AdminShops from '@/views/admin/AdminShops.vue'

// 一般ユーザーログイン確認
function isUserAuthenticated() {
    // localStorageにuser_auth_tokenが存在するかチェック
    return !!localStorage.getItem('user_auth_token');
}

// 店舗代表者ログイン確認
function isAgentAuthenticated() {
    // localStorageにagent_auth_tokenが存在するかチェック
    return !!localStorage.getItem('agent_auth_token');
}

// 管理者ログイン確認
function isAdminAuthenticated() {
    // localStorageにadmin_auth_tokenが存在するかチェック
    return !!localStorage.getItem('admin_auth_token');
}

const routes = [
    // 一般ユーザー画面
    {
        path: '/login',
        name: 'UserLogin',
        component: UserLogin,
        meta: { isUserLogin: true }
    },
    {
        path: '/registration',
        name: 'UserRegistration',
        component: UserRegistration,
        meta: { isUserLogin: true }
    },
    {
        path: '/verify-email',
        name: 'UserVerifyEmail',
        component: UserVerifyEmail,
        meta: { isUserLogin: true }
    },
    {
        path: '/',
        name: 'UserHome',
        component: UserHome,
        meta: { requiresUserAuth: true }
    },
    {
        path: '/mypage',
        name: 'UserMypage',
        component: UserMypage,
        meta: { requiresUserAuth: true }
    },
    {
        path: '/shop/:shopId',
        name: 'UserShopDetail',
        component: UserShopDetail,
        meta: { requiresUserAuth: true }
    },
    {
        path: '/reservation/:reservationId',
        name: 'UserReservationEdit',
        component: UserReservationEdit,
        meta: { requiresUserAuth: true }
    },
    {
        path: '/reservation/qrcode/:reservationId',
        name: 'UserReservationQRCode',
        component: UserReservationQRCode,
        meta: { requiresUserAuth: true }
    },
    {
        path: '/payment/:shopId',
        name: 'UserPayment',
        component: UserPayment,
        meta: { requiresUserAuth: true }
    },
    {
        path: '/rating/:shopId',
        name: 'UserRating',
        component: UserRating,
        meta: { requiresUserAuth: true }
    },
    {
        path: '/complete',
        name: 'UserComplete',
        component: UserComplete,
        meta: { requiresUserAuth: true }
    },

    // 店舗代表者画面
    {
        path: '/agent/login',
        name: 'AgentLogin',
        component: AgentLogin,
        meta: { isAgentLogin: true }
    },
    {
        path: '/agent',
        name: 'AgentHome',
        component: AgentHome,
        meta: { requiresAgentAuth: true }
    },
    {
        path: '/agent/mail',
        name: 'AgentMail',
        component: AgentMail,
        meta: { requiresAgentAuth: true }
    },
    {
        path: '/agent/payment/qrcode',
        name: 'AgentPaymentQRCode',
        component: AgentPaymentQRCode,
        meta: { requiresAgentAuth: true }
    },
    {
        path: '/agent/reservations',
        name: 'AgentReservasions',
        component: AgentReservasions,
        meta: { requiresAgentAuth: true }
    },
    {
        path: '/agent/reservation/:reservationId',
        name: 'AgentReservationDeteil',
        component: AgentReservationDeteil,
        meta: { requiresAgentAuth: true }
    },
    {
        path: '/agent/shop/creation',
        name: 'AgentShopCreation',
        component: AgentShopCreation,
        meta: { requiresAgentAuth: true }
    },
    {
        path: '/agent/shop/edit',
        name: 'AgentShopEdit',
        component: AgentShopEdit,
        meta: { requiresAgentAuth: true }
    },
        {
        path: '/agent/complete',
        name: 'AgentComplete',
        component: AgentComplete,
        meta: { requiresAgentAuth: true }
    },

    // 管理者画面
    {
        path: '/admin/login',
        name: 'AdminLogin',
        component: AdminLogin,
        meta: { isAdminLogin: true }
    },
    {
        path: '/admin',
        name: 'AdminHome',
        component: AdminHome,
        meta: { requiresAdminAuth: true }
    },
    {
        path: '/admin/agents',
        name: 'AdminAgents',
        component: AdminAgents,
        meta: { requiresAdminAuth: true }
    },
    {
        path: '/admin/mail',
        name: 'AdminMail',
        component: AdminMail,
        meta: { requiresAdminAuth: true }
    },
    {
        path: '/admin/ratings/:shopId',
        name: 'AdminRatings',
        component: AdminRatings,
        meta: { requiresAdminAuth: true }
    },
    {
        path: '/admin/shops',
        name: 'AdminShops',
        component: AdminShops,
        meta: { requiresAdminAuth: true }
    },
    {
        path: '/admin/complete',
        name: 'AdminComplete',
        component: AdminComplete,
        meta: { requiresAdminAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.isUserLogin) && isUserAuthenticated()) {
        // ユーザーログイン画面にアクセスしようとした際、ログイン済みの場合はユーザーホーム画面にリダイレクト
        next({ name: 'UserHome' });
    } else if (to.matched.some(record => record.meta.isAgentLogin) && isAgentAuthenticated()) {
        // 店舗代表者ログイン画面にアクセスしようとした際、ログイン済みの場合は店舗代表者ホーム画面にリダイレクト
        next({ name: 'AgentHome' });
    } else if (to.matched.some(record => record.meta.isAdminLogin) && isAdminAuthenticated()) {
        // 管理者ログイン画面にアクセスしようとした際、ログイン済みの場合は管理者ホーム画面にリダイレクト
        next({ name: 'AdminHome' });
    } else if (to.matched.some(record => record.meta.requiresUserAuth) && !isUserAuthenticated()) {
        // ユーザーログインが必要な画面にアクセスしようとした際、未ログインの場合はユーザーログイン画面にリダイレクト
        next({ name: 'UserLogin' });
    } else if (to.matched.some(record => record.meta.requiresAgentAuth) && !isAgentAuthenticated()) {
        // 店舗代表者ログインが必要な画面にアクセスしようとした際、未ログインの場合は店舗代表者ログイン画面にリダイレクト
        next({ name: 'AgentLogin' });
    } else if (to.matched.some(record => record.meta.requiresAdminAuth) && !isAdminAuthenticated()) {
        // 管理者ログインが必要な画面にアクセスしようとした際、未ログインの場合は管理者ログイン画面にリダイレクト
        next({ name: 'AdminLogin' });
    } else {
        next();
    }
});

export default router