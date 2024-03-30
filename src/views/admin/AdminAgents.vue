<template>
    <AdminMenu></AdminMenu>

    <v-main color="gray-lighten-2">
        <v-container fluid width="100%" v-if="loading">
            <p class="pa-5 text-h5 font-weight-bold">店舗代表者管理画面</p>

            <v-btn class="my-5 bg-deep-orange-darken-1" @click="showInsertModal()">新規登録</v-btn>

            <table class="w-100 border" style="border-collapse: collapse;">
                <tr class="bg-orange-accent-1">
                    <th>店舗名</th>
                    <th>ユーザー名</th>
                    <th>メールアドレス</th>
                    <th>有効フラグ</th>
                    <th class="w-25">アクション</th>
                </tr>
                <tr v-for="shopUser in shopUsers"
                    :class="shopUser.invalid_flag == 0 ? 'bg-grey-lighten-1' : 'bg-white'">
                    <td class="border text-center">
                        <div v-if="shopUser.shop">
                            {{ shopUser.shop.name }}
                        </div>
                    </td>
                    <td class="border text-center">{{ shopUser.name }}</td>
                    <td class="border text-center">{{ shopUser.email }}</td>
                    <td class="border text-center">
                        {{ shopUser.invalid_flag == 0 ? '無効' : '有効' }}
                    </td>
                    <td class="border text-center">
                        <v-btn class="my-1 mx-3 bg-deep-orange-darken-1" @click="showEditModal(shopUser)">
                            編集
                        </v-btn>
                        <v-btn class="my-1 mx-3" :class="shopUser.invalid_flag == 0 ? 'bg-green' : 'bg-red-lighten-1'"
                            @click="changeInvalidShopUser(shopUser.id, shopUser.name, shopUser.invalid_flag)">
                            {{ shopUser.invalid_flag == 0 ? '有効化' : '無効化' }}
                        </v-btn>
                    </td>
                </tr>
            </table>

            <!-- 新規登録モーダル -->
            <v-dialog v-model="showInsertModalFlg" max-width="600px">
                <v-card class="pa-3">
                    <v-card-title class="text-h5">新規登録</v-card-title>

                    <p class="text-red-500 text-sm" v-if="errorMessage">
                        {{ errorMessage }}
                    </p>
                    <v-card-text>
                        <table>
                            <tr>
                                <td width="150px">ユーザー名</td>
                                <td>
                                    <input type="text" name="name" v-model="name.value" class="border  px-1 py-2"
                                        size="40" />
                                    <p class="text-red" v-if="name.error_message">
                                        {{ name.error_message }}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>メールアドレス</td>
                                <td>
                                    <input type="email" name="email" v-model="email.value" class="border px-1 py-2"
                                        size="40" />
                                    <p class="text-red" v-if="email.error_message">
                                        {{ email.error_message }}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>パスワード</td>
                                <td>
                                    <input type="password" name="password" v-model="password.value"
                                        class="border px-1 py-2" size="40" />
                                    <p class="text-red" v-if="password.error_message">
                                        {{ password.error_message }}
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="showInsertModalFlg = false" class="bg-grey">キャンセル</v-btn>
                        <v-btn @click="submitInsertAgent()" class="bg-deep-orange-darken-1">登録</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- 新規登録モーダル -->

            <!-- 編集モーダル -->
            <v-dialog v-model="showEditModalFlag" max-width="600px">
                <v-card class="pa-3">
                    <v-card-title class="text-h5">編集</v-card-title>

                    <p class="text-red" v-if="errorMessage">
                        {{ errorMessage }}
                    </p>
                    <v-card-text>
                        <table>
                            <tr>
                                <td width="150px">ユーザー名</td>
                                <td>
                                    <input type="text" name="name" v-model="name.value" class="border px-1 py-2"
                                        size="40" />
                                    <p class="text-red" v-if="name.error_message">
                                        {{ name.error_message }}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>メールアドレス</td>
                                <td>
                                    <input type="email" name="email" v-model="email.value" class="border px-1 py-2"
                                        size="40" />
                                    <p class="text-red" v-if="email.error_message">
                                        {{ email.error_message }}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>パスワード</td>
                                <td>
                                    <input type="password" name="password" v-model="password.value"
                                        class="border px-1 py-2" size="40" />
                                    <p class="text-red" v-if="password.error_message">
                                        {{ password.error_message }}
                                    </p>
                                </td>
                            </tr>
                        </table>
                        ※パスワードを変更しない場合は入力不要です
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="showEditModalFlag = false" class="bg-grey">キャンセル</v-btn>
                        <v-btn @click="submitUpdateAgent()" class="bg-deep-orange-darken-1">登録</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- 編集モーダル -->
        </v-container>

        <v-container v-else>
            <p class="text-center">Loading...</p>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import AdminMenu from '@/components/AdminMenu.vue'
import { useShopUsersStore } from '@/stores/shop_users'
import axios from 'axios'

const shopUsersStore = useShopUsersStore()

const loading = ref(false) // ローディングフラグ

const shopUsers = ref(null) // 店舗代表者一覧
const showInsertModalFlg = ref(false) // 新規登録モーダル表示フラグ
const showEditModalFlag = ref(false) // 編集モーダル表示フラグ
const editModalShopUserId = ref(null) // 編集モーダルの店舗代表者ID

const name = reactive({ value: '', error_message: '' })
const email = reactive({ value: '', error_message: '' })
const password = reactive({ value: '', error_message: '' })
const errorMessage = ref('')

