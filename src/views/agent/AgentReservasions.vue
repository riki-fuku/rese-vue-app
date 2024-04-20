<template>
    <AgentMenu />

    <v-main>
        <v-container fluid width="100%" v-if="loading">
            <p class="pa-5 text-h5 font-weight-bold">予約一覧</p>

            <table class="w-100 border" style="border-collapse: collapse;">
                <tr class="bg-teal-lighten-1">
                    <th>予約日</th>
                    <th>予約時間</th>
                    <th>予約者名</th>
                    <th>予約者メールアドレス</th>
                    <th>予約ステータス</th>
                    <th class="w-25">予約詳細</th>
                </tr>
                <tr v-for="shopUserWithReservation in  shopUserWithReservations " :key="shopUserWithReservation.id"
                    :class="shopUserWithReservation.status != 1 ? 'bg-gray' : ''">
                    <td class="border text-center">{{ shopUserWithReservation.reservation_date }}</td>
                    <td class="border text-center">{{ shopUserWithReservation.reservation_time }}</td>
                    <td class="border text-center">{{ shopUserWithReservation.user.name }}</td>
                    <td class="border text-center">{{ shopUserWithReservation.user.email }}</td>
                    <td class="border text-center">{{ shopUserWithReservation.status_name }}</td>
                    <td class="border text-center">
                        <v-btn text :to="`/agent/reservation/${shopUserWithReservation.id}`"
                            class="my-1 mx-3 bg-deep-orange-darken-1">
                            詳細
                        </v-btn>
                    </td>
                </tr>
            </table>
        </v-container>

        <v-container v-else>
            <p class="text-center">Loading...</p>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AgentMenu from '@/components/AgentMenu.vue'
import { useShopUsersStore } from '@/stores/shop_users'

const shopUsersStore = useShopUsersStore()

const loading = ref(false) // ローディングフラグ

const shopUserWithReservations = ref(null)

onMounted(async () => {
    // 予約一覧を取得
    await shopUsersStore.fetchReservationsByShopId()
    shopUserWithReservations.value = shopUsersStore.shopUserWithReservations

    console.log(shopUserWithReservations.value)

    // ローディングフラグをtrueにする
    loading.value = true
});
</script>

<style scoped>
tr {
    height: 50px;
}
</style>