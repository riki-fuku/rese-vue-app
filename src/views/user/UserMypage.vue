<template>
    <UserMenu />

    <v-main>
        <v-container fluid width="100%" v-if="loading">

            <!-- ユーザー名表示部分 -->
            <v-sheet class="ml-auto" width="50%">
                <p class="pa-5 text-h5 font-weight-bold" width="50%">{{ userName }}</p>
            </v-sheet>

            <v-row class="d-flex">

                <!-- 予約一覧表示部分 -->
                <v-col cols="12" sm="12" lg="6">
                    <p class="pa-5 text-h5 font-weight-bold">予約</p>
                    <v-sheet class="rounded" v-for="(reservation, reservationKey) in reservations" :key="reservation.id"
                        :class="{ 'bg-blue-accent-4': reservation.status === '1', 'bg-red': reservation.status === '2', 'bg-green': reservation.status === '3' }">
                        <div class="pa-5 d-flex">
                            <v-icon>mdi-clock</v-icon>
                            <p class="ml-2">予約{{ reservationKey + 1 }} ({{ reservation.status_name }})</p>
                            <div class="ml-auto">
                                <!-- 予約済のみ表示 -->
                                <div :class="{ 'd-none': reservation.status !== '1' }">
                                    <!-- QRコード提示 -->
                                    <a :href="`/reservation/qrcode/${reservation.id}`" class="text-white">
                                        <v-icon>mdi-qrcode</v-icon>
                                    </a>

                                    <!-- 編集 -->
                                    <a :href="`/reservation/${reservation.id}`" class="text-white ml-2">
                                        <v-icon>mdi-file-edit-outline</v-icon>
                                    </a>


                                    <!-- 削除 -->
                                    <v-icon class=" ml-2"
                                        @click="deleteReservationShop(reservation.id, reservation.shop.name)">
                                        mdi-close-circle-outline
                                    </v-icon>
                                </div>

                                <!-- 決済完了のみ表示 -->
                                <div :class="{ 'd-none': reservation.status !== '3' }">
                                    <v-icon class=" ml-2" @click="openRating(reservation.id, reservation.shop_id)">
                                        mdi-message-draw
                                    </v-icon>
                                </div>
                            </div>
                        </div>
                        <div class="my-4 mx-5 pa-5">
                            <table>
                                <tr>
                                    <th class="text-left py-3">Shop</th>
                                    <td>{{ reservation.shop.name }}</td>
                                </tr>
                                <tr>
                                    <th class="text-left  py-3">Date</th>
                                    <td>{{ reservation.reservation_date }}</td>
                                </tr>
                                <tr>
                                    <th class="text-left  py-3">Time</th>
                                    <td>{{ reservation.reservation_time.slice(0, 5) }}</td>
                                </tr>
                                <tr>
                                    <th class="text-left  py-3">Number</th>
                                    <td>{{ reservation.party_size }}人</td>
                                </tr>
                            </table>
                        </div>
                    </v-sheet>
                </v-col>

                <!-- お気に入り一覧 -->
                <v-col cols="12" sm="12" lg="6">
                    <p class="pa-5 text-h5 font-weight-bold">お気に入り店舗</p>
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" v-for="favorite in favorites" :key="favorite.id">
                            <v-card>
                                <v-img :src="favorite.shop.image_url" class="" height="200px" contain="false"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                                </v-img>
                                <v-card-title>{{ favorite.shop.name }}</v-card-title>
                                <v-card-subtitle class="pb-0">
                                    <v-sheet>
                                        # {{ favorite.shop.area.name }}
                                    </v-sheet>
                                    <v-sheet class="ml-2">
                                        # {{ favorite.shop.genre.name }}
                                    </v-sheet>
                                </v-card-subtitle>
                                <v-card-actions>
                                    <v-btn text :to="`/shop/${favorite.shop.id}`" class="bg-blue-accent-4">詳細</v-btn>
                                    <v-btn icon :color="favorite ? 'red' : 'gray'">
                                        <v-icon @click="toggleFavorite(favorite.shop.id)">mdi-heart</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>

            </v-row>

            <!-- 評価モーダル -->
            <v-dialog v-model="showModal" class="w-50">
                <v-card>
                    <v-card-title class="headline">評価</v-card-title>
                    <v-card-text class="text-center text-h4">
                        <v-rating v-model="rating" color="amber" dense></v-rating>
                    </v-card-text>
                    <v-card-text>
                        <v-textarea v-model="comment" label="コメント" rows="3"></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="showModal = false">キャンセル</v-btn>
                        <v-btn color="blue darken-1" text @click="postRating()">送信</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- 評価モーダル -->

        </v-container>

        <v-container v-else>
            <p class="text-center">Loading...</p>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserMenu from '@/components/UserMenu.vue'
