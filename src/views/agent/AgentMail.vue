<template>
    <AgentMenu />

    <v-main>
        <v-container fluid width="100%" v-if="loading">
            <p class="pa-5 text-h5 font-weight-bold">お知らせメール作成</p>

            <v-sheet class="w-75 pa-10 mx-auto bg-grey-lighten-3 rounded">
                <table class="mx-auto bg-white" style="border-collapse: collapse;">
                    <tr>
                        <th>テンプレート</th>
                        <td>
                            <select class="border" v-model="emailTemplateId.value"
                                @change="writeMailTemplate(emailTemplateId.value)">
                                <option v-for="emailTemplate in emailTemplateList" :key="emailTemplate.id"
                                    :value="emailTemplate.id">
                                    {{ emailTemplate.name }}
                                </option>
                            </select>
                            <p class="text-red" v-if="emailTemplateId.error_message">
                                {{ emailTemplateId.error_message }}
                            </p>
                            <p class="text-grey-darken-1">※テンプレートを選ぶことで、タイトルと本文が自動で入力されます。</p>
                        </td>
                    </tr>
                    <tr>
                        <th>タイトル</th>
                        <td>
                            <input type="text" class="border" v-model="emailSubject.value" size="50">
                            <p class="text-red" v-if="emailSubject.error_message">
                                {{ emailSubject.error_message }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th>本文</th>
                        <td>
                            <textarea class="border" v-model="emailBody.value" cols="50" rows="10"></textarea>
                            <p class="text-red" v-if="emailBody.error_message">
                                {{ emailBody.error_message }}
                            </p>
                        </td>
                    </tr>
                </table>

                <div class="w-25 mx-auto mt-10 flex justify-between">
                    <v-btn color="primary" @click="resetEmailTemplate()">クリア</v-btn>
                    <v-btn color="primary" @click="showPreviewModal()">プレビュー</v-btn>
                </div>
            </v-sheet>

            <!-- プレビューモーダル -->
            <v-dialog v-model="previewModalFlg" max-width="600">
                <v-card>
                    <v-card-title>プレビュー</v-card-title>

                    <p class="text-red" v-if="errorMessage">
                        {{ errorMessage }}
                    </p>

                    <v-card-text>
                        <div class="text-center">
                            <p class="text-h6">{{ emailSubject.value }}</p>
                            <div class="my-2 px-2 py-1 border text-left" v-html="emailBody.value"></div>
                        </div>
                    </v-card-text>
                    <v-card-actions class="w-25 mx-auto my-5 flex justify-between">
                        <v-btn @click="previewModalFlg = false" class="bg-grey">キャンセル</v-btn>
                        <v-btn @click="sendMail()" class="bg-teal-lighten-1">送信</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- プレビューモーダル -->

        </v-container>

        <v-container v-else>
            <p class="text-center">Loading...</p>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import AgentMenu from '@/components/AgentMenu.vue'
import { useEmaiTtemplatesStore } from '@/stores/email_templates'
import axios from 'axios'
import { useRouter } from 'vue-router'

const emaiTtemplatesStore = useEmaiTtemplatesStore()
const router = useRouter()

const userType = '2' // 2:店舗代表者
const loading = ref(false) // ローディングフラグ
const emailTemplateList = ref(null)  // メールテンプレートリスト

const emailTemplateId = reactive({ value: '', error_message: '' })
const emailSubject = reactive({ value: '', error_message: '' })
const emailBody = reactive({ value: '', error_message: '' })
const errorMessage = ref('') // エラーメッセージ
const error = ref('') // APIエラー

const previewModalFlg = ref(false); // プレビューモーダル表示フラグ

// 選択したメールテンプレートを入力欄に反映
const writeMailTemplate = () => {
    emailTemplateList.value.forEach((emailTemplate) => {
        if (emailTemplate.id == emailTemplateId.value) {
            emailSubject.value = emailTemplate.subject;
            emailBody.value = emailTemplate.body;
        }
    });
}

// メール入力欄のクリア
const resetEmailTemplate = () => {
    emailTemplateId.value = '';
    emailSubject.value = '';
    emailBody.value = '';
}

// プレビューモーダルを表示
const showPreviewModal = () => {
    // バリデーション
    if (validateMail()) {
        // プレビューモーダルを開く
        previewModalFlg.value = true;
    }
}

// メール送信
const sendMail = async () => {
    // バリデーション
    if (validateMail()) {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/admin/send_email', {
                email_template_id: emailTemplateId.value,
                subject: emailSubject.value,
                body: emailBody.value
            });

            // POSTが成功した場合の処理を追加
            if (response.status === 200) {
                // 完了画面に遷移
                router.push({
                    name: 'AgentComplete',
                    state: { message: 'メール送信完了しました。' }
                })
            } else {
                // POSTが成功したが、レスポンスステータスが異常な場合の処理を行う
                console.error("POST request failed:", response.status);
                errorMessage.value = error.response.data.message || 'エラーが発生しました';
            }
        } catch (error) {
            console.error("POST request failed:", error);
            errorMessage.value = error.response.data.message || 'エラーが発生しました';
        }
    }
}

// メールバリデーション
const validateMail = () => {
    if (emailTemplateId.value == '') {
        emailTemplateId.error_message = 'テンプレートを選択してください。';
        return false;
    } else {
        emailTemplateId.error_message = '';
    }
    if (emailSubject.value == '') {
        emailSubject.error_message = 'タイトルを入力してください。';
        return false;
    } else {
        emailSubject.error_message = '';
    }
    if (emailBody.value == '') {
        emailBody.error_message = '本文を入力してください。';
        return false;
    } else {
        emailBody.error_message = '';
    }
    return true;
}

onMounted(async () => {
    // メールテンプレート一覧を取得
    await emaiTtemplatesStore.fetchEmaiTtemplates(userType)
    emailTemplateList.value = emaiTtemplatesStore.emaiTtemplates

    // ローディングフラグをtrueにする
    loading.value = true
});
</script>

<style scoped>
.v-card-actions {
    justify-content: space-between;
}

tr {
    height: 50px;
}

th {
    width: 30%;
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
}

td {
    width: 70%;
    padding: 10px;
    border: 1px solid #ccc;
}
</style>