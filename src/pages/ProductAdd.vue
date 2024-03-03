<template>
    <v-container>
        <error v-if="error" :error="error"/>
        <v-card class="border border-3">
            <v-card-title class="text-center">
                Добавить новый продукт
            </v-card-title>
            <v-card-item>
                <v-form class="p-2" @submit.prevent="handleSubmit">
                    <v-row>
                        <v-col>
                            <v-text-field
                            label="Название продукта"
                            v-model="productData.name"
                            variant="outlined"
                            prepend-inner-icon="mdi-rename"
                            color="purple-accent-3"
                            :rules="notBlankRule"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                            label="Цена продукта"
                            v-model="productData.price"
                            variant="outlined"
                            prepend-inner-icon="mdi-cash-multiple"
                            color="purple-accent-3"
                            :rules="priceRule"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                            label="Количество продукта"
                            v-model="productData.quantity"
                            variant="outlined"
                            prepend-inner-icon="mdi-clipboard-list-outline"
                            color="purple-accent-3"
                            :rules="quantityRule"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-select
                            label="Валюта"
                            v-model="productData.isoCode"
                            :items="currencies"
                            variant="outlined"
                            prepend-inner-icon="mdi-currency-usd"
                            color="purple-accent-3"
                            :rules="notBlankRule"
                            />
                        </v-col>
                        <v-col>
                            <v-file-input
                            label="Фото продукта"
                            accept="image/*"
                            v-model="productData.file"
                            variant="outlined"
                            color="purple-accent-3"
                            prepend-icon="mdi-image"
                            :rules="notBlankRule"
                            />
                        </v-col>
                        <v-col>
                            <v-select
                            label="Email дилера"
                            v-model="productData.dealerEmail"
                            :items="dealers"
                            variant="outlined"
                            prepend-inner-icon="mdi-at"
                            color="purple-accent-3"
                            :rules="notBlankRule"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                            label="Комиссия"
                            v-model="productData.commission"
                            variant="outlined"
                            prepend-inner-icon="mdi-percent-outline"
                            color="purple-accent-3"
                            :rules="commissionRule"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                            label="Процент системы"
                            v-model="productData.percentageOfProfitForSystem"
                            variant="outlined"
                            prepend-inner-icon="mdi-percent-outline"
                            color="purple-accent-3"
                            :rules="percentageRule"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                            label="Процент дилера"
                            v-model="productData.percentageOfProfitForDealer"
                            variant="outlined"
                            prepend-inner-icon="mdi-percent-outline"
                            color="purple-accent-3"
                            :rules="percentageRule"
                            />
                        </v-col>
                    </v-row>
                    <v-btn
                    type="submit"
                    color="purple-accent-3"
                    block
                    :disabled="!formIsValid"
                    >
                        Добавить
                    </v-btn>
                </v-form>
            </v-card-item>
        </v-card>
    </v-container>
</template>

<script>

import Error from "@/components/Error.vue";
import ProductsService from "@/service/product-service";
import UserService from "@/service/user-service";

export default {
    name: 'ProductAddComponent',
    components: {
        Error
    },
    data() {
        return {
            productData: {
                name: '',
                price: null,
                commission: null,
                isoCode: '',
                file: null,
                percentageOfProfitForDealer: null,
                percentageOfProfitForSystem: null,
                quantity: null,
                dealerEmail: ''
            },
            currencies: ['KGS','KZT', 'RUB', 'USD', 'EUR', 'GBP', 'CNY'],
            dealers: [],
            error: null
        }
    },
    methods: {
        async handleSubmit() {
            const product = new FormData();
            product.append('price', this.productData.price);
            product.append('commission', this.productData.commission);
            product.append('percentageOfProfitForDealer', this.productData.percentageOfProfitForDealer);
            product.append('percentageOfProfitForSystem', this.productData.percentageOfProfitForSystem);
            product.append('name', this.productData.name);
            product.append('isoCode', this.productData.isoCode);
            product.append('quantity', this.productData.quantity);
            product.append('file', this.productData.file[0]);
            product.append('dealerEmail', this.productData.dealerEmail);
            

            try {
                await ProductsService.addProduct(product);
                this.$router.push("/products")
            } catch(e) {
                this.error = e.message;
            }
        }
    },
    async created() {
      try {
        const users = await UserService.fetchAllUsers();

        this.dealers = users
        .filter(user => user.role === 'ROLE_USER')
        .map(user => user.email);  
      } catch(error) {
        console.error(error.response.data.message)
      }

    },
    computed: {
        notBlankRule() {
            return [
                v => !!v || "Поле является обязательным"
            ]
        },
        priceRule() {
            return [
                v => !!v || "Цена является обязательным полем",
                v => /^[1-9]\d*$/.test(v) || this.$t('transactions.amountRuleSecond')
            ]
        },
        quantityRule() {
            return [
                v => !!v || "Количество продукта является обязательным полем",
                v => /^[1-9]\d*$/.test(v) || "Количество продукта должно быть положительным целым числом"
            ]
        },
        commissionRule() {
            return [
                v => !!v || "Коммиссия является обязательным полем",
                v => /^[1-9]\d*$/.test(v) || "Коммиссия должна быть положительным целым числом"
            ]
        },
        percentageRule() {
            return [
                v => !!v || "Процент является обязательным полем",
                v => /^[1-9][0-9]?$|^100$/.test(v) || "Процент должен быть целым числом от 1 до 100"
            ]
        },
        formIsValid() {
            return (
                this.productData.name &&
                this.productData.price &&
                this.productData.commission &&
                this.productData.isoCode &&
                this.productData.quantity &&
                this.productData.file &&
                this.productData.dealerEmail &&
                this.productData.percentageOfProfitForDealer &&
                this.productData.percentageOfProfitForDealer
            );
        }
    }
}

</script>