import { useReservationStore } from '@/stores/reservations'
import { useFavoriteStore } from '@/stores/favorites'
import axios from 'axios'

const reservationStore = useReservationStore()
const favoriteStore = useFavoriteStore()

const loading = ref(false) // ローディングフラグ
const userId = localStorage.getItem('user_id') // ユーザーID
const userName = localStorage.getItem('user_name') // ユーザー名

const reservations = ref(null) // 表示するお気に入り店舗情報
const favorites = ref(null) // 表示するお気に入り店舗情報
const showModal = ref(false) // 評価モーダル表示フラグ

const ratingShopId = ref(0) // 評価対象店舗ID
const ratingReservationId = ref(0) // 評価対象予約ID
const rating = ref(0) // 店舗評価
const comment = ref('') // 店舗評価コメント

// お気に入り登録/解除処理
const toggleFavorite = async (shopId) => {
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/favorite', {
            shop_id: shopId,
            user_id: userId
        });

        // POSTが成功した場合の処理を追加
        if (response.status === 200) {
            // お気に入り一覧を再取得
            await favoriteStore.fetchFavoriteByUserId(userId)
            favorites.value = favoriteStore.favorites
        } else {
            // POSTが成功したが、レスポンスステータスが異常な場合の処理を行う
            console.error("POST request failed:", response.status);
        }
    } catch (error) {
        console.error("POST request failed:", error);
    }
};

// 予約削除処理
const deleteReservationShop = async (reservationId, reservationName) => {
    if (confirm(`${reservationName}の予約をキャンセルしますか？`)) {
        try {
            const response = await axios.delete(import.meta.env.VITE_API_URL + `/reservation/cancel/${reservationId}`);

            // DELETEが成功した場合の処理を追加
            if (response.status === 200) {
                // 予約一覧を再取得
                await reservationStore.fetchReservationByUserId(userId)
                reservations.value = reservationStore.reservations
            } else {
                // DELETEが成功したが、レスポンスステータスが異常な場合の処理を行う
                console.error("DELETE request failed:", response.status);
            }
        } catch (error) {
            console.error("DELETE request failed:", error);
        }
    }
};

// レビュー投稿処理
const postRating = async () => {
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/rating', {
            shop_id: ratingShopId.value,
            reservation_id: ratingReservationId.value,
            user_id: userId,
            rating: rating.value,
            comment: comment.value,
        });

        // POSTが成功した場合の処理を追加
        if (response.status === 201) {
            // 予約一覧を再取得
            await reservationStore.fetchReservationByUserId(userId)
            reservations.value = reservationStore.reservations

            // レビュー投稿モーダルを閉じる
            showModal.value = false;
        } else {
            // POSTが成功したが、レスポンスステータスが異常な場合の処理を行う
            console.error("POST request failed:", response.status);
        }
    } catch (error) {
        console.error("POST request failed:", error);
    }
};

// レビュー投稿モーダルを開く
const openRating = async (reservationId, shopId) => {
    ratingReservationId.value = reservationId;
    ratingShopId.value = shopId;
    rating.value = '0';
    comment.value = '';
    showModal.value = true;
};

onMounted(async () => {
    // 予約一覧を取得
    await reservationStore.fetchReservationByUserId(userId)
    reservations.value = reservationStore.reservations

    // お気に入り一覧を取得
    await favoriteStore.fetchFavoriteByUserId(userId)
    favorites.value = favoriteStore.favorites

    // ローディングフラグをtrueにする
    loading.value = true
})
</script>

<style scoped>
th {
    width: 150px;
}

.v-card-actions {
    justify-content: space-between;
}

.v-card-subtitle {
    display: flex;
    padding: 0 16px;
}
</style>