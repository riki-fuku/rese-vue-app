<template>
    <AdminMenu></AdminMenu>

    <v-main color="gray-lighten-2">
        <v-container fluid width="100%" v-if="loading">
            <v-sheet class="w-50 mx-auto my-15 pa-10 bg-grey-lighten-3 rounded">
                <div class="d-flex flex-column align-center">
                    <v-btn text :to="`/admin/agents`" class="my-5 bg-deep-orange-darken-1">店舗代表者管理画面</v-btn>
                    <v-btn text :to="`/admin/mail`" class="my-5 bg-deep-orange-darken-1">メール送信画面</v-btn>
                </div>
            </v-sheet>
        </v-container>

        <v-container v-else>
            <p class="text-center">Loading...</p>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminMenu from '@/components/AdminMenu.vue'

const loading = ref(false) // ローディングフラグ

onMounted(async () => {
    // ローディングフラグをtrueにする
    loading.value = true
});
</script>

<style scoped>
.search {
    display: flex;
    padding: 0 16px;
    justify-content: flex-end;
}

.v-card-actions {
    justify-content: space-between;
}

.v-card-subtitle {
    display: flex;
    padding: 0 16px;
}
</style>