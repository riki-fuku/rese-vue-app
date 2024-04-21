import { defineStore } from 'pinia';
import axios from 'axios';

export const useRatingStore = defineStore('ratings', {
    state: () => ({
        rating: {},
        ratings: [],
    }),
    actions: {
        async fetchRatingByUserIdAndShopId(userId, shopId) {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/ratings/user/' + userId + '/' + shopId);
                this.rating = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        },
        async fetchRatingsByShopId(shopId) {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/ratings/' + shopId);
                this.ratings = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        }
    }
});
