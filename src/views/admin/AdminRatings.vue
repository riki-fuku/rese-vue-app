<template>
    <AdminMenu />

    <v-main>
        <v-container fluid width="100%" v-if="loading">
            <p class="pa-5 text-h5 font-weight-bold">口コミ一覧画面</p>

            <v-sheet class="my-5 px-16 transparent-input">
                <v-row class="border-b">
                    <v-col cols="12" v-for="rating in ratings" :key="rating.id" class="border-t">
                        <p class="text-right underline" @click="deleteRating(rating.id)">口コミを削除</p>
                        <v-rating v-model="rating.rating" color="blue-accent-4" readonly></v-rating>
                        <p>{{ rating.comment }}</p>
                        <v-img v-if="rating.image_url" :src="rating.image_url" class="mt-3" contain="false" />
                    </v-col>
                </v-row>
            </v-sheet>
        </v-container>

        <v-container v-else>
            <p class="text-center">Loading...</p>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminMenu from '@/components/AdminMenu.vue'
import { useRatingStore } from '@/stores/ratings'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const ratingStore = useRatingStore()

const loading = ref(false) // ローディングフラグ
const ratings = ref(null) // 店舗代表者一覧

// 口コミ削除処理
const deleteRating = async (ratingId) => {
    if (confirm(`口コミを削除しますか？`)) {
        try {
            const response = await axios.delete(import.meta.env.VITE_API_URL + `/rating/${ratingId}`);

            // DELETEが成功した場合の処理を追加
            if (response.status === 200) {
                // 口コミ一覧を再取得
                await ratingStore.fetchRatingsByShopId(route.params.shopId)
                ratings.value = ratingStore.ratings
            } else {
                // DELETEが成功したが、レスポンスステータスが異常な場合の処理を行う
                console.error("DELETE request failed:", response.status);
            }
        } catch (error) {
            console.error("DELETE request failed:", error);
        }
    }
}

onMounted(async () => {
    // 店舗の口コミ一覧を取得
    await ratingStore.fetchRatingsByShopId(route.params.shopId)
    ratings.value = ratingStore.ratings

    // ローディングフラグをtrueにする
    loading.value = true
});
</script>

<style scoped>
tr {
    height: 50px;
}
</style>