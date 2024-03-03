<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>{{ $t("history_purchase.title") }}</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-row>
        <v-col v-for="item in purchaseHistory" :key="item.id" cols="12" sm="6" md="4">
          <purchase-history-item :item="item" />
        </v-col>
      </v-row>
      <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @click="loadPage"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>

import HistoryService from '@/service/history-service';
import PurchaseHistoryItem from "@/components/PurchaseHistoryItem.vue";

export default {
  components: {
    PurchaseHistoryItem
  },
  data() {
    return {
      purchaseHistory: [],
      currentPage: 1,
      itemsPerPage: 12,
      totalPages: 0
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      try {
        const response = await HistoryService.fetchAllHistory(this.currentPage - 1);
        console.log(response.data.content);
        console.log(this.currentPage)
        this.purchaseHistory = response.data.content;
        this.totalPages = response.data.totalPages;

      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    }
  },
};
</script>
