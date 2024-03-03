<template>
    <v-img src="assets/banner.png" cover/>
  <home-currency-table />
</template>

<script>
import { mapGetters } from 'vuex'
import HomeCurrencyTable from "@/components/HomeCurrencyTable.vue";

export default {
  name: 'HomeComponent',
  components: {
    HomeCurrencyTable
  },
  computed: {
    ...mapGetters(['user', 'role', 'auth']),
  },
}
</script>

<style>

</style>