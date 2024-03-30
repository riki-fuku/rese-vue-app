import { defineStore } from 'pinia';
import axios from 'axios';

export const useEmaiTtemplatesStore = defineStore('email_templates', {
    state: () => ({
        emaiTtemplates: [],
    }),
    actions: {
        async fetchEmaiTtemplates(userType) {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/email_templates/1');
                this.emaiTtemplates = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        }
    }
});
