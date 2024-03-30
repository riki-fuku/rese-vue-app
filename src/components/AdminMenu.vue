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
        <v-list-item to="/">
            <v-list-item-title class="text-center text-deep-orange-darken-1">Logout</v-list-item-title>
        </v-list-item>
    </v-navigation-drawer>
</template>

<script>
export default {
    data: () => ({
        showMenu: false
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
</style>