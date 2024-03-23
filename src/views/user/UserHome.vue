<template>
    <v-container fluid width="100%">
        <!-- 検索条件 -->
        <v-row class="search">
            <v-col cols="12" sm="6" lg="3">
                <v-select v-model="selectedArea" item-title="name" item-value="name" :items="areas" label="All area">
                </v-select>
            </v-col>
            <v-col cols="12" sm="6" lg="3">
                <v-select v-model="selectedGenre" item-title="name" item-value="name" :items="genres" label="All genre">
                </v-select>
            </v-col>
            <v-col cols="12" sm="6" lg="3">
                <v-text-field v-model="searchText" label="Search...">
                    <template #prepend>
                        <v-icon>mdi-magnify</v-icon>
                    </template>
                </v-text-field>
            </v-col>
        </v-row>

        <!-- 店舗一覧表示部分 -->
        <v-row>
            <v-col cols="12" sm="6" lg="3" v-for="shop in filteredShops" :key="shop.id">
                <v-card>
                    <v-img :src="shop.image_url" class="white--text" height="200px" contain="false"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                    </v-img>
                    <v-card-title>{{ shop.name }}</v-card-title>
                    <v-card-subtitle class="pb-0">
                        <v-sheet>
                            # {{ shop.area.name }}
                        </v-sheet>
                        <v-sheet class="ml-2">
                            # {{ shop.genre.name }}
                        </v-sheet>
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn text :to="`/shop/${shop.id}`" class="bg-blue-accent-4">詳細</v-btn>
                        <v-btn icon :color="shop.favorite ? 'red' : 'gray'">
                            <v-icon @click="toggleFavorite(shop.id)">mdi-heart</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useShopStore } from '@/stores/shops'
import { useAreaStore } from '@/stores/areas'
import { useGenreStore } from '@/stores/genres'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios';

const shopStore = useShopStore()
const areaStore = useAreaStore();
const genreStore = useGenreStore();

const shops = ref([])
const areas = ref([])
const genres = ref([])
const selectedArea = ref(null)
const selectedGenre = ref(null)
const searchText = ref('')

onMounted(async () => {
    await shopStore.fetchShops()
    shops.value = shopStore.shops

    await areaStore.fetchAreas()
    areas.value = areaStore.areas
    areas.value.unshift({ id: 0, name: 'All area' }) //  All areaを先頭に追加


    await genreStore.fetchGenres()
    genres.value = genreStore.genres
    genres.value.unshift({ id: 0, name: 'All genre' }) //  All genreを先頭に追加
});

// 検索条件に合致する店舗を返す
const filteredShops = computed(() => {
    return shops.value.filter(shop => {
        let areaMatch = true
        let genreMatch = true
        let searchMatch = true

        if (selectedArea.value && selectedArea.value !== 'All area') {
            areaMatch = shop.area.name === selectedArea.value
        }

        if (selectedGenre.value && selectedGenre.value !== 'All genre') {
            genreMatch = shop.genre.name === selectedGenre.value
        }

        if (searchText.value) {
            searchMatch = shop.name.toLowerCase().includes(searchText.value.toLowerCase())
        }

        return areaMatch && genreMatch && searchMatch
    })
})

// お気に入り登録/解除処理
const toggleFavorite = async (shopId) => {
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/favorite', {
            shop_id: shopId,
            user_id: 1
        });

        // POSTが成功した場合の処理を追加
        if (response.status === 200) {
            const shop = shops.value.find(shop => shop.id === shopId)
            shop.favorite = !shop.favorite
        } else {
            // POSTが成功したが、レスポンスステータスが異常な場合の処理を行う
            console.error("POST request failed:", response.status);
        }
    } catch (error) {
        console.error("POST request failed:", error);
    }
};
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

.v-card-actions {
    justify-content: space-between;
}
</style>