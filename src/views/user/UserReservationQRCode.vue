<template>
    <UserMenu></UserMenu>

    <v-main color="gray-lighten-2">
        <v-container fluid width="100%" v-if="loading">
            <p class="pa-5 text-h4">来店確認用QR</p>
            <div class="text-center">
                <vue-qrcode :value="path" :options="{ width: 600 }" />
            </div>
        </v-container>

        <v-container v-else>
            <p class="text-center">Loading...</p>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserMenu from '@/components/UserMenu.vue'
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const reservationId = route.params.reservationId

const loading = ref(false) // ローディングフラグ

const router = useRouter()
const path = route.query.page // TODO::URLの取得方法検討
console.log(path)


onMounted(() => {
    loading.value = true
})

</script>

<style scoped></style>