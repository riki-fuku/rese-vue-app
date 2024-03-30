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
                const response = await axios.get(import.meta.env.VITE_API_URL + '/shop_users');
                this.shopUsers = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        },
        // ログイン中の店舗代表者ユーザーが登録している店舗情報を取得
        async fetchShopUserWithShop() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/shop_user/show/shop');
                this.shopUserWithShop = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        },
        // ログイン中の店舗代表者の店舗IDより店舗情報を取得
        async fetchReservationsByShopId() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/shop_user/show/reservations');
                this.shopUserWithReservations = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        },
    }
});
