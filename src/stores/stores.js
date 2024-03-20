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
                description: '店舗1の説明',
                image: 'top.jpg'
            },
            {
                id: 2,
                name: '店舗2',
                area: {
                    id: 2,
                    name: '神奈川県',
                },
                genre : {
                    id: 2,
                    name: '寿司'
                },
                description: '店舗2の説明',
                image: 'top.jpg'
            },
            {
                id: 3,
                name: '店舗3',
                area: {
                    id: 3,
                    name: '千葉県',
                },
                genre : {
                    id: 3,
                    name: '焼肉'
                },
                description: '店舗3の説明',
                image: 'top.jpg'
            },
            {
                id: 4,
                name: '店舗4',
                area: {
                    id: 4,
                    name: '埼玉県',
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
                    id: 5,
                    name: '大阪府',
                },
                genre : {
                    id: 5,
                    name: '中華'
                },
                description: '店舗5の説明',
                image: 'top.jpg'
            },
            {
                id: 6,
                name: '店舗6',
                area: {
                    id: 6,
                    name: '京都府',
                },
                genre : {
                    id: 6,
                    name: 'カフェ'
                },
                description: '店舗6の説明',
                image: 'top.jpg'
            },
            {
                id: 7,
                name: '店舗7',
                area: {
                    id: 7,
                    name: '沖縄県',
                },
                genre : {
                    id: 7,
                    name: '居酒屋'
                },
                description: '店舗7の説明',
                image: 'top.jpg'
            },
            {
                id: 8,
                name: '店舗8',
                area: {
                    id: 8,
                    name: '北海道',
                },
                genre : {
                    id: 8,
                    name: '寿司'
                },
                description: '店舗8の説明',
                image: 'top.jpg'
            },
            {
                id: 9,
                name: '店舗9',
                area: {
                    id: 9,
                    name: '福岡県',
                },
                genre : {
                    id: 9,
                    name: '焼肉'
                },
                description: '店舗9の説明',
                image: 'top.jpg'
            },
            {
                id: 10,
                name: '店舗10',
                area: {
                    id: 10,
                    name: '愛知県',
                },
                genre : {
                    id: 10,
                    name: 'イタリアン'
                },
                description: '店舗10の説明',
                image: 'top.jpg'
            },
            {
                id: 11,
                name: '店舗11',
                area: {
                    id: 11,
                    name: '大阪府',
                },
                genre : {
                    id: 11,
                    name: '中華'
                },
                description: '店舗11の説明',
                image: 'top.jpg'
            },
        ]
    }),
    getters: {
        getStores: (state) => state.stores,
    }
})