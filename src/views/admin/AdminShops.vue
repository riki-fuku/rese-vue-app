<template>
    <AdminMenu />

    <v-main>
        <v-container fluid width="100%" v-if="loading">
            <p class="pa-5 text-h5 font-weight-bold">店舗一覧画面</p>

            <p class="pa-5 text-h6 font-weight-bold">新規店舗登録(CSVアップロード)</p>

            <v-sheet class="pl-5 transparent-input ml-10 mb-10 mt-2">

                <v-row class="mb-2">
                    <p class="text-red" v-if="errorMessage">
                        {{ errorMessage }}
                    </p>
                </v-row>


                <v-row>
                    <input type="file" accept="text/*" @change="handleFileChange">
                    <v-btn class="my-1 mx-3 bg-blue-accent-4" @click="storeShops()">
                        CSVアップロード
                    </v-btn>
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
import axios from 'axios'

const router = useRouter()
const shopStore = useShopStore()

const loading = ref(false) // ローディングフラグ
const shops = ref(null) // 店舗代表者一覧
const selectedFile = ref(null);
const errorMessage = ref('') // エラーメッセージ

// ファイル選択時の処理
const handleFileChange = (event) => {
    selectedFile.value = event.target.files[0];
};

// 店舗新規登録(CSVアップロード)
const storeShops = async () => {
    // バリデーション
    if (validateCsv()) {
        try {
            const formData = new FormData();
            formData.append('csv', selectedFile.value);

            // トークンを取得
            let token = localStorage.getItem('admin_auth_token');

            const response = await axios.post(import.meta.env.VITE_API_URL + '/shops/store/csv', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            // POSTが成功した場合の処理を追加
            if (response.status === 201) {
                // 完了画面に遷移
                router.push({
                    name: 'AdminComplete',
                    state: { message: '店舗の登録が完了しました。' }
                })
            }
        } catch (error) {
            console.error("POST request:", error);
            errorMessage.value = '店舗の登録に失敗しました: ' + error.response.data.message;
        }
    }
}

// CSVファイルのバリデーション
const validateCsv = () => {
    const file = selectedFile.value;
    const maxSize = 1024 * 1024 * 2; // 2MBまでのみ許可
    const validTypes = ['text/csv']; // CSVのみ許可

    if (file) {
        if (file.size > maxSize) {
            errorMessage.value = 'ファイルサイズが大きすぎます。2MB以下のファイルを選択してください。';
            return false;
        } else if (!validTypes.includes(file.type)) {
            errorMessage.value = '無効なファイルタイプです。CSVファイルのみアップロードできます。';
            return false;
        } else {
            return true;
        }
    } else {
        errorMessage.value = 'CSVファイルを選択してください。';
        return false;
    }
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