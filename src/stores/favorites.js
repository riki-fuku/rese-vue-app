import { defineStore } from 'pinia';
import axios from 'axios';

export const useFavoriteStore = defineStore('favorites', {
    state: () => ({
        favorites: [],
    }),
    actions: {
        // 店舗IDより店舗情報を取得
        async fetchFavoriteByUserId(userId) {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/favorites/' + userId);
                this.favorites = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        },
    }
});
