<template>
    <v-app-bar app color="white">
        <v-app-bar-nav-icon @click="showMenu = !showMenu">
            <v-icon class="bg-teal-lighten-1 pa-4" style="border-radius: 3px;">
                {{ showMenu ? 'mdi-close' : 'mdi-menu' }}
            </v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title class="text-teal-lighten-1">Rese(店舗代表者)</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="showMenu" absolute temporary style="width: 100vw;">
        <v-list-item to="/agent">
            <v-list-item-title class="text-center text-teal-lighten-1">Home</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout()">
            <v-list-item-title class="text-center text-teal-lighten-1">Logout</v-list-item-title>
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
    let token = localStorage.getItem('agent_auth_token');

    axios.post(import.meta.env.VITE_URL + '/agent/logout', {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log(response.data);
        router.push('/agent/login')
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