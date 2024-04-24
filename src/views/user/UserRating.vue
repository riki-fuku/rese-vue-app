<template>
    <UserMenu />

    <v-main>
        <v-container fluid width="100%" v-if="loading">
            <v-row class="d-flex justify-center">

                <v-col cols="12" sm="12" lg="5">
                    <div class="right-border-only">
                        <p class="px-10 my-16 text-h3" width="300px">今回のご利用はいかがでしたか？</p>
                        <v-row>
                            <v-col>
                                <v-card class="mx-auto" width="300px">
                                    <v-img :src="shop.image_url" class="" height="200px" contain="false"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                                    </v-img>
                                    <v-card-title>{{ shop.name }}</v-card-title>
                                    <v-card-subtitle class="pb-0">
                                        <v-sheet>
                                            # {{ shop.area.name }}
                                        </v-sheet>
                                        <v-sheet class="ml-2">
                                            # {{ shop.genre.name }}
                                        </v-sheet>
                                    </v-card-subtitle>
                                    <v-card-actions>
                                        <v-btn text class="bg-blue-accent-4">詳細</v-btn>
                                        <v-btn icon :color="shop.favorite ? 'red' : 'gray'">
                                            <v-icon>mdi-heart</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
                <v-col cols="12" sm="12" lg="7" class="px-10">
                    <v-sheet class="rounded transparent-input">
                        <!-- ５段階評価 -->
                        <div>
                            <p class="font-weight-bold">体験を評価してください</p>
                            <v-rating v-model="rating.value" color="blue-accent-4" dense></v-rating>
                            <p class="text-red" v-if="rating.error_message">
                                {{ rating.error_message }}
                            </p>
                        </div>

                        <!-- 口コミを投稿 -->
                        <div>
                            <p class="mt-10 font-weight-bold">口コミを投稿</p>
                            <v-textarea v-model="comment.value" outlined dense maxlength="400"></v-textarea>
                            <p class="text-red" v-if="comment.error_message">
                                {{ comment.error_message }}
                            </p>
                            <div class="text-right text-sm">{{ comment.value.length }}/400(最大文字数)</div>
                        </div>

                        <!-- 画像の追加 -->
                        <div>
                            <p class="mt-10 font-weight-bold">画像の追加</p>

                            <div v-if="image_url !== ''">
                                <p class="text-center">現在の投稿されている画像</p>
                                <v-img :src="image_url" class="mt-3" contain="false" />
                            </div>

                            <div class="mt-5 py-10 text-center" @click="openFilePicker" @dragover.prevent="dragOver"
                                @dragleave="dragLeave" @drop.prevent="handleFileChange"
                                :class="{ 'bg-green-lighten-1': isDragOver, 'bg-white': !isDragOver }">
                                <p class="text-h6">クリックして写真を追加</p>
                                <p>またはドロップアンドドロップ</p>
                                <input type="file" ref="fileInput" style="display: none" accept="image/*"
                                    @change="handleFileChange">
                            </div>

                            <!-- 口コミ更新する場合は注意事項を表示 -->
                            <div v-if="image_url !== ''">
                                <p class="py-2">※すでに画像が投稿されている場合、画像を選択しないで更新すると過去の画像が削除されます。</p>
                            </div>

                            <p v-if="selectedImage.value.name" class="text-h6 text-center py-3">
                                選択中の画像：{{ selectedImage.value.name }}
                            </p>
                            <p class="text-red" v-if="image.error_message">
                                {{ image.error_message }}
                            </p>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>

            <p class="text-red text-center" v-if="errorMessage">
                {{ errorMessage }}
            </p>

            <v-row class="justify-center my-10">
                <v-col cols="auto">
                    <v-btn width="500px" class="rounded-xl" @click="storeRating">
                        口コミを投稿
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>

        <v-container v-else>
            <p class="text-center">Loading...</p>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import UserMenu from '@/components/UserMenu.vue'
import { useShopStore } from '@/stores/shops'
import { useRatingStore } from '@/stores/ratings';
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const shopStore = useShopStore()
const ratingStore = useRatingStore()

