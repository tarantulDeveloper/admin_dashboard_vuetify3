<template>
  <v-container>
    <error v-if="error" :error="error"/>
    <v-card class="border border-3">
      <v-card-title class="text-center">{{$t('add_system_user')}}</v-card-title>
      <v-card-item>
        <v-form class="p-2" @submit.prevent="handleSubmit">
          <v-row>
            <v-col>
              <v-text-field
                  label="Email"
                  v-model="user.email"
                  variant="outlined"
                  prepend-inner-icon="mdi-email"
                  color="purple-accent-3"
                  :rules="emailRules"
              />
            </v-col>
            <v-col>
              <v-text-field
                  :label="$t('registration.password')"
                  v-model="user.password"
                  type="password"
                  variant="outlined"
                  prepend-inner-icon="mdi-key"
                  color="purple-accent-3"
                  :rules="passwordRules"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                  v-model="user.role"
                  :items="roles"
                  variant="outlined"
                  label="Роль"
                  color="purple-accent-3"
              />
            </v-col>
            <v-col>
              <vue-tel-input
                  v-model="user.phoneNumber"
                  class="mt-2 mb-7"
                  defaultCountry="KG"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                  :label="$t('registration.firstName')"
                  v-model="user.firstName"
                  variant="outlined"
                  :rules="firstNameRules"
              />
            </v-col>
            <v-col>
              <v-text-field
                  :label="$t('registration.lastName')"
                  v-model="user.lastName"
                  variant="outlined"
                  :rules="lastNameRules"
              />
            </v-col>
            <v-col>
              <v-text-field
                  :label="$t('registration.patronymic')"
                  v-model="user.patronymic"
                  variant="outlined"
                  :rules="patronymicRules"
              />
            </v-col>
          </v-row>
            <v-btn type="submit" color="purple-accent-3" block>{{$t('register_system_user')}}</v-btn>
        </v-form>
      </v-card-item>
    </v-card>
  </v-container>
</template>
<script>

import UserService from "@/service/user-service";
import Error from "@/components/Error.vue";
import {VueTelInput} from "vue-tel-input";

export default {
  name: 'RegisterAdminOrManagerComponent',
  components: {
    Error,
    VueTelInput
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
        role: 'ROLE_MANAGER',
        phoneNumber: ''
      },
      roles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
      error: null
    }
  },
  methods: {
    async handleSubmit(event) {
      const {valid} = await event;
      console.log(valid)
      if(valid) {
        try{
          await UserService.addAdminOrManager(this.user);
          this.user = {
            email: '',
            password: '',
            role: 'ROLE_MANAGER',
            phoneNumber: ''
          }
          this.$router.push("/users")
        } catch(e) {
          this.error = e.response.data.message;
        }
      }
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
        v => v.length >= 6 || this.$t('registration.passwordRuleSecond'),
      ]
    },
    firstNameRules() {
      return [
        v => !!v || this.$t('registration.firstNameRule'),
        v => /^[a-zA-Zа-яА-Я\s]*$/.test(v) || this.$t('registration.letterRule'),
      ]
    },
    lastNameRules() {
      return [
        v => !!v || this.$t('registration.lastNameRule'),
        v => /^[a-zA-Zа-яА-Я\s]*$/.test(v) || this.$t('registration.letterRule'),
      ]
    },
    patronymicRules() {
      return [
        v => /^[a-zA-Zа-яА-Я\s]*$/.test(v) || this.$t('registration.letterRule'),
      ]
    },
  }
}

</script>