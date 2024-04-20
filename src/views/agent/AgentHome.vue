<template>
    <AgentMenu />

    <v-main>
        <v-container fluid width="100%" v-if="loading">
            <v-sheet class="mx-auto my-15 pa-10 bg-grey-lighten-3 rounded">
                <v-row class="d-flex">

                    <!-- 店舗検索画面表示 -->
                    <v-col cols="12" sm="12" lg="6">
                        <p class="pa-5 text-h5 font-weight-bold">店舗検索画面表示</p>
                        <v-row>
                            <v-col>
                                <v-card>
                                    <v-img :src="shopUserWithShop.image_url" class="" height="200px" contain="false"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                                    </v-img>
                                    <v-card-title>{{ shopUserWithShop.name }}</v-card-title>
                                    <v-card-subtitle class="pb-0">
                                        <v-sheet>
                                            # {{ shopUserWithShop.area.name }}
                                        </v-sheet>
                                        <v-sheet class="ml-2">
                                            # {{ shopUserWithShop.genre.name }}
                                        </v-sheet>
                                    </v-card-subtitle>
                                    <v-card-actions>
                                        <v-btn text class="bg-blue-accent-4">詳細</v-btn>
                                        <v-btn icon color="gray'">
                                            <v-icon>mdi-heart</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>

                    <!-- 店舗詳細画面表示 -->
                    <v-col>
                        <p class="pa-5 text-h5 font-weight-bold">店舗詳細画面表示</p>
                        <v-sheet class="px-3 py-3">
                            <v-sheet class="d-flex">
                                <v-btn>
                                    <v-icon>mdi-chevron-left</v-icon>
                                </v-btn>
                                <p class="ml-4 py-1 text-h5">{{ shopUserWithShop.name }}</p>
                            </v-sheet>
                            <v-img :src="shopUserWithShop.image_url" class="mt-3" contain="false" />

                            <v-sheet class="mt-3 d-flex">
                                <p>#{{ shopUserWithShop.area.name }}</p>
                                <p class="ml-2">#{{ shopUserWithShop.genre.name }}</p>
                            </v-sheet>

                            <v-sheet class="mt-3">
                                <p>{{ shopUserWithShop.description }}</p>
                            </v-sheet>
                        </v-sheet>
                    </v-col>

                </v-row>

                <div class="w-50 mx-auto">
                    <div class="d-flex justify-center">
                        <v-btn text :to="`/agent/reservations`" class="mr-10 my-5 bg-teal-lighten-1">予約一覧</v-btn>
                        <v-btn text :to="`/agent/payment/qrcode`" class="my-5 bg-teal-lighten-1">決済用QRコード表示</v-btn>
                    </div>

                    <div class="d-flex justify-center">
                        <v-btn text :to="`/agent/shop/edit`" class="mr-10 my-5 bg-teal-lighten-1">店舗情報編集</v-btn>
                        <v-btn text :to="`/agent/mail`" class="my-5 bg-teal-lighten-1">お知らせメール作成</v-btn>
                    </div>
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
import AgentMenu from '@/components/AgentMenu.vue'
import { useShopUsersStore } from '@/stores/shop_users'
import { useRouter } from 'vue-router'

const router = useRouter()

const shopUsersStore = useShopUsersStore()

const loading = ref(false) // ローディングフラグ

const shopUserWithShop = ref(null)

onMounted(async () => {
    await shopUsersStore.fetchShopUserWithShop()
    // 店舗情報がない場合は店舗情報作成画面に遷移
    if (Object.keys(shopUsersStore.shopUserWithShop).length === 0) {
        router.push({ name: 'AgentShopCreation' })
        return
    }
    shopUserWithShop.value = shopUsersStore.shopUserWithShop

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