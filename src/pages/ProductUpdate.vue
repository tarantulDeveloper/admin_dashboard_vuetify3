<template>
    <v-container>
        <error v-if="error" :error="error"/>
        <v-card class="border border-3">
            <v-card-title class="text-center">
                Редактировать продукт
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
                    
                    <v-row>
                        <v-col>
                            <v-btn
                            type="submit"
                            color="purple-accent-3"
                            block
                            :disabled="!formIsValid"
                            >
                            Изменить
                            </v-btn>
                        </v-col>

                        <v-col>
                            <v-btn
                            color="red"
                            block
                            @click="deleteDialog = true"
                            >
                                Удалить продукт
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn
                            color="red"
                            block
                            @click="$router.push('/products')"
                            >
                                Отмена
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-dialog v-model="deleteDialog" width="500">
                          <v-card title="Подтверждение удаления">

                            <v-card-text>
                                Вы действительно хотите удалить продукт?
                            </v-card-text>
                            <v-card-text>
                              Он будет удален навсегда.
                            </v-card-text>
                            
                      
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="red darken-1" variant="outlined" @click="deleteDialog = false">Отмена</v-btn>
                              <v-btn color="red darken-1" variant="outlined" @click="handleDelete">Удалить</v-btn>
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
                id: null,
                price: null,
                commission: null,
                percentageOfProfitForDealer: null,
                percentageOfProfitForSystem: null,
                name: '',
                isoCode: '',
                quantity: null,
                file: null,
                dealerEmail: ''
            },
            currencies: ['KGS','KZT', 'RUB', 'USD', 'EUR', 'GBP', 'CNY'],
            dealers: [],
            error: null, 
            deleteDialog: false
        }
    },
    methods: {
        async handleSubmit() {
            const id = this.$route.params.id;
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
                await ProductsService.updateProduct(id, product);
                this.$router.push("/products")
            } catch(e) {
                this.error = e.message;
            }
        },

        async handleDelete() {
            const id = this.$route.params.id;
            try {
                await ProductsService.deleteProductById(id);
                this.$router.push("/products")
            } catch(e) {
                this.error = e.message;
            }
        }
    },
    async created() {
        const id = this.$route.params.id;
      try {
        const users = await UserService.fetchAllUsers();

        this.dealers = users
        .filter(user => user.role === 'ROLE_USER')
        .map(user => user.email);  
        this.productData = await ProductsService.fetchProductById(id);
      } catch(e) {
        console.error(e.response.data.message);
        this.error = e.response.data.message;
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