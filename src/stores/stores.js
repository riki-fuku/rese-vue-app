import { defineStore } from 'pinia'

export const useStoreStore = defineStore('storeStore', {
    state: () => ({
        stores: [
            {
                id: 1,
                name: '店舗1',
                area: {
                    id: 1,
                    name: '東京都',
                },
                genre : {
                    id: 1,
                    name: '居酒屋'
                },
                favorite: {
                    id: 1,
                },
                description: '店舗1の説明',
                image: 'top.jpg'
            },
            {
                id: 2,
                name: '店舗2',
                area: {
                    id: 1,
                    name: '東京都',
                },
                genre : {
                    id: 2,
                    name: '焼肉'
                },
                description: '店舗2の説明',
                image: 'top.jpg'
            },
            {
                id: 3,
                name: '店舗3',
                area: {
                    id: 1,
                    name: '東京都',
                },
                genre : {
                    id: 3,
                    name: '寿司'
                },
                description: '店舗3の説明',
                image: 'top.jpg'
            },
            {
                id: 4,
                name: '店舗4',
                area: {
                    id: 1,
                    name: '東京都',
                },
                genre : {
                    id: 4,
                    name: 'イタリアン'
                },
                description: '店舗4の説明',
                image: 'top.jpg'
            },
            {
                id: 5,
                name: '店舗5',
                area: {
                    id: 1,
                    name: '東京都',
                },
                genre : {
                    id: 5,
                    name: 'カフェ'
                },
                description: '店舗5の説明',
                image: 'top.jpg'
            },
            {
                id: 6,
                name: '店舗6',
                area: {
                    id: 1,
                    name: '東京都',
                },
                genre : {
                    id: 6,
                    name: 'ラーメン'
                },
                description: '店舗6の説明',
                image: 'top.jpg'
            },
            {
                id: 7,
                name: '店舗7',
                area: {
                    id: 1,
                    name: '東京都',
                },
                genre : {
                    id: 7,
                    name: '中華'
                },
                description: '店舗7の説明',
                image: 'top.jpg'
            },
            {
                id: 8,
                name: '店舗8',
                area: {
                    id: 1,
                    name: '東京都',
                },
                genre : {
                    id: 8,
                    name: 'カレー'
                },
                description: '店舗8の説明',
                image: 'top.jpg'
            },
            {
                id: 9,
                name: '店舗9',
                area: {
                    id: 1,
                    name: '東京都',
                },
                genre : {
                    id: 9,
                    name: 'スイーツ'
                },
                description: '店舗9の説明',
                image: 'top.jpg'
            },
            {
                id: 10,
                name: '店舗10',
                area: {
                    id: 1,
                    name: '東京都',
                },
                genre : {
                    id: 10,
                    name: 'バー'
                },
                description: '店舗10の説明',
                image: 'top.jpg'
            },

        ],
        store: {
            id: 1,
            name: '店舗1',
            area: {
                id: 1,
                name: '東京都',
            },
            genre : {
                id: 1,
                name: '居酒屋'
            },
            favorite: {
                id: 1,
            },
            description: '店舗1の説明',
            image: '../top.jpg'
        },
    }),
    getters: {
        // getStores: (state) => state.stores,
        // getStoreById: (state) => state.store,
    }
})