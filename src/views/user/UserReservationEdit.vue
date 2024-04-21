<template>
    <UserMenu />

    <v-main>
        <v-container fluid width="100%" v-if="loading">
            <v-row class="d-flex">

                <v-col cols="12" sm="12" lg="6">
                    <!-- 店舗詳細表示部分 -->
                    <v-sheet class="px-3 transparent-input">
                        <v-sheet class="d-flex transparent-input">
                            <v-btn @click="router.go(-1)">
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                            <p class="ml-4 py-1 text-h5">{{ reservation.shop.name }}</p>
                        </v-sheet>
                        <v-img :src="reservation.shop.image_url" class="mt-3" contain="false" />

                        <v-sheet class="mt-3 d-flex transparent-input">
                            <p>#{{ reservation.shop.area.name }}</p>
                            <p class="ml-2">#{{ reservation.shop.genre.name }}</p>
                        </v-sheet>

                        <v-sheet class="mt-3 transparent-input">
                            <p>{{ reservation.shop.description }}</p>
                        </v-sheet>
                    </v-sheet>

                </v-col>
                <v-col cols="12" sm="12" lg="6">

                    <!-- 予約変更入力フォーム -->
                    <v-sheet class="bg-blue-accent-3 rounded" style="position: relative;">
                        <form @submit.prevent="submit">
                            <p class="pa-5 text-h5">予約変更</p>

                            <!-- 入力フォーム -->
                            <div class="mx-5">
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
                            <v-sheet class="my-4 mx-5 pa-5 rounded bg-blue-accent-2" height="200px">
                                <table>
                                    <tr>
                                        <th class="text-left" style="width: 50%;">Shop</th>
                                        <td>{{ reservation.shop.name }}</td>
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
                                予約変更する
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
import { useReservationStore } from '@/stores/reservations'
import { useField, useForm } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const reservationStore = useReservationStore()

const loading = ref(false) // ローディングフラグ
const reservation = ref(null) // 表示する店舗情報
const reservationTimeList = ref(null) // 予約時間の選択肢
const partySizeList = ref(1) // 予約人数の選択肢

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

// 変更ボタン押下時の処理
const submit = handleSubmit(values => {
    axios.put(import.meta.env.VITE_API_URL + '/reservation', {
        id: route.params.reservationId,
        reservation_date: values.reservationDate,
        reservation_time: values.reservationTime,
        party_size: values.partySize,
    }).then(function (response) {
        console.log(response);
        // 完了画面に遷移
        router.push({
            name: 'UserComplete',
            state: { message: 'ご予約の変更が完了しまいした' }
        })
    }).catch(function (error) {
        console.log(error);
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

onMounted(async () => {
    // 予約情報を取得
    await reservationStore.fetchReservation(route.params.reservationId)

    if (Object.keys(reservationStore.reservation).length === 0) {
        console.error('reservation is not found:', route.params.reservationId)
        router.push({ name: 'UserHome' })
        return
    }
    reservation.value = reservationStore.reservation

    // 予約日を予約情報から取得
    reservationDate.value.value = reservation.value.reservation_date

    // 予約時間を予約情報から取得
    reservationTime.value.value = reservation.value.reservation_time.slice(0, 5)

    // 予約人数を予約情報から取得
    partySize.value.value = reservation.value.party_size

    // 営業開始時間と終了時間を15分刻みで配列に格納
    reservationTimeList.value = getTimeList(reservation.value.shop.opening_time, reservation.value.shop.closing_time)

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