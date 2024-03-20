<template>
    <v-row>
        <v-col cols="12" sm="6" lg="3" v-for="store in stores" :key="store.id">
            <v-card>
                <v-img :src="store.image" class="white--text" height="200px"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                </v-img>
                <v-card-title>{{ store.name }}</v-card-title>
                <v-card-subtitle class="pb-0">{{ store.description }}</v-card-subtitle>
                <v-card-actions>
                    <v-btn text :to="`/`" color="primary">詳細</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { useStoreStore } from '../stores/stores'

export default {
    name: 'Home',
    setup() {
        const storeStore = useStoreStore()
        const stores = storeStore.stores

        return {
            stores
        }
    }
}
</script>