// 新規モーダルを開く
const showInsertModal = () => {
    initModal()
    showInsertModalFlg.value = true
}

// 編集モーダルを開く
const showEditModal = (shopUser) => {
    initModal()
    editModalShopUserId.value = shopUser.id
    name.value = shopUser.name
    email.value = shopUser.email
    showEditModalFlag.value = true
}

// モーダル初期化
const initModal = () => {
    name.value = ''
    email.value = ''
    password.value = ''
}

// 店舗代表者新規登録
const submitInsertAgent = async () => {
    // バリデーションチェック
    if (validateInsertForm()) {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/shop_user/store', {
                name: name.value,
                email: email.value,
                password: password.value,
            });

            // POSTが成功した場合の処理を追加
            if (response.status === 200) {
                // 店舗代表者を再取得
                await shopUsersStore.fetchShopUsers()
                shopUsers.value = shopUsersStore.shopUsers

                // モーダルを閉じる
                showInsertModalFlg.value = false;
            } else {
                // POSTが成功したが、レスポンスステータスが異常な場合の処理を行う
                console.error("POST request failed:", response.status);
                errorMessage.value = error.response.data.message || 'エラーが発生しました';
            }
        } catch (error) {
            console.error("POST request failed:", error);
            errorMessage.value = error.response.data.message || 'エラーが発生しました';
        }
    }
}

// 店舗代更新
const submitUpdateAgent = async () => {
    // バリデーションチェック
    if (validateUpdateForm()) {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/shop_user/update', {
                id: editModalShopUserId.value,
                name: name.value,
                email: email.value,
                password: password.value,
            });

            // POSTが成功した場合の処理を追加
            if (response.status === 200) {
                // 店舗代表者を再取得
                await shopUsersStore.fetchShopUsers()
                shopUsers.value = shopUsersStore.shopUsers

                // モーダルを閉じる
                showEditModalFlag.value = false;
            } else {
                // POSTが成功したが、レスポンスステータスが異常な場合の処理を行う
                console.error("POST request failed:", response.status);
                errorMessage.value = error.response.data.message || 'エラーが発生しました';
            }
        } catch (error) {
            console.error("POST request failed:", error);
            errorMessage.value = error.response.data.message || 'エラーが発生しました';
        }
    }
}

// 新規登録ばリデーションチェック
const validateInsertForm = () => {
    // 名前チェック
    if (name.value === '') {
        name.error_message = '名前を入力してください';
        return false;
    } else if (name.value.length > 20) {
        name.error_message = '名前は20文字以内で入力してください';
        return false;
    } else {
        name.error_message = '';
    }

    // メールアドレスチェック
    if (email.value === '') {
        email.error_message = 'メールアドレスを入力してください';
        return false;
    } else if (!email.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
        email.error_message = 'メールアドレスの形式が正しくありません';
        return false;
    } else if (email.value.length > 255) {
        email.error_message = 'メールアドレスは255文字以内で入力してください';
        return false;
    } else {
        email.error_message = '';
    }

    // パスワードチェック
    if (password.value === '') {
        password.error_message = 'パスワードを入力してください';
        return false;
    } else if (password.value.length < 8) {
        password.error_message = 'パスワードは8文字以上で入力してください';
        return false;
    } else {
        password.error_message = '';
    }

    return true;
}

// 新規登録ばリデーションチェック
const validateUpdateForm = () => {
    // 名前チェック
    if (name.value === '') {
        name.error_message = '名前を入力してください';
        return false;
    } else if (name.value.length > 20) {
        name.error_message = '名前は20文字以内で入力してください';
        return false;
    } else {
        name.error_message = '';
    }

    // メールアドレスチェック
    if (email.value === '') {
        email.error_message = 'メールアドレスを入力してください';
        return false;
    } else if (!email.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
        email.error_message = 'メールアドレスの形式が正しくありません';
        return false;
    } else if (email.value.length > 255) {
        email.error_message = 'メールアドレスは255文字以内で入力してください';
        return false;
    } else {
        email.error_message = '';
    }

    // パスワードチェック
    if (password.value !== '') {
        if (password.value.length < 8) {
            password.error_message = 'パスワードは8文字以上で入力してください';
            return false;
        } else {
            password.error_message = '';
        }
    } else {
        password.error_message = '';
    }

    return true;
}

// 店舗代表者の有効/無効を切り替える
const changeInvalidShopUser = async (id, userName, invalidFlag) => {
    let confirmMessage = ''
    if (invalidFlag == 1) {
        confirmMessage = `${userName}のログインを無効にしますか？`
    } else if (invalidFlag == 0) {
        confirmMessage = `${userName}のログインを有効にしますか？`
    }

    if (confirm(confirmMessage)) {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/shop_user/change_invalid', {
                id: id,
            });

            // POSTが成功した場合の処理を追加
            if (response.status === 200) {
                // 店舗代表者一覧を再取得
                await shopUsersStore.fetchShopUsers()
                shopUsers.value = shopUsersStore.shopUsers
            } else {
                // POSTが成功したが、レスポンスステータスが異常な場合の処理を行う
                console.error("POST request failed:", response.status);
            }
        } catch (error) {
            console.error("POST request failed:", error);
        }
    }
};

onMounted(async () => {
    // 店舗代表者一覧を取得
    await shopUsersStore.fetchShopUsers()
    shopUsers.value = shopUsersStore.shopUsers

    // ローディングフラグをtrueにする
    loading.value = true
});
</script>

<style scoped>
tr {
    height: 50px;
}
</style>