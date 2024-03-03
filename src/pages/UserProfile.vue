<template>
  <v-container>
    <v-card class="px-10 py-4">
      <v-row>
        <v-col class="d-flex align-center">
          Статус
          <div id="green_circle"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="8">
          <v-row>
            <v-col>
              <text-card :bold_text="$t('registration.lastName')" :tin_text="userInfo.lastName"/>
            </v-col>
            <v-col>
              <text-card :bold_text="$t('registration_requests.phoneNumber')" :tin_text="userInfo.phoneNumber"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <text-card :bold_text="$t('registration.firstName')" :tin_text="userInfo.firstName"/>
            </v-col>
            <v-col>
              <text-card bold_text="E-mail" :tin_text="user"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <text-card :bold_text="$t('registration.patronymic')" :tin_text="userInfo.patronymic"/>
            </v-col>
            <v-col>
              <text-card :bold_text="$t('registration.birthDate')" :tin_text="userInfo.birthDate"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <text-card :bold_text="$t('balance')" :tin_text="`${Number(balance).toLocaleString()} ${currency}`"/>
            </v-col>
            <v-col>
              <text-card :bold_text="$t('registration.citizenship')" :tin_text="userInfo.citizenship"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                  :items="currencies"
                  item-title="name" item-value="isoCode"
                  label="Валюта"
                  v-model="currency"
                  variant="outlined"
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
            </v-col>
          </v-row>
        </v-col>
        <v-col md="4">
          <v-img :src="userInfo.profileImagePath"/>
        </v-col>
        <v-col>
          <v-btn
              color="purple-accent-3"
              block
              @click="handleProfileChange"
          >
            Редактировать профиль
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import TextCard from "@/components/TextCard.vue";
import UserService from "@/service/user-service";
import {mapGetters} from "vuex";
import router from "@/router";

export default {
  name: 'UserProfile',
  components: {
    TextCard
  },
  data() {
    return {
      userInfo: {
        firstName: '',
        lastName: '',
        patronymic: '',
        email: '',
        phoneNumber: '',
        profileImagePath: '',
        birthDate: '',
        citizenship: '',
        balance: ''
      },
      error: null,
      currencies: [
        {name: 'Сом', isoCode: 'KGS', image: '/assets/kyrgyzstan.png'},
        {name: 'Белорусский Рубль', isoCode: 'BYN', image: '/assets/belarus.png'},
        {name: 'Российский Рубль', isoCode: 'RUB', image: '/assets/russia.png'},
        {name: 'Тенге', isoCode: 'KZT', image: '/assets/kazakh.png'},
        {name: 'Американский Доллар', isoCode: 'USD', image: '/assets/united-states.png'},
        {name: 'Юань', isoCode: 'CNY', image: '/assets/china.png'},
        {name: 'Сум', isoCode: 'UZS', image: '/assets/uzbekistan.png'},
        {name: 'Софткоин', isoCode: 'SFC', image: '/assets/Logo.png'},
      ],
      currency: 'SFC',
      balance: 0
    }
  },
  methods: {
    async handleProfileChange() {
      await router.push({name: 'change_profile_info'})
    },
    async onCurrencyChange() {
      try {
        this.balance = await UserService.getPersonalBalance(this.currency);
      } catch (e) {
        console.log(e.message)
      }

    }
  },
  async created() {
    try {
      this.userInfo = await UserService.getPersonalData();
      this.balance = this.userInfo.balance;
      this.userInfo.birthDate = new Date(this.userInfo.birthDate).toLocaleString("ru");
    } catch (e) {
      this.error = e.response.data.message;
    }
  },
  computed: {
    ...mapGetters(['user', 'systemUser']),
  }
}
</script>

<style scoped>
#green_circle {
  background: rgba(28, 214, 80, 1);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 10px;
}
</style>