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
        <v-list-item to="/login">
            <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item to="/registration">
            <v-list-item-title>Registion</v-list-item-title>
        </v-list-item>
    </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'

const showMenu = ref(false)
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