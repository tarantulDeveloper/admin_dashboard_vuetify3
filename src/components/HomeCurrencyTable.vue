<template>
  <v-container>
    <v-row>
      <v-col lg="9" md="10" sm="12" class="mx-auto">
        <v-data-table
            :headers="translatedHeaders"
            :items="currencies"
            dense
            class="text-center blue-gradient rounded-xl"
        >
          <template v-slot:item="{ item }">
            <tr :key="item.isoCode">
              <td>
                <v-img :src="`assets/${item.isoCode}.png`" alt="country flag" cover width="46" height="34"
                       class="mx-auto"/>
              </td>
              <td>
                {{ item.isoCode }}
              </td>
              <td>
                {{ item.value }}
              </td>
              <td>
                {{ item.value }}
              </td>
            </tr>
          </template>
          <template #bottom></template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CurrencyService from "@/service/currency-service";

export default {
  data() {
    return {
      currencies: []
    }
  },
  computed: {
    translatedHeaders() {
      return [
        {title: this.$t('country'), value: 'isoCode', align: 'center'},
        {title: this.$t('currency_name'), value: 'isoCode', align: 'center'},
        {title: this.$t('buy'), value: 'value', align: 'center'},
        {title: this.$t('sell'), value: 'value', align: 'center'},
      ]
    }
  },
  async created() {
    try {
      this.currencies = await CurrencyService.getCurrencyValues();
    } catch (e) {
      console.log(e.response.data.message)
    }

  }
}
</script>

<style scoped>
.blue-gradient {
  background: linear-gradient(180deg, #C9FCFF -42.91%, rgba(81, 194, 201, 0) 110.18%);
}
</style>