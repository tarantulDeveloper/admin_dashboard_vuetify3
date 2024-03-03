<template>
  <div v-if="error">
    <Error :error="error" />
  </div>
  <div v-else>
    <VContainer class="jetbrains_font">
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>{{ $t("transaction_requests.title") }}</v-card-title>
            <v-data-table
              :headers="translatedHeaders"
              :items="requests"
              :items-per-page="10"
            >
              <template v-slot:item="{ item }">
                <tr :key="item.id">
                  <td v-for="header in translatedHeaders" :key="header.title">
                    {{ item[header.value] }}
                  </td>
                  <td>
                    <v-btn
                      class="ma-2"
                      color="success"
                      @click="approve(item.id)"
                    >
                      {{ $t("registration_requests.accept") }}
                      <v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn class="ma-2" color="error" @click="reject(item.id)">
                      {{ $t("registration_requests.decline") }}
                      <v-icon end icon="mdi-cancel"></v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </VContainer>
  </div>
</template>

<script>
import TransactionService from "@/service/transaction-service";
import Error from "@/components/Error.vue";

export default {
  name: "TransactionRequestsTable",
  components: {
    Error,
  },
  data() {
    return {
      requests: [],
      error: null,
    };
  },
  computed: {
    translatedHeaders() {
      return [
        {
          title: "Id",
          value: "id",
        },
        {
          title: this.$t("transaction_requests.sender_email"),
          value: "sender",
        },
        {
          title: this.$t("transaction_requests.receiver_email"),
          value: "receiver",
        },
        {
          title: this.$t("transaction_requests.amount"),
          value: "amount",
        },
        {
          title: this.$t("transaction_requests.created_at"),
          value: "createdAt",
        },
      ];
    },
  },
  methods: {
    async fetchData() {
      try {
        this.requests = await TransactionService.fetchAllTransactionRequests();
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
    async reject(itemId) {
      try {
        await TransactionService.rejectTransactionRequest(itemId);
        this.requests = this.requests.filter((n) => n.id !== itemId);
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
    async approve(itemId) {
      try {
        await TransactionService.approveTransactionRequest(itemId);
        this.requests = this.requests.filter((n) => n.id !== itemId);
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
  },

  async created() {
    await this.fetchData();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap");

.jetbrains_font {
  font-family: "JetBrains Mono", monospace;
}
</style>
