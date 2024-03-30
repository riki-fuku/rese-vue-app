import { defineStore } from 'pinia';
import axios from 'axios';

export const useReservationStore = defineStore('reservations', {
    state: () => ({
        reservation: {},
        reservations: [],
    }),
    actions: {
        async fetchReservation(reservationId) {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/reservation/' + reservationId);
                this.reservation = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        },
        // ユーザーIDより店舗情報を取得
        async fetchReservationByUserId(userId) {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/reservations/' + userId);
                this.reservations = response.data;
            } catch (error) {
                console.error("API call failed:", error);
            }
        },
    }
});
