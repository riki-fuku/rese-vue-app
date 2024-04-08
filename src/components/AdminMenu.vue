<template>
    <v-app-bar app color="white">
        <v-app-bar-nav-icon @click="showMenu = !showMenu">
            <v-icon class="bg-deep-orange-darken-1 pa-4" style="border-radius: 3px;">
                {{ showMenu ? 'mdi-close' : 'mdi-menu' }}
            </v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title class="text-deep-orange-darken-1">Rese(管理者)</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="showMenu" absolute temporary style="width: 100vw;">
        <v-list-item to="/admin">
            <v-list-item-title class="text-center text-deep-orange-darken-1">Home</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout()">
            <v-list-item-title class="text-center text-deep-orange-darken-1">Logout</v-list-item-title>
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
    let token = localStorage.getItem('admin_auth_token');

    axios.post(import.meta.env.VITE_URL + '/admin/logout', {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        // ローカルストレージのデータを削除
        localStorage.removeItem('admin_auth_token');
        localStorage.removeItem('admin_id');
        localStorage.removeItem('admin_name');

        console.log(response.data);
        router.push({ name: 'AdminLogin' })
    })
}
</script>

<style scoped>
.v-app-bar-nav-icon {
    color: white;
}

.v-navigation-drawer {
    padding-top: 300px;
}

.v-list-item {
    margin: 30px auto;
    width: 200px;
}
</style>