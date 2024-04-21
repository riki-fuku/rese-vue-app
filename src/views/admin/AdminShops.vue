<template>
    <AdminMenu />

    <v-main>
        <v-container fluid width="100%" v-if="loading">
            <p class="pa-5 text-h5 font-weight-bold">店舗一覧画面</p>

            <p class="pa-5 text-h6 font-weight-bold">新規店舗登録(CSVアップロード)</p>

            <v-sheet class="pl-5 transparent-input">
                <v-row>
                    <v-col cols="12" md="6">
                        <v-file-input v-model="file" accept=".csv" label="CSVファイルを選択" outlined
                            @change="handleFileUpload"></v-file-input>
                    </v-col>
                    <!-- <v-col cols="12" md="6">
                        <v-btn class="mx-3 bg-deep-orange-darken-1" @click="submitCsv">新規登録</v-btn>
                    </v-col> -->
                </v-row>
            </v-sheet>

            <p class="pa-5 text-h6 font-weight-bold">店舗一覧</p>

            <table class="w-100 border mb-5" style="border-collapse: collapse;">
                <tr class="bg-orange-accent-1">
                    <th>店舗名</th>
                    <th>地域</th>
                    <th>ジャンル</th>
                    <th>口コミ数</th>
                    <th class="w-25">アクション</th>
                </tr>
                <tr v-for="shop in shops" :key="shop.id">
                    <td class="border text-center">
                        {{ shop.name }}
                    </td>
                    <td class="border text-center">{{ shop.area.name }}</td>
                    <td class="border text-center">{{ shop.genre.name }}</td>
                    <td class="border text-center">{{ shop.ratings.length }}件</td>
                    <td class="border text-center">
                        <v-btn class="my-1 mx-3 bg-deep-orange-darken-1" @click="redirectToRatings(shop.id)">
                            口コミ一覧画面
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
import AdminMenu from '@/components/AdminMenu.vue'
import { useShopStore } from '@/stores/shops'
import { useRouter } from 'vue-router'

const router = useRouter()

const shopStore = useShopStore()

const loading = ref(false) // ローディングフラグ

const shops = ref(null) // 店舗代表者一覧

const file = ref(null) // CSVファイル

// CSVドラックアンドドロップ
const handleFileUpload = (e) => {
    file.value = e.target.files[0]
}

// 口コミ画面に遷移する
const redirectToRatings = (shopId) => {
    router.push({ name: 'AdminRatings', params: { shopId: shopId } })
}

onMounted(async () => {
    // 店舗一覧を取得
    await shopStore.fetchShopsWithReviews()
    shops.value = shopStore.shops

    // ローディングフラグをtrueにする
    loading.value = true
});
</script>

<style scoped>
tr {
    height: 50px;
}
</style>