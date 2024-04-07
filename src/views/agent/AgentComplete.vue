<template>
    <AgentMenu />

    <v-main color="gray-lighten-2">
        <v-container fluid v-if="loading">
            <v-sheet class="w-50 mx-auto my-16 py-16 text-center text-h5 rounded">
                <p>
                    {{ message }}
                </p>

                <v-btn text :to="`/agent`" color="primary" size="large" class="mt-10">
                    戻る
                </v-btn>
            </v-sheet>
        </v-container>

        <v-container v-else>
            <p>Loading...</p>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AgentMenu from '@/components/AgentMenu.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const message = route.fullPath ? history.state.message : router.push({ name: 'AgentHome' })
const loading = ref(false) // ローディングフラグ

onMounted(async () => {
    // ローディングフラグをtrueにする
    loading.value = true
})

</script>
