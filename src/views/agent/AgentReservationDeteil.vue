<template>
    <AgentMenu />

    <v-main>
        <v-container fluid width="100%" v-if="loading">
            <p class="pa-5 text-h5 font-weight-bold">予約状況照会</p>

            <v-sheet class="w-75 mx-auto my-15 pa-10 rounded">
                <table class="w-100 border" style="border-collapse: collapse;">
                    <!-- 予約者名 -->
                    <tr>
                        <th class="border bg-grey">予約者名</th>
                        <td class="border text-center">
                            {{ reservation.user.name }}
                        </td>
                    </tr>

                    <!-- 予約時間 -->
                    <tr>
                        <th class="border bg-grey">予約日時</th>
                        <td class="border text-center">
                            {{ reservation.reservation_date }}
                        </td>
                    </tr>

                    <!-- 予約人数 -->
                    <tr>
                        <th class="border bg-grey">予約人数</th>
                        <td class="border text-center">
                            {{ reservation.party_size }}人
                        </td>
                    </tr>

                    <!-- 予約ステータス -->
                    <tr>
                        <th class="border bg-grey">予約ステータス</th>
                        <td class="border text-center">
                            {{ reservation.status_name }}
                        </td>
                    </tr>
                </table>

                <!-- 予約済のみ表示 -->
                <v-btn v-if="reservation.status === '1'" class="d-block my-5 mx-auto bg-teal-lighten-1"
                    @click="updateStatus()">
                    来店済みに更新
                </v-btn>
            </v-sheet>
        </v-container>

        <v-container v-else>
            <p class="text-center">Loading...</p>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AgentMenu from '@/components/AgentMenu.vue'
import { useReservationStore } from '@/stores/reservations'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const reservationStore = useReservationStore()

const loading = ref(false) // ローディングフラグ

const reservation = ref(null)

// 予約ステータスを更新(来店済みに更新)
const updateStatus = async () => {
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/reservation/visited', {
            reservation_id: reservation.value.id
        });

        // POSTが成功した場合の処理を追加
        if (response.status === 200) {
            // 完了画面に遷移
            router.push({
                name: 'AgentComplete',
                state: { message: '来店済みに更新しました。' }
            })
        } else {
            // POSTが成功したが、レスポンスステータスが異常な場合の処理を行う
            console.error("POST request failed:", response.status);
        }
    } catch (error) {
        console.error("POST request failed:", error);
    }
}

onMounted(async () => {
    // 予約情報を取得
    await reservationStore.fetchReservation(route.params.reservationId)
    reservation.value = reservationStore.reservation

    // ローディングフラグをtrueにする
    loading.value = true
});
</script>

<style scoped>
tr {
    height: 50px;
}
</style>