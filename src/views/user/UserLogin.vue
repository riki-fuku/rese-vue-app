<template>
    <UserGuestMenu />

    <v-main color="gray-lighten-2">
        <v-container fluid v-if="loading">
            <v-sheet class="md:w-50 w-75 mx-auto my-16 py-16 text-center text-h5 rounded">
                <v-card>
                    <v-card-title class="text-left bg-blue-accent-3 py-4">Login</v-card-title>
                    <div class="px-2">

                        <p class="pa-2 text-red text-left text-h6">{{ errorMessages }}</p>

                        <v-card-text class="flex mt-5">
                            <v-icon class="text-h3">
                                mdi-email
                            </v-icon>
                            <v-text-field v-model="email" class="ml-2" placeholder="Email" />
                        </v-card-text>
                        <v-card-text class="flex mt-2">
                            <v-icon class="text-h3">
                                mdi-lock
                            </v-icon>
                            <v-text-field v-model="password" type="password" class="ml-2" placeholder="Password" />
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="bg-blue-accent-3 ml-auto" text @click="login()">ログイン</v-btn>
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

const email = ref('')
const password = ref('')
const errorMessages = ref('')

// ログイン処理
const login = async () => {
    axios.get(import.meta.env.VITE_URL + '/sanctum/csrf-cookie').then(response => {
        if (response.status === 200) {
            // ログイン処理
            axios.post(import.meta.env.VITE_URL + '/login', {
                email: email.value,
                password: password.value
            }).then((response) => {
                localStorage.setItem('user_auth_token', response.data.token);
                localStorage.setItem('user_id', response.data.user.id);
                localStorage.setItem('user_name', response.data.user.name);

                // ログイン成功
                router.push({ name: 'UserHome' })
            }).catch((error) => {
                // ログイン失敗
                errorMessages.value = error.response.data.message
            })
        }
    })
}

onMounted(async () => {
    // ローディングフラグをtrueにする
    loading.value = true
})

</script>
