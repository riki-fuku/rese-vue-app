import { defineStore } from 'pinia';
import axios from 'axios';

export const useAreaStore = defineStore('areas', {
    state: () => ({
        areas: [
            {
                id: 0,
                name: 'All area'
            },
        ],
    }),
    actions: {
        async fetchAreas() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/areas');
                this.areas = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        }
    }
});
