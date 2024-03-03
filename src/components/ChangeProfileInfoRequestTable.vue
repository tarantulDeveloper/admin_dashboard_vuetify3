<template>
    <div v-if="error">
      <Error :error="error" />
    </div>
    <div v-else>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Запросы на изменение профиля</v-card-title>
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
      </v-container>
    </div>
  </template>
  
  <script>
  import Error from "@/components/Error.vue";
  import ProfileChangeService from "@/service/profile-change-service";
  
  export default {
    name: "ChangeProfileInfoRequestTableComponent",
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
            value: "dealerEmail",
          },
          {
            title: this.$t("registration_requests.phoneNumber"),
            value: "phoneNumber",
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
            title: "Дата создания",
            value: "createdAt",
          },
        ];
      },
    },
    methods: {
      async fetchData() {
        try {
          this.requests =
            await ProfileChangeService.fetchAll();
        } catch (e) {
          this.error = e.response.data.message;
        }
      },
      async reject(itemId) {
        try {
          await ProfileChangeService.reject(itemId);
          this.requests = this.requests.filter((n) => n.id !== itemId);
        } catch (e) {
          this.error = e.message;
        }
      },
      async approve(item) {
        try {
          await ProfileChangeService.approve(item.id, item);
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