<template>
    <v-app-bar app color="white">
        <v-app-bar-nav-icon @click="showMenu = !showMenu">
            <v-icon class="bg-blue-accent-3 pa-4" style="border-radius: 3px;">
                {{ showMenu ? 'mdi-close' : 'mdi-menu' }}
            </v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>Rese</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="showMenu" absolute temporary style="width: 100vw;">
        <v-list-item to="/">
            <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout()">
            <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
        <v-list-item to="/mypage">
            <v-list-item-title>Mypage</v-list-item-title>
        </v-list-item>
    </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router'

const router = useRouter()

const showMenu = ref(false)

const logout = () => {
    // トークンを取得
    let token = localStorage.getItem('user_auth_token');

    axios.post(import.meta.env.VITE_URL + '/logout', {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        // ローカルストレージのデータを削除
        localStorage.removeItem('user_auth_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_name');

        console.log(response.data);
        router.push({ name: 'UserLogin' })
    })
}
</script>

<style scoped>
.v-app-bar-nav-icon {
    color: white;
}

.v-toolbar-title {
    color: #3b82f6;
}

.v-navigation-drawer {
    padding-top: 300px;
}

.v-list-item {
    margin: 30px auto;
    width: 200px;
}

.v-list-item-title {
    text-align: center;
    color: #3b82f6;
}
</style>