const loading = ref(false) // ローディングフラグ
const userId = localStorage.getItem('user_id') // ユーザーID
const shop = ref(null) // 表示する店舗情報
const rating = reactive({ value: '', error_message: '' }) // 評価
const comment = reactive({ value: '', error_message: '' }) // 口コミ
const image = reactive({ value: [], error_message: '' }) // 画像
const image_url = ref('') // 画像URL(更新時に使用)
const fileInput = ref(null);
const selectedImage = reactive({ value: { name: '' } });
const isDragOver = ref(false); // ドラッグオーバーフラグ
const errorMessage = ref('') // エラーメッセージ

// ファイル選択ダイアログを開く
const openFilePicker = () => {
    fileInput.value.click();
};

// ファイル選択時の処理
const handleFileChange = (event) => {
    const files = event.target.files || event.dataTransfer.files;
    const file = files[0];  // 1つのファイルのみ選択可能
    if (file) {
        selectedImage.value = file;
        image.error_message = '';
        dragLeave(event);
    } else {
        selectedImage.value = { name: '' };
    }
};

// 口コミ新規登録
const storeRating = async () => {
    // バリデーション
    if (validateRating()) {
        try {
            const formData = new FormData();
            formData.append('shop_id', route.params.shopId);
            formData.append('user_id', userId);
            formData.append('rating', rating.value);
            formData.append('comment', comment.value);
            formData.append('image', selectedImage.value);

            const response = await axios.post(import.meta.env.VITE_API_URL + '/rating', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // POSTが成功した場合の処理を追加
            if (response.status === 201) {
                // 完了画面に遷移
                router.push({
                    name: 'UserComplete',
                    state: { message: '口コミの登録が完了しました。' }
                });
            } else {
                // POSTが成功したが、レスポンスステータスが異常な場合の処理を行う
                console.error("POST request failed:", response.status);
                errorMessage.value = 'エラーが発生しました';
            }
        } catch (error) {
            console.error("POST request failed:", error);
            errorMessage.value = 'エラーが発生しました';
        }
    }
}

// バリデーション
const validateRating = () => {
    // ５段階評価チェック
    if (rating.value == '') {
        rating.error_message = '評価を入力してください';
        return false;
    } else {
        rating.error_message = '';
    }

    // 口コミチェック
    if (comment.value.length > 400) {
        comment.error_message = '口コミは400文字以下で入力してください';
        return false;
    } else {
        comment.error_message = '';
    }

    // 画像のチェック
    if (!validateImage()) {
        return false;
    }

    return true;
}

// 画像ファイルのバリデーション
const validateImage = () => {
    const file = selectedImage.value;
    const maxSize = 1024 * 1024 * 2; // 2MBまでのみ許可
    const validTypes = ['image/jpeg', 'image/png']; // jpegのみ許可

    if (file.name) {
        if (file.size > maxSize) {
            image.error_message = 'ファイルサイズが大きすぎます。2MB以下のファイルを選択してください。';
            return false;
        } else if (!validTypes.includes(file.type)) {
            image.error_message = '無効なファイルタイプです。JPEGかPNGファイルのみアップロードできます。';
            return false;
        } else {
            image.value = file;
            image.error_message = '';
        }
    } else {
        image.error_message = '';
    }

    return true;
}

// ドラッグオーバー時の処理
const dragOver = (event) => {
    event.preventDefault();
    isDragOver.value = true;
};

// ドラッグリーブ時の処理
const dragLeave = (event) => {
    event.preventDefault();
    isDragOver.value = false;
};

onMounted(async () => {
    // 店舗情報を取得
    await shopStore.fetchShopById(route.params.shopId)
    if (Object.keys(shopStore.shop).length === 0) {
        console.error('shop is not found:', route.params.shopId)
        router.push({ name: 'UserHome' })
        return
    }
    shop.value = shopStore.shop

    // ユーザーの口コミ情報を取得
    await ratingStore.fetchRatingByUserIdAndShopId(userId, route.params.shopId)
    if (Object.keys(ratingStore.rating).length !== 0) {
        rating.value = ratingStore.rating.rating
        comment.value = ratingStore.rating.comment
        image_url.value = ratingStore.rating.image_url
    }

    // ローディングフラグをtrueにする
    loading.value = true
})
</script>

<style scoped>
.search {
    display: flex;
    padding: 0 16px;
    justify-content: flex-end;
}

.v-card-actions {
    justify-content: space-between;
}

.v-card-subtitle {
    display: flex;
    padding: 0 16px;
}

.right-border-only {
    border-right: 1px solid #e0e0e0;
}

@media (max-width: 1263px) {
    .right-border-only {
        border-right: none;
    }
}
</style>