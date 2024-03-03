<template>
  <v-container>
    <v-app-bar color="#d500f9">
      <v-toolbar-title
      >{{ $t("incomes.income-title") }}:{{Number(balance).toLocaleString()}} {{ currency }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title
      >{{ $t("incomes.purchase-title") }}:{{ purchases }}
      </v-toolbar-title
      >
    </v-app-bar>
    <v-row>
      <v-select
          :items="currencies"
          item-title="name" item-value="isoCode"
          label="Валюта"
          v-model="currency"
          @update:modelValue="onCurrencyChange"
      >
      <template #item="{item, props}">
        <v-list-item v-bind="props">
          <template #title>
            <div class="d-flex align-center">
              <img :src="item.raw.image" alt="image"
                   class="me-3"/>{{ item.raw.name }}
            </div>
          </template>
        </v-list-item>
      </template>
      </v-select>
    </v-row>
    <v-row align-content="center" justify="center">
        <LineChart :chartData="cdata"/>
    </v-row>
    <v-row align-content="center" justify="center">
      <BarChart/>
    </v-row>
    <v-row>
      <v-data-table-virtual
          :headers="headers"
          :items="incomes"
          height="650"
          item-value="name"
          class="income-table"
      ></v-data-table-virtual>
    </v-row>
  </v-container>
</template>

<script>
import LineChart from "../components/LineChart.vue";
import BarChart from "../components/BarChart.vue";
import {onMounted, ref} from "vue";
import purchaseService from "@/service/purchase-service";
import incomeService from "@/service/income-service";

export default {
  name: "IncomePage",
  components: {
    LineChart,
    BarChart,
  },
  setup() {
    const balance = ref(0);
    const purchases = ref(0);
    const cdata = ref([]);
    const headers = [
      {title: "createdAt", align: "start", key: "createdAt"},
      {title: "dealerEmail", align: "end", key: "dealerEmail"},
      {title: "incomeAmount", align: "end", key: "incomeAmount"},
      {title: "systemPortion", align: "end", key: "systemPortion"},
      {title: "productName", align: "end", key: "productName"},
    ];
    const incomes = ref([]);
    const currency = ref('SFC');
    const currencies = ref([
      {name: 'Сом', isoCode: 'KGS', image:'/assets/kyrgyzstan.png'},
      {name: 'Белорусский Рубль', isoCode: 'BYN', image: '/assets/belarus.png'},
      {name: 'Российский Рубль', isoCode: 'RUB', image: '/assets/russia.png'},
      {name: 'Тенге', isoCode: 'KZT', image: '/assets/kazakh.png'},
      {name: 'Американский Доллар', isoCode: 'USD', image: '/assets/united-states.png'},
      {name: 'Юань', isoCode: 'CNY', image: '/assets/china.png'},
      {name: 'Сум', isoCode: 'UZS', image: '/assets/uzbekistan.png'},
      {name: 'Софткоин', isoCode: 'SFC', image: '/assets/Logo.png'},
    ])

    onMounted(async () => {
      try {
        cdata.value = await incomeService.fetchIncomeMonthly(currency.value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      try {
        incomes.value = await incomeService.fetchAllIncomes(currency.value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        balance.value = await incomeService.fetchTotalIncome('SFC');
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        purchases.value = await purchaseService.fetchTotalPurchases();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

    const onCurrencyChange = async (iso) => {
      try {
        balance.value = await incomeService.fetchTotalIncome(iso);
        cdata.value = await incomeService.fetchIncomeMonthly(iso);
        incomes.value = await incomeService.fetchAllIncomes(iso);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    return {cdata, headers, incomes, balance, purchases, currency, currencies, onCurrencyChange};
  },
};
</script>
