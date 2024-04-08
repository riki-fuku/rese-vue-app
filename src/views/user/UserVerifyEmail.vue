<template>
    <UserGuestMenu />

    <v-main color="gray-lighten-2">
        <v-container fluid v-if="loading">
            <v-sheet class="w-50 mx-auto my-16 py-16 text-center text-h5 rounded">
                <v-card>
                    <div class="px-2">
                        <v-card-text class="flex mt-5 text-h6">
                            ご登録いただきありがとうございます!<br><br>
                            始める前に、先ほどメールでお送りしたリンクをクリックしてください。
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="bg-blue-accent-3 ml-auto" text
                                @click="router.push({ name: 'UserLogin' })">ログイン画面へ</v-btn>
                        </v-card-actions>
                    </div>

                </v-card>
            </v-sheet>
        </v-container>

        <v-container v-else>
            <p>Loading...</p>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserGuestMenu from '@/components/UserGuestMenu.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
// クロスサイトリクエストの際にもcookieを送信する
axios.defaults.withCredentials = true;

const router = useRouter()
const loading = ref(false) // ローディングフラグ

onMounted(async () => {
    // ローディングフラグをtrueにする
    loading.value = true
})

</script>
