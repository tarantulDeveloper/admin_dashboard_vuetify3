<template>
  <v-container>
    <v-row>
      <v-col>
        <error v-if="error" :error="error"/>
        <v-card class="mt-5 border border-4">
          <v-card-title>
            <h2 class="text-center">{{ $t('set_softcoin_rate') }}</h2>
          </v-card-title>
          <v-card-item>
            <v-form @submit.prevent="handleSubmit" class="p-1">
              <v-row>
                <v-col>
                  <span>{{ $t('current_rate') }}: <span id="rate_value"><u>{{ rate.value }}</u></span></span>
                </v-col>
                <v-col>
                  <span>{{ $t('so') }}: <u>{{ rate.value }} софткоин = 1 сом</u></span>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                      v-model="new_rate_softcoin"
                      type="number"
                      @keydown="updateValue"
                      min="0.00000001"
                      step="0.0001"
                      max="9999999999"
                      :label="$t('new_rate')"
                      variant="outlined"
                  >
                  </v-text-field>
                  <span v-if="exceedsMaxLength" class="text-red-darken-3">{{ $t('maximum_length_reached') }}</span>
                  <span v-if="fourDigitsAfterDot" class="text-red-darken-3">{{ $t('four_digits_after_dot_error') }}</span>
                </v-col>
              </v-row>
              <v-row class="my-4">
                <v-col>
                  <v-btn type="submit" block color="green">{{ $t('submit') }}</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
        v-model="showMessage"
        width="auto"
    >
      <v-card>
        <v-card-text>
          {{ $t('rate_updated') }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="showMessage = false">ОК</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import CurrencyService from "@/service/currency-service";
import Error from "@/components/Error.vue";

export default {
  components: {
    Error
  },
  data() {
    return {
      rate: {
        isoCode: '',
        value: 0
      },
      new_rate_softcoin: 0,
      error: null,
      exceedsMaxLength: false,
      showMessage: false,
      fourDigitsAfterDot: false
    }
  },
  methods: {
    async handleSubmit(event) {
      try {
        if (this.new_rate_softcoin < 0.0001) {
          this.error = "0 factor!!!"
          event.preventDefault();
          return;
        }
        await CurrencyService.setSoftcoinRate({value: this.new_rate_softcoin});
        this.showMessage = true;
        await this.getSoftcoinRate();
        this.error = null
      } catch (e) {
        console.log(e.message)
        if (e.response) {
          this.error = e.response.data;
        } else {
          this.error = e.message;
        }
      }
    },
    updateValue(event) {
      const newRateString = String(this.new_rate_softcoin);
      const decimalIndex = newRateString.indexOf('.');
      if (
          (event.key === '-' || event.key === '+') || (event.key === '.' && newRateString === '')
      ) {
        event.preventDefault();
      } else if ((newRateString.length >= 10)) {
        if ((event.key !== 'Backspace' && event.key !== 'Delete')) {
          event.preventDefault();
          this.exceedsMaxLength = true;
        }
      } else if (decimalIndex !== -1 && newRateString.length - decimalIndex > 4) {
        if (event.key !== 'Backspace' && event.key !== 'Delete') {
          event.preventDefault();
          this.fourDigitsAfterDot = true;
        }
      } else {
        this.exceedsMaxLength = false;
        this.fourDigitsAfterDot = false;
      }
    },

    async getSoftcoinRate() {
      try {
        const response = await CurrencyService.getCurrencyRate("SFC");
        this.new_rate_softcoin = response.value;
        this.rate = response;
      } catch (e) {
        if (e.response) {
          this.error = e.response.data;
        } else {
          this.error = e.message;
        }
      }
    }
  },

  async created() {
    await this.getSoftcoinRate();
  },

}
</script>

<style scoped>
#rate_value {
  font-weight: bold;
  color: green;
}
</style>