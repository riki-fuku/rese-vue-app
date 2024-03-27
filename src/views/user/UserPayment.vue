<template>
    <UserMenu></UserMenu>

    <v-main color="gray-lighten-2">
        <v-container fluid class="w-50 mt-10 mx-auto">

            <p class="pa-5 text-h5">支払い画面</p>

            <p class="pt-1 pb-2 text-deep-orange-accent-1">{{ errorMessages }}</p>

            <v-sheet class="payment border pa-10 bg-light-blue-lighten-4 rounded">
                <form @submit.prevent="submitPayment">
                    <div>
                        <label for="amount">金額</label>
                        <input type="number" class="border ml-3 pa-2 text-right" id="amount" v-model="amount" required>
                    </div>
                    <div class="my-3">
                        <div id="card-element"></div>
                    </div>

                    <v-btn class="me-4 w-100 bg-blue-accent-4" type="submit">
                        支払い
                    </v-btn>
                </form>
            </v-sheet>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserMenu from '@/components/UserMenu.vue'
import { loadStripe } from '@stripe/stripe-js';
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

let stripe, elements, cardElement;

const route = useRoute()
const router = useRouter()

const amount = ref(0)
const errorMessages = ref('')

const submitPayment = async () => {
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
        console.log('Error:', error);
        errorMessages.value = error.message
    } else {
        axios.post(import.meta.env.VITE_API_URL + '/payment', {
            amount: amount.value,
            stripeToken: token.id,
            shop_id: route.params.shopId
        }).then(function (response) {
            console.log(response);
            // 完了画面に遷移
            router.push({
                name: 'UserComplete',
                state: { message: '支払い完了しました。' }
            })
        }).catch(function (error) {
            console.log(error);
            errorMessages.value = '支払いに失敗しました。'
        });
    }
}

onMounted(async () => {
    stripe = await loadStripe('pk_test_51OkE4hI54bKzyAR3qdO6VQWaL7fWU1TtSbLGA6CwTMbFhS7xSYdAmE8jQ2VePuNK6zLPBeZeFfE1ec0i0nzbO2y700VvchYasZ')
    elements = stripe.elements()
    cardElement = elements.create('card')
    cardElement.mount('#card-element')
})
</script>