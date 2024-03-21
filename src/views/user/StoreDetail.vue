<template>
    <v-container>
        <div class="d-flex">
            <v-container class="mx-2">

                <div class="d-flex">
                    <v-btn text @click="$router.go(-1)">
                        <v-icon left>mdi-chevron-left</v-icon>
                    </v-btn>

                    <p class="text-h4 ml-3 pt-auto font-weight-bold">
                        {{ store.name }}
                    </p>
                </div>



                <v-img :src="store.image" class="white--text w-100 mt-5" />


                <v-card-subtitle class="pb-0">
                    <v-sheet>
                        # {{ store.area.name }}
                    </v-sheet>
                    <v-sheet class="ml-2">
                        # {{ store.genre.name }}
                    </v-sheet>
                </v-card-subtitle>
            </v-container>
            <v-container class="bg-blue-accent-4 mx-2">

                <v-btn min-width="400px" class="my-2">
                    min-width=400px のボタン
                </v-btn>

                <p>
                    min-width を指定すると、ブラウザの横幅が小さい方向へリサイズされた
                    ときでも、その幅以下にはならない。親要素や画面からはみでるようになる。
                </p>

                <v-sheet width="300px" class="bg-red-lighten-5 my-4">
                    <v-text-field label="text field" hide-details="auto"></v-text-field>
                </v-sheet>

                <p>
                    v-text-field のように width が指定できない要素は、v-sheet などの
                    中に置いて、親要素側で width を指定する。
                </p>

                <v-list class="overflow-y-auto my-3" max-height="20ex" min-height="10ex">
                    <v-list-item v-for="k in 2" :key="k">
                        item {{ k }}
                    </v-list-item>
                </v-list>

                <v-list class="overflow-y-auto my-3" max-height="20ex" min-height="10ex">
                    <v-list-item v-for="k in 5" :key="k">
                        item {{ k }}
                    </v-list-item>
                </v-list>

                <p>v-list のように、中に含む要素が可変の場合は max-height、min-height
                    を指定することで、要素数が少ないときは高さを小さくしつつ、
                    要素数が増えたときでも高さに上限を付けることができる。
                </p>

            </v-container>
        </div>
    </v-container>
</template>

<script>
import { useStoreStore } from '@/stores/stores'

export default {
    name: 'UserStoreDetail',
    setup() {
        const storeStore = useStoreStore()
        const store = storeStore.store

        return {
            store,
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
</style>