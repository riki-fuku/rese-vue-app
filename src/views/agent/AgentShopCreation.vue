<template>
    <AgentMenu></AgentMenu>

    <v-main color="gray-lighten-2">
        <v-container fluid width="100%" v-if="loading">
            <p class="pa-5 text-h5 font-weight-bold">店舗情報新規登録</p>

            <v-sheet class="w-75 pa-10 mx-auto bg-grey-lighten-3 rounded">

                <p class="text-red text-center" v-if="errorMessage">
                    {{ errorMessage }}
                </p>

                <table class="mx-auto bg-white" style="border-collapse: collapse;">
                    <tr>
                        <th class="bg-grey">店名</th>
                        <td>
                            <input type="text" class="border px-2 py-1" v-model="name.value" size="50">
                            <p class="text-red" v-if="name.error_message">
                                {{ name.error_message }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th class="bg-grey">地域</th>
                        <td>
                            <select class="border px-2 py-1" v-model="areaId.value">
                                <option v-for="area in areas" :key="area.id" :value="area.id">
                                    {{ area.name }}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th class="bg-grey">ジャンル</th>
                        <td>
                            <select class="border px-2 py-1" v-model="genreId.value">
                                <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                                    {{ genre.name }}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th class="bg-grey">店舗概要</th>
                        <td>
                            <textarea class="border px-2 py-1" v-model="description.value" cols="50"
                                rows="10"></textarea>
                            <p class="text-red" v-if="description.error_message">
                                {{ description.error_message }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th class="bg-grey">開店時間</th>
                        <td>
                            <select class="border px-2 py-1 w-50" v-model="openingTime.value">
                                <option v-for="time in timeList" :value="time" :key="time">
                                    {{ time }}
                                </option>
                            </select>
                            <p class="text-red" v-if="openingTime.error_message">
                                {{ openingTime.error_message }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th class="bg-grey">閉店時間</th>
                        <td>
                            <select class="border px-2 py-1 w-50" v-model="closingTime.value">
                                <option v-for="time in timeList" :value="time" :key="time">
                                    {{ time }}
                                </option>
                            </select>
                            <p class="text-red" v-if="closingTime.error_message">
                                {{ closingTime.error_message }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th class="bg-grey">店舗TOP画像</th>
                        <td>
                            <input type="file" name="image" class="w-full" ref="fileInput">
                            <p class="text-red" v-if="topImage.error_message">
                                {{ topImage.error_message }}
                            </p>
                            <p class="text-grey-darken-1">※変更する場合のみ画像を選択してください</p>
                        </td>
                    </tr>
                </table>

                <div class="w-25 mx-auto mt-10 flex justify-between">
                    <v-btn color="primary" @click="resetShop()">クリア</v-btn>
                    <v-btn color="primary" @click="updateShop()">変更</v-btn>
                </div>
            </v-sheet>
        </v-container>

        <v-container v-else>
            <p class="text-center">Loading...</p>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import AgentMenu from '@/components/AgentMenu.vue'
import { useAreaStore } from '@/stores/areas'
import { useGenreStore } from '@/stores/genres'
import { useRouter } from 'vue-router'
import axios from 'axios'

const areaStore = useAreaStore()
const genreStore = useGenreStore()
const router = useRouter()

const loading = ref(false) // ローディングフラグ
const areas = ref([])
const genres = ref([])

const shopId = ref('') // 店舗ID
const name = reactive({ value: '', error_message: '' })
const areaId = reactive({ value: '', error_message: '' })
const genreId = reactive({ value: '', error_message: '' })
const description = reactive({ value: '', error_message: '' })
const openingTime = reactive({ value: '', error_message: '' })
const closingTime = reactive({ value: '', error_message: '' })
const topImage = reactive({ value: '', error_message: '' })
const errorMessage = ref('') // エラーメッセージ
const error = ref('') // APIエラー

let timeList = ref([]) // 24時間で15分刻みの時間リスト

// 入力欄のクリア
const resetShop = async () => {
    name = { value: '', error_message: '' }
    areaId = { value: '', error_message: '' }
    genreId = { value: '', error_message: '' }
    description = { value: '', error_message: '' }
    openingTime = { value: '', error_message: '' }
    closingTime = { value: '', error_message: '' }
    topImage = { value: '', error_message: '' }
}

// 店舗情報新規登録
const updateShop = async () => {
    // バリデーション
    if (validateShop()) {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/shop/store', {
                name: name.value,
                area_id: areaId.value,
                genre_id: genreId.value,
                description: description.value,
                opening_time: openingTime.value,
                closing_time: closingTime.value,
            });

            // POSTが成功した場合の処理を追加
            if (response.status === 200) {
                // 完了画面に遷移
                router.push({
                    name: 'AgentComplete',
                    state: { message: '店舗情報の新規登録が完了しました。' }
                })
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
const validateShop = () => {
    // 店舗名チェック
    if (name.value == '') {
        name.error_message = '店名を入力してください';
        return false;
    } else {
        name.error_message = '';
    }

    // 地域チェック
    if (areaId.value == '') {
        areaId.error_message = '地域を選択してください';
        return false;
    } else {
        areaId.error_message = '';
    }

    // ジャンルチェック
    if (genreId.value == '') {
        genreId.error_message = 'ジャンルを選択してください';
        return false;
    } else {
        genreId.error_message = '';
    }

    // 店舗概要チェック
    if (description.value == '') {
        description.error_message = '店舗概要を入力してください';
        return false;
    } else {
        description.error_message = '';
    }

    // 開店時間チェック
    if (openingTime.value == '') {
        openingTime.error_message = '開店時間を選択してください';
        return false;
    } else {
        openingTime.error_message = '';
    }

    // 閉店時間チェック
    if (closingTime.value == '') {
        closingTime.error_message = '閉店時間を選択してください';
        return false;
    } else {
        closingTime.error_message = '';
    }

    // 店舗TOP画像のチェック
    // if (!validateFile()) {
    //     return false;
    // }

    return true;
}

// 画像ファイルのバリデーション
// const validateFile = () => {
//     const file = $refs.fileInput.files[0];
//     const maxSize = 1024 * 1024 * 5; // 5MBまでのみ許可
//     const validTypes = ['image/jpeg']; // jpegのみ許可

//     if (file) {
//         if (file.size > maxSize) {
//             topImage.error_message = 'ファイルサイズが大きすぎます。5MB以下のファイルを選択してください。';
//             return false;
//         } else if (!validTypes.includes(file.type)) {
//             topImage.error_message = '無効なファイルタイプです。JPEGファイルのみアップロードできます。';
//             return false;
//         } else {
//             topImage.value = file;
//             topImage.error_message = '';
//         }
//     } else {
//         topImage.error_message = '';
//     }

//     return true;
// }

// 24時間で15分刻みの時間リストを返す
const getTimeList = () => {
    timeList = []
    const startHour = 0
    const endHour = 24
    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
            timeList.push(time)
        }
    }
}

onMounted(async () => {
    // エリア情報を取得
    await areaStore.fetchAreas()
    areas.value = areaStore.areas

    // ジャンル情報を取得
    await genreStore.fetchGenres()
    genres.value = genreStore.genres

    // 24時間で15分刻みの時間リストを取得
    getTimeList()

    // ローディングフラグをtrueにする
    loading.value = true
});
</script>

<style scoped>
.v-card-actions {
    justify-content: space-between;
}

tr {
    height: 50px;
}

th {
    width: 30%;
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
}

td {
    width: 70%;
    padding: 10px;
    border: 1px solid #ccc;
}
</style>