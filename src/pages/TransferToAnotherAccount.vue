<template>
    <v-container class="mt-8">
        <error v-if="error" :error="error"/>
        <v-card>
            <v-card-title class="text-center">{{ $t("transactions.title") }}</v-card-title>
            <v-card-item>
                <v-form class="p-2" @submit.prevent="handleTransfer">
                    <v-row>
                        <v-col>
                            <v-text-field
                                :label="$t('transaction_requests.receiver_email')"
                                v-model="email"
                                variant="outlined"
                                prepend-inner-icon="mdi-email"
                                color="purple-accent-3"
                                :rules="emailRules"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                :label="$t('transactions.amount')"
                                v-model="amount"
                                variant="outlined"
                                prepend-inner-icon="mdi-cash"
                                color="purple-accent-3"
                                :rules="amountRules"
                            />
                        </v-col>
                    </v-row>
                    <v-btn 
                        type="submit" 
                        color="purple-accent-3" 
                        block 
                        @click="dialog = true"
                        >
                        {{$t('transactions.sendButton')}}
                    </v-btn>

                    <v-dialog
                        v-model="dialog"
                        width="auto"
                        v-if="transferSuccess"
                        >
                        <v-card>
                            <v-card-text>
                                {{$t('transactions.success')}}
                            </v-card-text>
                            <v-card-actions>
                              <v-btn color="purple-accent-3" block @click="dialog = false">{{$t('transactions.closeButton')}}</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-form>
            </v-card-item>
        </v-card>
    </v-container>
</template>

<script>

import Error from "@/components/Error.vue";
import UserService from "@/service/user-service";
import TransferHistoryService from "@/service/transfer-history-service";
import {mapGetters} from "vuex";

export default {
    name: 'TransferToAnotherAccountComponent',
    components: {
        Error
    },
    data() {
        return {
            email: '',
            amount: null,
            dialog: false,
            userInfo : {
                firstName: '',
                lastName: '',
                patronymic: '',
                email: '',
                phoneNumber: '',
                profileImagePath: '',
                birthDate: '',
                citizenship: '',
                balance: ''
            },
            transferSuccess: false,
            error: null
        }
    },
    async created() {
        try {
            this.userInfo = await UserService.getPersonalData();
        } catch (e) {
            this.error = e.response.data.message;
        }
    },
    methods: {
        async handleTransfer() {
            try {
                if(this.email.trim() === this.userInfo.email) {
                    this.error=this.$t('transactions.sameEmailError');
                    this.email='';
                } else if(this.amount > this.userInfo.balance) {
                    this.error= this.$t('transactions.balanceError');
                    this.amount=null;
                } else {
                    await TransferHistoryService.transfer({ email: this.email, amount: this.amount });
                    this.transferSuccess = true;
                    this.error=null;
                    this.email=null;
                    this.amount=null;
                }
            } catch(e) {
                this.error = e.response.data.message;
            }
        }
    },
    computed: {
        emailRules() {
            return [
                v => !!v || this.$t('registration.emailRuleFirst'),
                v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || this.$t('registration.emailRuleSecond')
            ]
        },
        amountRules() {
            return [
                v => !!v || this.$t('transactions.amountRuleFirst'),
                v => /^[1-9]\d*$/.test(v) || this.$t('transactions.amountRuleSecond')
            ]
        },
        ...mapGetters(['user', 'systemUser']),
    }
}

</script>