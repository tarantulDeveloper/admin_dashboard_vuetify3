<template>
  <v-container>
    <div>
      <div v-if="error">
        <error :error="error"/>
      </div>
      <v-card>
        <v-card-title class="text-center">
          {{ $t('register_dealer') }}
        </v-card-title>
        <v-card-item>
          <v-form @submit.prevent="handleSignUp" class="m-4" fast-fail>
            <v-text-field
                label="Email"
                v-model="userInfo.email"
                :rules="emailRules"
                variant="outlined" required
                maxlength="50"
            />
            <v-text-field
                :type="passwordFieldType"
                :label="$t('registration.password')"
                v-model="userInfo.password"
                :rules="passwordRules"
                variant="outlined"
                required
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="togglePasswordVisibility"
                maxlength="50"
            />
            <v-text-field
                :type="passwordFieldType"
                :label="$t('registration.password')"
                v-model="userInfo.confirmPassword"
                :rules="confirmPasswordRules"
                variant="outlined"
                required
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="togglePasswordVisibility"
                maxlength="50"
            />
            <v-text-field
                :label="$t('registration.firstName')"
                v-model="userInfo.firstName"
                :rules="firstNameRules"
                variant="outlined" required
                maxlength="50"
            />
            <v-text-field
                :label="$t('registration.lastName')"
                v-model="userInfo.lastName"
                :rules="lastNameRules"
                variant="outlined" required
                maxlength="50"
            />
            <v-text-field
                :label="$t('registration.patronymic')"
                v-model="userInfo.patronymic"
                variant="outlined"
                :rules="patronymicRules"
                maxlength="50"
            />
            <v-text-field
                :label="$t('registration.birthDate')"
                type="date"
                v-model="userInfo.birthDate"
                :rules="birthDateRules"
                :max="new Date().toISOString().substr(0, 10)"
                variant="outlined" required
            />
            <v-row>
              <v-col cols="2">
                <v-select :items="countries" item-title="name" item-value="code"
                          @update:model-value="updatePhoneNumber" v-model="selectedCountry"
                          :label="$t('registration.country')"
                          variant="outlined">
                  <template #item="{item, props}">
                    <v-list-item v-bind="props">
                      <template #title>
                        <div class="d-flex align-center"><img :src="item.raw.image" alt="image"
                                                              class="me-3"/>{{ item.raw.name }}
                        </div>
                      </template>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="10">
                <v-text-field
                    :label="$t('registration.phoneNumber')"
                    :rules="phoneNumberRules"
                    v-model="userInfo.phoneNumber"
                    variant="outlined" required/>
              </v-col>
            </v-row>

            <v-text-field
                :label="$t('registration.personalNumber')"
                v-model="userInfo.personalNumber"
                :rules="personalNumberRules"
                variant="outlined" required
                placeholder="20707199500567"
                persistent-placeholder
                maxlength="15"
            />
            <v-row>
              <v-col cols="2">
                <v-select
                    v-model="selectedSeries"
                    :items="passportSeries"
                    :label="$t('registration.passportSeries')"
                    variant="outlined"
                    maxlength="10"
                />
              </v-col>
              <v-col cols="10">
                <v-text-field
                    :label="$t('registration.documentId')"
                    v-model="userInfo.documentId"
                    :rules="documentIdRules"
                    variant="outlined" required
                    placeholder="1234567"
                    persistent-placeholder
                />
              </v-col>
            </v-row>
            <v-text-field
                :label="$t('registration.authority')"
                v-model="userInfo.authority"
                :rules="authorityRules"
                variant="outlined" required
                maxlength="50"
            />
            <v-text-field
                :label="$t('registration.documentIssuedAt')"
                type="date"
                v-model="userInfo.documentIssuedAt"
                :rules="documentIssuedAtRules"
                :max="new Date().toISOString().substr(0, 10)"
                variant="outlined" required
            />
            <v-text-field
                :label="$t('registration.documentExpiresAt')"
                type="date"
                v-model="userInfo.documentExpiresAt"
                :rules="documentExpiresAtRules"
                :min="new Date().toISOString().substr(0, 10)"
                variant="outlined" required
            />
            <v-select :items="countries" item-title="name" item-value="name"
                      :label="$t('registration.citizenship')"
                      variant="outlined"
                      v-model="userInfo.citizenship"
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
            <v-btn type="submit" block color="purple-accent-3">
              {{ $t('registration.title') }}
            </v-btn>
          </v-form>
        </v-card-item>
      </v-card>
    </div>
  </v-container>
  <v-dialog
      v-model="showRegisterMessage"
      width="auto"
  >
    <v-card>
      <v-card-text>
        {{ $t('dealer_added_message') }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="showRegisterMessage = false">ОК</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Error from "@/components/Error.vue";
import data from "@/store/countries";
import UserService from "@/service/user-service";

export default {
  name: 'RegisterPage',
  components: {
    Error,
  },
  data() {
    return {
      countries: data,
      selectedCountry: data[0],
      userInfo: {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        patronymic: '',
        birthDate: null,
        phoneNumber: '+996',
        personalNumber: '',
        documentId: '',
        authority: '',
        documentIssuedAt: '',
        documentExpiresAt: '',
        citizenship: 'Кыргызстан'
      },
      error: null,
      passportSeries: ['AN', 'ID', 'AC', 'AD', 'PE', 'PD', 'PS'],
      selectedSeries: 'AN',
      showPassword: false,
      passwordFieldType: 'password',
      showRegisterMessage: false,
    }
  },
  computed: {
    emailRules() {
      return [
        v => !!v || this.$t('registration.emailRuleFirst'),
        v => /.+@.+\..+/.test(v) || this.$t('registration.emailRuleSecond'),
      ]
    },
    passwordRules() {
      return [
        v => !!v || this.$t('registration.passwordRuleFirst'),
        v => !/\s/.test(v) || this.$t('registration.passwordNoWhitespaceRule'),
        v => v.length >= 6 || this.$t('registration.passwordRuleSecond'),
      ]
    },
    confirmPasswordRules() {
      return [
        v => !!v || this.$t('registration.confirmPasswordRuleFirst'),
        v => !/\s/.test(v) || this.$t('registration.passwordNoWhitespaceRule'),
        v => v === this.userInfo.password || this.$t('registration.confirmPasswordRuleSecond'),
      ]
    },
    firstNameRules() {
      return [
        v => !!v || this.$t('registration.firstNameRule'),
        v => /^[a-zA-Zа-яА-Я\s]*$/.test(v) || this.$t('registration.letterRule'),
        v => !/^\s*$/.test(v) || this.$t('registration.noWhitespaceRule')
      ]
    },
    lastNameRules() {
      return [
        v => !!v || this.$t('registration.lastNameRule'),
        v => /^[a-zA-Zа-яА-Я\s]*$/.test(v) || this.$t('registration.letterRule'),
        v => !/^\s*$/.test(v) || this.$t('registration.noWhitespaceRule')
      ]
    },
    patronymicRules() {
      return [
        v => /^[a-zA-Zа-яА-Я\s]*$/.test(v) || this.$t('registration.letterRule'),
        v => !/^\s*$/.test(v) || this.$t('registration.noWhitespaceRule')
      ]
    },
    phoneNumberRules() {
      return [
        v => !!v || this.$t('registration.phoneNumberRuleFirst'),
        v => !/\s/.test(v) || this.$t('registration.phoneNumberNoWhitespaceRule'),
        v => /^[0-9+]*$/.test(v) || this.$t('registration.phoneNumberRuleSecond'),
      ]
    },
    birthDateRules() {
      return [
        v => !!v || this.$t('registration.birthDateRule'),
      ]
    },
    personalNumberRules() {
      return [
        v => !!v || this.$t('registration.personalNumberRuleFirst'),
        v => /^[0-9]{14}$/.test(v) || this.$t('registration.personalNumberRuleSecond'),
      ]
    },
    documentIdRules() {
      return [
        v => !!v || this.$t('registration.documentIdRuleFirst'),
        v => /^\d+$/.test(v) || this.$t('registration.documentIdRuleSecond'),
      ]
    },
    authorityRules() {
      return [
        v => !!v || this.$t('registration.authorityRule'),
        v => !/^\s*$/.test(v) || this.$t('registration.noWhitespaceRule')
      ]
    },
    documentIssuedAtRules() {
      return [
        v => !!v || this.$t('registration.documentIssuedAtRule'),
      ]
    },
    documentExpiresAtRules() {
      return [
        v => !!v || this.$t('registration.documentExpiresAtRule'),
      ]
    },
    citizenshipRules() {
      return [
        v => !!v || this.$t('registration.citizenshipRule'),
      ]
    }
  },
  methods: {
    async handleSignUp(event) {
      console.log(event)
      const {valid} = await event;
      if (valid) {
        try {
          Object.keys(this.userInfo).forEach(key => {
            if (typeof this.userInfo[key] === 'string') {
              this.userInfo[key] = this.userInfo[key].trim();
            }
          });
          const userToSend = {...this.userInfo, documentId: this.selectedSeries + this.userInfo.documentId}
          await UserService.addDealerByManager(userToSend);
          this.showRegisterMessage = true;
          this.userInfo = {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            patronymic: '',
            birthDate: '',
            phoneNumber: '',
            personalNumber: '',
            documentId: '',
            authority: '',
            documentIssuedAt: '',
            documentExpiresAt: '',
            citizenship: ''
          }
        } catch (e) {
          if (e.response) {
            this.error = e.response.data.message;
            console.log(e.response.data.message)
          } else {
            this.error = e.message;
          }

        }
      }

    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      this.passwordFieldType = this.showPassword ? 'text' : 'password';
    },
    updatePhoneNumber(event) {
      this.userInfo.phoneNumber = event
    },
  },
}
</script>
