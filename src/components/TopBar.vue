<template>
  <v-app-bar>
    <v-app-bar-title style="cursor: pointer" @click="$router.push('/')">{{ $t('home') }}</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn @click="$root.$i18n.locale = `RU`" v-bind:class="{'selected-lang' : this.$i18n.locale === 'RU', 'me-4': true}" >RU</v-btn>
    <v-btn @click="$root.$i18n.locale = `KG`" v-bind:class="{'selected-lang' : this.$i18n.locale === 'KG', 'me-4': true}">KG</v-btn>

    <template v-if="auth">
      <v-btn color="purple-accent-3" :to="systemUser ? '/' : '/'">{{ user }}</v-btn>
      <v-btn color="purple-accent-3" icon="mdi-logout" size="small" @click="logout"/>
    </template>
    <template v-else>
      <v-btn color="purple-accent-3" to="/login">{{ $t('login') }}</v-btn>
      <v-btn color="purple-accent-3" to="/signup">{{ $t('register') }}</v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import {mapGetters} from 'vuex'
import router from "@/router";

export default {
  name: 'MyBar',
  computed: {
    ...mapGetters(['user', 'auth', "systemUser"]),
  },
  methods: {
    logout() {
      this.$store.dispatch('user', null);
      this.$store.dispatch('role', null);
      this.$store.dispatch('auth', false);
      this.$store.dispatch('systemUser', false);
      localStorage.removeItem('token')
      router.push({name: 'home'})
    }
  }

}
</script>

<style scoped>
  .selected-lang {
    background-color: red;
  }
</style>
