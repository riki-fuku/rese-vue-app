import { defineStore } from 'pinia';
import axios from 'axios';

export const useShopStore = defineStore('shops', {
    state: () => ({
        shops: [],
    }),
    actions: {
        async fetchShops() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/shops');
                this.shops = response.data;
                console.log(this.shops);
            } catch (error) {
                console.error("API call failed:", error);
            }
        }
    }
});
