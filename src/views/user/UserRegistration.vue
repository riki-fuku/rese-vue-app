<template>
    <UserGuestMenu />

    <v-main color="gray-lighten-2">
        <v-container fluid v-if="loading">
            <v-sheet class="md:w-50 w-75 mx-auto my-16 py-16 text-center text-h5 rounded">
                <v-card>
                    <v-card-title class="text-left bg-blue-accent-3 py-4">Registration</v-card-title>
                    <div class="px-2">

                        <p class="pa-2 text-red text-left text-h6">{{ errorMessages }}</p>

                        <v-card-text class="flex mt-5 py-0">
                            <v-icon class="text-h3">
                                mdi-account
                            </v-icon>
                            <v-text-field v-model="userName" class="ml-2" placeholder="UserName" />
                        </v-card-text>
                        <v-card-text class="flex py-0">
                            <v-icon class="text-h3">
                                mdi-email
                            </v-icon>
                            <v-text-field v-model="email" class="ml-2" placeholder="Email" />
                        </v-card-text>
                        <v-card-text class="flex py-0">
                            <v-icon class="text-h3">
                                mdi-lock
                            </v-icon>
                            <v-text-field v-model="password" type="password" class="ml-2" placeholder="Password" />
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="bg-blue-accent-3 ml-auto" text @click="register()">登録</v-btn>
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

const router = useRouter()
const loading = ref(false) // ローディングフラグ

const userName = ref('')
const email = ref('')
const password = ref('')
const errorMessages = ref('')

// ユーザー登録処理
const register = async () => {
    axios.post(import.meta.env.VITE_API_URL + '/register/user', {
        name: userName.value,
        email: email.value,
        password: password.value
    }).then((response) => {
        console.log(response.data)
        // ログイン成功
        router.push({ name: 'UserVerifyEmail' })
    }).catch((error) => {
        // ログイン失敗
        errorMessages.value = error.response.data.message
    })
}

onMounted(async () => {
    // ローディングフラグをtrueにする
    loading.value = true
})

</script>
