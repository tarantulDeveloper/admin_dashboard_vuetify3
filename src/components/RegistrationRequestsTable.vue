<template>
  <div v-if="error">
    <Error :error="error" />
  </div>
  <div v-else>
    <VContainer class="jetbrains_font">
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>{{ $t("registration_requests.title") }}</v-card-title>
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
                    <v-btn class="ma-2" color="success" @click="approve(item)">
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
import RegistrationService from "@/service/registration-service";
import Error from "@/components/Error.vue";

export default {
  name: "RegistrationRequestsTable",
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
          title: "Email",
          value: "email",
        },
        {
          title: this.$t("registration_requests.phoneNumber"),
          value: "phoneNumber",
        },
        {
          title: this.$t("registration_requests.personalNumber"),
          value: "personalNumber",
        },
        {
          title: this.$t("registration_requests.documentId"),
          value: "documentId",
        },
        {
          title: this.$t("registration_requests.authority"),
          value: "authority",
        },
        {
          title: this.$t("registration_requests.documentIssuedAt"),
          value: "documentIssuedAt",
        },
        {
          title: this.$t("registration_requests.documentExpiresAt"),
          value: "documentExpiresAt",
        },
        {
          title: this.$t("registration_requests.citizenship"),
          value: "citizenship",
        },
        {
          title: this.$t("registration_requests.birthDate"),
          value: "birthDate",
        },
        {
          title: this.$t("registration_requests.firstName"),
          value: "firstName",
        },
        {
          title: this.$t("registration_requests.lastName"),
          value: "lastName",
        },
        {
          title: this.$t("registration_requests.patronymic"),
          value: "patronymic",
        },
      ];
    },
  },
  methods: {
    async fetchData() {
      try {
        this.requests =
          await RegistrationService.fetchAllRegistrationRequests();
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
    async reject(itemId) {
      try {
        await RegistrationService.rejectRegistrationRequest(itemId);
        this.requests = this.requests.filter((n) => n.id !== itemId);
      } catch (e) {
        this.error = e.message;
      }
    },
    async approve(item) {
      try {
        await RegistrationService.approveRegistrationRequest(item.id, item);
        this.requests = this.requests.filter((n) => n.id !== item.id);
      } catch (e) {
        this.error = e.message;
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
