<template>
  <v-container>
    <error v-if="error" :error="error" />
      <v-form @submit.prevent="handleSignIn">
        <h3>{{$t('login_page_title')}}</h3>
        <v-text-field
          label="Email"
          v-model="email"
          variant="outlined"
          required
          @input="resetError"
        />
        <v-text-field
          :label="$t('registration.password')"
          v-model="password"
          type="password"
          variant="outlined"
          required
          @input="resetError"
        />
        <v-btn color="purple-accent-3" block type="submit">{{$t('login')}}</v-btn>
      </v-form>
  </v-container>
</template>

<script>
import Error from '../components/Error.vue'
import AuthService from "@/service/auth-service";

export default {
  name: 'LoginC',
  components: {
    Error,
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async handleSignIn() {
      try {
        await AuthService.login(this.email, this.password)
        this.email = '';
        this.password = '';
      } catch (e) {
        console.log(e)
        this.email = '';
        this.password = '';
        this.error = this.$t('invalid_login_message')
      }
    },
    resetError() {
      this.error= ''
    }
  },
}
</script>
