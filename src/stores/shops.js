import { defineStore } from 'pinia';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const useShopStore = defineStore('shops', {
    state: () => ({
        shop: {},
        shops: [],
    }),
    actions: {
        // 店舗一覧を取得(ログイン中のユーザーのお気に入りも取得)
        async fetchShops() {
            try {
                // トークンを取得
                let token = localStorage.getItem('user_auth_token');

                const response = await axios.get(import.meta.env.VITE_API_URL + '/shops', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.shops = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        },
        // 店舗IDより店舗情報を取得
        async fetchShopById(shopId) {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/shops/' + shopId);
                this.shop = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        },
        // 店舗一覧を取得(対象店舗の口コミ情報も取得)
        async fetchShopsWithReviews() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/shops/ratings');
                this.shops = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        },
    }
});
