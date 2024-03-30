import { defineStore } from 'pinia';
import axios from 'axios';

export const useShopUsersStore = defineStore('shop_users', {
    state: () => ({
        shopUsers: [],
    }),
    actions: {
        async fetchShopUsers() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/shop_users');
                this.shopUsers = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        }
    }
});
