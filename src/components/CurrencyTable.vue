<template>
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card-title>
            <div>
              <span class="headline font-weight-bold">{{$t('currency_table.exchange_rates')}}</span>
              <div class="subheading">SoftCoin</div>
            </div>
          </v-card-title>
          <v-card
            :style="{
              background: 'linear-gradient(to right, #18D1C6, #C437E6)',
            }"
          >
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="rates"
                :items-per-page="10"
              ></v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CurrencyService from "@/service/currency-service";
const rates = ref([]);
const headers = [
  {
    title: "Iso code",
    key: "isoCode",
  },
  {
    title: "Rate",
    key: "value",
  },
];
const fetchData = async () => {
  try {
    rates.value  = await CurrencyService.getCurrencyValues();
  } catch (e) {
    console.error(e.response.data.message);
  }
};
onMounted(async () => {
  await fetchData();
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap");
body {
  font-family: "JetBrains Mono", monospace;
}
</style>
