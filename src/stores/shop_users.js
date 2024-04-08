import { defineStore } from 'pinia';
import axios from 'axios';

export const useShopUsersStore = defineStore('shop_users', {
    state: () => ({
        shopUserWithShop: {},
        shopUsers: [],
        shopUserWithReservations: [],
    }),
    actions: {
        async fetchShopUsers() {
            try {
                // トークンを取得
                let token = localStorage.getItem('agent_auth_token');

                const response = await axios.get(import.meta.env.VITE_API_URL + '/shop_users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.shopUsers = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        },
        // ログイン中の店舗代表者ユーザーが登録している店舗情報を取得
        async fetchShopUserWithShop() {
            try {
                // トークンを取得
                let token = localStorage.getItem('agent_auth_token');

                const response = await axios.get(import.meta.env.VITE_API_URL + '/shop_user/show/shop', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.shopUserWithShop = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        },
        // ログイン中の店舗代表者の店舗IDより店舗情報を取得
        async fetchReservationsByShopId() {
            try {
                // トークンを取得
                let token = localStorage.getItem('agent_auth_token');

                const response = await axios.get(import.meta.env.VITE_API_URL + '/shop_user/show/reservations', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.shopUserWithReservations = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        },
    }
});
