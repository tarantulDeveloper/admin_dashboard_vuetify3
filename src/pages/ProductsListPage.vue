<template>
    <v-container>
        <h2 class="text-center mb-8">Список продуктов</h2>
        <v-row>
            <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
              <v-card
              class="mx-auto"
              max-width="400">
              <v-img :src="product.imageUrl"
              height="200px"
              cover></v-img>
              
              <v-card-title>
                {{ product.name }}
              </v-card-title>

              <v-card-subtitle class="font-weight-black">
                Цена: {{ product.price }}
              </v-card-subtitle>

              <v-card-subtitle class="font-weight-black">
                Коммиссия: {{ product.commission }}
              </v-card-subtitle>

              <v-card-subtitle class="font-weight-black">
                Процент прибыли системы: {{ product.percentageOfProfitForSystem }}
              </v-card-subtitle>

              <v-card-subtitle class="font-weight-black">
                Процент прибыли дилера: {{ product.percentageOfProfitForDealer }}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                color="purple-accent-3"
                @click="updateProductPage(product.id)">
                Редактировать
                </v-btn>
              </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
    </v-container>
</template>

<script>

import ProductsService from "@/service/product-service";
import router from "@/router";

export default {
  data() {
    return {
      products: []
    };
  },
  async created() {
      try {
        this.products = await ProductsService.fetchAllProducts();
      } catch(error) {
        console.error(error.response.data.message)
      }

  },
  methods: {
    updateProductPage(id) {
        router.push({name: 'product_update', params: {id: id}})
    }
  }
};
</script>