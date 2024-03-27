<template>
    <UserMenu></UserMenu>

    <v-main color="gray-lighten-2">
        <v-container fluid width="100%" v-if="loading">
            <div class="d-flex">

                <!-- 店舗詳細表示部分 -->
                <v-sheet class="px-3" width="50vw">
                    <v-sheet class="d-flex">
                        <v-btn>
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <p class="ml-4 py-1 text-h5">{{ shop.name }}</p>
                    </v-sheet>
                    <v-img :src="shop.image_url" class="mt-3" contain="false" />

                    <v-sheet class="mt-3 d-flex">
                        <p>#{{ shop.area.name }}</p>
                        <p class="ml-2">#{{ shop.genre.name }}</p>
                    </v-sheet>

                    <v-sheet class="mt-3">
                        <p>{{ shop.description }}</p>
                    </v-sheet>
                </v-sheet>

                <!-- 予約入力フォーム -->
                <v-sheet class="bg-blue-accent-3 rounded" width="50vw" style="position: relative;">
                    <form @submit.prevent="submit">
                        <p class="pa-5 text-h5">予約</p>

                        <!-- 入力フォーム -->
                        <div class="mx-5">
                            <!-- 予約日時 -->
                            <input type="date" class="px-2 py-1 w-50 bg-white rounded"
                                v-model="reservationDate.value.value" :rules="reservationDate.value.rules" label="予約日">
                            <p class="pt-1 pb-2 text-deep-orange-accent-1">{{ reservationDate.errorMessage.value }}</p>

                            <!-- 予約時間 -->
                            <select class="px-2 py-1 w-50 bg-white rounded" v-model="reservationTime.value.value">
                                <option v-for="reservationTime in reservationTimeList" :value="reservationTime">
                                    {{ reservationTime }}
                                </option>
                            </select>
                            <p class="pt-1 pb-2 text-deep-orange-accent-1">{{ reservationTime.errorMessage.value }}</p>

                            <!-- 予約人数 -->
                            <select class="px-2 py-1 w-50 bg-white rounded" v-model="partySize.value.value">
                                <option v-for="partySize in partySizeList" :value="partySize">
                                    {{ partySize }}人
                                </option>
                            </select>
                            <p class="pt-1 pb-2 text-deep-orange-accent-1">{{ partySize.errorMessage.value }}</p>
                        </div>

                        <!-- 予約確認表示 -->
                        <div class="my-4 mx-5 pa-5 rounded bg-blue-accent-2">
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
                        </div>

                        <v-btn class="me-4 w-100 bg-blue-accent-4" type="submit" style="position: absolute;bottom: 0;">
                            予約する
                        </v-btn>
                    </form>
                </v-sheet>
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
import { useShopStore } from '@/stores/shops'
import { useField, useForm } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const shopStore = useShopStore()

const loading = ref(false) // ローディングフラグ
const shop = ref(null) // 表示する店舗情報
const reservationTimeList = ref(null) // 予約時間の選択肢
const partySizeList = ref(1) // 予約人数の選択肢

// バリデーション設定
const { handleSubmit } = useForm({
    validationSchema: {
        reservationDate(value) {
            if (!value) {
                return '予約日を入力してください'
            } else if (value < new Date().toISOString().split('T')[0]) {
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
        user_id: 1, // TODO::仮で1を設定
        reservation_date: values.reservationDate,
        reservation_time: values.reservationTime,
        party_size: values.partySize,
    }).then(function (response) {
        // 完了画面に遷移
        router.push({
            name: 'UserComplete',
            state: { message: 'ご予約ありがとうございます' }
        })
    }).catch(function (error) {
        console.log(error);
    });
})

onMounted(async () => {
    // 店舗情報を取得
    await shopStore.fetchShopById(route.params.id)
    shop.value = shopStore.shop

    // 営業開始時間と終了時間を15分刻みで配列に格納
    reservationTimeList.value = getTimeList(shop.value.opening_time, shop.value.closing_time)

    // 予約人数の選択肢を取得
    partySizeList.value = getPartySizeList()

    // ローディングフラグをtrueにする
    loading.value = true
})

// 開始時間と終了時間から15分刻みの時間リストを返す
const getTimeList = (openingTime, closingTime) => {
    const openHour = Number(openingTime.split(':')[0])
    const closeHour = Number(closingTime.split(':')[0])
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
</script>

<style scoped>
th {
    width: 50%;
}
</style>