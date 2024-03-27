import { defineStore } from 'pinia';
import axios from 'axios';

export const useShopStore = defineStore('shops', {
    state: () => ({
        shop: {},
        shops: [],
    }),
    actions: {
        // 店舗一覧を取得
        async fetchShops() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/shops');
                this.shops = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        },
        // 店舗IDより店舗情報を取得
        async fetchShopById(id) {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/shops/' + id);
                this.shop = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        },
    }
});
