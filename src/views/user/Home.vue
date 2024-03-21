<template>
    <v-container fluid width="100%">
        <!-- 検索条件 -->
        <v-row class="search">
            <v-col cols="12" sm="6" lg="3">
                <v-select v-model="selectedArea" :items="areas" label="All area"></v-select>
            </v-col>
            <v-col cols="12" sm="6" lg="3">
                <v-select v-model="selectedGenre" :items="genres" label="All genre"></v-select>
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
            <v-col cols="12" sm="6" lg="3" v-for="store in filteredStores" :key="store.id">
                <v-card>
                    <v-img :src="store.image" class="white--text" height="200px" contain="false"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                    </v-img>
                    <v-card-title>{{ store.name }}</v-card-title>
                    <v-card-subtitle class="pb-0">
                        <v-sheet>
                            # {{ store.area.name }}
                        </v-sheet>
                        <v-sheet class="ml-2">
                            # {{ store.genre.name }}
                        </v-sheet>
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn text :to="`/store/${store.id}`" class="bg-blue-accent-4">詳細</v-btn>
                        <v-btn icon :color="store.favorite ? 'red' : 'gray'">
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useStoreStore } from '@/stores/stores'
import { ref } from 'vue'
import { computed } from 'vue'

export default {
    name: 'UserHome',
    setup() {
        const storeStore = useStoreStore()
        const stores = storeStore.stores

        const areas = ['All area', '東京都', '神奈川県', '埼玉県']
        const genres = ['All genre', '居酒屋', 'カフェ', 'ラーメン']

        const selectedArea = ref(null)
        const selectedGenre = ref(null)
        const searchText = ref('')

        const filteredStores = computed(() => {
            return stores.filter(store => {
                let areaMatch = true
                let genreMatch = true
                let searchMatch = true

                if (selectedArea.value && selectedArea.value !== 'All area') {
                    areaMatch = store.area.name === selectedArea.value
                }

                if (selectedGenre.value && selectedGenre.value !== 'All genre') {
                    genreMatch = store.genre.name === selectedGenre.value
                }

                if (searchText.value) {
                    searchMatch = store.name.toLowerCase().includes(searchText.value.toLowerCase())
                }

                return areaMatch && genreMatch && searchMatch
            })
        })

        return {
            areas,
            genres,
            selectedArea,
            selectedGenre,
            searchText,
            filteredStores,
        }
    }
}
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
../../stores/stores