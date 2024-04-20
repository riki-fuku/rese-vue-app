<template>
    <AgentMenu />

    <v-main>
        <v-container fluid width="100%" v-if="loading">
            <p class="pa-5 text-h5 font-weight-bold">決済用QRコード表示</p>

            <div class="text-center">
                <vue-qrcode :value="url" :options="{ width: 600 }" />
            </div>
        </v-container>

        <v-container v-else>
            <p class="text-center">Loading...</p>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AgentMenu from '@/components/AgentMenu.vue'
import VueQrcode from '@chenfengyuan/vue-qrcode';

const reservationId = localStorage.getItem('agent_shop_id')

const loading = ref(false) // ローディングフラグ

const path = import.meta.env.VITE_APP_URL
const url = `${path}/payment/${reservationId}`

onMounted(async () => {
    // ローディングフラグをtrueにする
    loading.value = true
});
</script>

<style scoped></style>