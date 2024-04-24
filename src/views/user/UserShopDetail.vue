<template>
    <UserMenu />

    <v-main>
        <v-container fluid width="100%" v-if="loading">
            <v-row class="d-flex">

                <v-col cols="12" sm="12" lg="6">
                    <!-- 店舗詳細表示部分 -->
                    <v-sheet class="transparent-input">
                        <v-sheet class="d-flex transparent-input">
                            <v-btn @click="router.go(-1)">
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                            <p class="ml-4 py-1 text-h5">{{ shop.name }}</p>
                        </v-sheet>
                        <v-img :src="shop.image_url" class="mt-3" contain="false" />

                        <v-sheet class="mt-3 d-flex transparent-input">
                            <p>#{{ shop.area.name }}</p>
                            <p class="ml-2">#{{ shop.genre.name }}</p>
                        </v-sheet>

                        <v-sheet class="mt-3 transparent-input">
                            <p>{{ shop.description }}</p>
                        </v-sheet>

                        <v-sheet class="my-5 transparent-input">
                            <p v-if="!userRatingFlag" class="underline" @click="redirectToRating(shop.id)">
                                口コミを投稿する
                            </p>
                        </v-sheet>
                    </v-sheet>

                    <!-- 口コミ一覧部分 -->
                    <p class="py-3 bg-blue-accent-3 text-center rounded">全ての口コミ情報</p>
                    <v-sheet class="my-10 transparent-input">
                        <v-row class="border-b">
                            <v-col cols="12" v-for="rating in ratings" :key="rating.id" class="border-t">
                                <div v-if="rating.user_id == userId" class="flex justify-end">
                                    <p class="underline" @click="redirectToRating(shop.id)">口コミを編集</p>
                                    <p class="ml-5 underline" @click="deleteRating(rating.id)">口コミを削除</p>
                                </div>
                                <v-rating v-model="rating.rating" color="blue-accent-4" readonly></v-rating>
                                <p>{{ rating.comment }}</p>
                                <v-img v-if="rating.image_url" :src="rating.image_url" class="mt-3" contain="false" />
                            </v-col>
                        </v-row>
                    </v-sheet>

                </v-col>

                <v-col cols="12" sm="12" lg="6">
                    <!-- 予約入力フォーム -->
                    <v-sheet class="bg-blue-accent-3 rounded mb-10" style="position: relative;">
                        <form @submit.prevent="submit">
                            <p class="pa-5 text-h5">予約</p>

                            <!-- 入力フォーム -->
                            <div class="mx-5">

                                <p class="pa-2 text-red text-left text-h6" v-for="errorMessage in errorMessages"
                                    :key="errorMessage">
                                    {{ errorMessage }}
                                </p>

                                <!-- 予約日時 -->
                                <input type="date" class="px-2 py-1 w-50 bg-white rounded"
                                    v-model="reservationDate.value.value" :rules="reservationDate.value.rules"
                                    label="予約日">
                                <p class="pt-1 pb-2 text-deep-orange-accent-1">{{ reservationDate.errorMessage.value }}
                                </p>

                                <!-- 予約時間 -->
                                <select class="px-2 py-1 w-50 bg-white rounded" v-model="reservationTime.value.value">
                                    <option v-for="reservationTime in reservationTimeList" :value="reservationTime"
                                        :key="reservationTime">
                                        {{ reservationTime }}
                                    </option>
                                </select>
                                <p class="pt-1 pb-2 text-deep-orange-accent-1">{{ reservationTime.errorMessage.value }}
                                </p>

                                <!-- 予約人数 -->
                                <select class="px-2 py-1 w-50 bg-white rounded" v-model="partySize.value.value">
                                    <option v-for="partySize in partySizeList" :value="partySize" :key="partySize">
                                        {{ partySize }}人
                                    </option>
                                </select>
                                <p class="pt-1 pb-2 text-deep-orange-accent-1">{{ partySize.errorMessage.value }}</p>
                            </div>

                            <!-- 予約確認表示 -->
                            <v-sheet class="my-4 mx-5 pa-5 rounded bg-blue-accent-2">
                                <table>
                                    <tr>
                                        <th class="text-left" style="width: 50%;">Shop</th>
                                        <td>{{ shop.name }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-left" style="width: 50%;">Date</th>
                                        <td>{{ reservationDate.value.value }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-left" style="width: 50%;">Time</th>
                                        <td>{{ reservationTime.value.value }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-left" style="width: 50%;">Number</th>
                                        <td>{{ partySize.value.value ? partySize.value.value + '人' : '' }}</td>
                                    </tr>
                                </table>
                            </v-sheet>

                            <br><br>

                            <v-btn class="me-4 w-100 bg-blue-accent-4" type="submit"
                                style="position: absolute;bottom: 0;">
                                予約する
                            </v-btn>
                        </form>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>

        <v-container v-else>
            <p class="text-center">Loading...</p>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserMenu from '@/components/UserMenu.vue'
import { useShopStore } from '@/stores/shops'
import { useRatingStore } from '@/stores/ratings'
import { useField, useForm } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const shopStore = useShopStore()
const ratingStore = useRatingStore()

const loading = ref(false) // ローディングフラグ
const userId = localStorage.getItem('user_id') // ユーザーID
const shop = ref(null) // 表示する店舗情報
const userRatingFlag = ref('') // ユーザーが口コミを投稿済みかの判定
const ratings = ref([]) // 口コミ一覧
const reservationTimeList = ref(null) // 予約時間の選択肢
const partySizeList = ref(1) // 予約人数の選択肢
const errorMessages = ref([]) // エラーメッセージ

// バリデーション設定
const { handleSubmit } = useForm({
    validationSchema: {
        reservationDate(value) {
            if (!value) {
                return '予約日を入力してください'
            } else if (value && value < new Date().toISOString().split('T')[0]) {
                return '今日以降の日付を入力してください'
            } else {
                return true
            }
        },
        reservationTime(value) {
            if (!value) {
                return '予約時間を選択してください'
            } else {
                return true
            }
        },
        partySize(value) {
            if (!value) {
                return '予約人数を選択してください'
            } else {
                return true
            }
        },
    },
})
const reservationDate = useField('reservationDate')
const reservationTime = useField('reservationTime')
const partySize = useField('partySize')

// 登録ボタン押下時の処理
const submit = handleSubmit(values => {
    axios.post(import.meta.env.VITE_API_URL + '/reservation', {
        shop_id: shop.value.id,
        user_id: userId,
        reservation_date: values.reservationDate,
        reservation_time: values.reservationTime,
        party_size: values.partySize,
    }).then(function (response) {
        console.log(response);
        // 完了画面に遷移
        router.push({
            name: 'UserComplete',
            state: { message: 'ご予約ありがとうございます' }
        })
    }).catch(function (error) {
        // エラーメッセージリセット
        errorMessages.value = []

        if (error.response.data.errors.reservation_date) {
            errorMessages.value.push(error.response.data.errors.reservation_date[0])
            return
        }

        if (error.response.data.errors.reservation_time) {
            errorMessages.value.push(error.response.data.errors.reservation_time[0])
            return
        }

        if (error.response.data.errors.party_size) {
            errorMessages.value.push(error.response.data.errors.party_size[0])
            return
        }
    });
})

// 開始時間と終了時間から15分刻みの時間リストを返す
const getTimeList = (openingTime, closingTime) => {
    let openHour, closeHour;
    if (typeof openingTime === 'string') {
        openHour = Number(openingTime.split(':')[0]);
    } else {
        console.error('openingTime is not a string:', openingTime);
    }
    if (typeof closingTime === 'string') {
        closeHour = Number(closingTime.split(':')[0]);
    } else {
        console.error('closingTime is not a string:', closingTime);
    }
    const timeList = []

    for (let hour = openHour; hour < closeHour; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
            timeList.push(time)
        }
    }
    return timeList
}

// 予約人数の選択肢を返す
const getPartySizeList = () => {
    const partySizeList = []
    for (let i = 1; i <= 10; i++) {
        partySizeList.push(i)
    }
    return partySizeList
}

// 口コミ画面に遷移する
const redirectToRating = (shopId) => {
    router.push({ name: 'UserRating', params: { shopId: shopId } })
}

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

    // ユーザーの評価を取得
    await ratingStore.fetchRatingByUserIdAndShopId(userId, route.params.shopId)
    if (Object.keys(ratingStore.rating).length == 0) {
        userRatingFlag.value = false
    } else {
        userRatingFlag.value = true
    }

    // 店舗の評価一覧を取得
    await ratingStore.fetchRatingsByShopId(route.params.shopId)
    ratings.value = ratingStore.ratings

    // 営業開始時間と終了時間を15分刻みで配列に格納
    reservationTimeList.value = getTimeList(shop.value.opening_time, shop.value.closing_time)

    // 予約人数の選択肢を取得
    partySizeList.value = getPartySizeList()

    // ローディングフラグをtrueにする
    loading.value = true
})
</script>

<style scoped>
th {
    width: 50%;
}
</style>