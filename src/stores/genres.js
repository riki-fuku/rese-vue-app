import { defineStore } from 'pinia';
import axios from 'axios';

export const useGenreStore = defineStore('genres', {
    state: () => ({
        genres: [
            {
                id: 0,
                name: 'All genre'
            },
        ],
    }),
    actions: {
        async fetchGenres() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/genres');
                this.genres = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        }
    }
});
