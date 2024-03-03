<template>
    <v-container>
        <error v-if="error" :error="error"/>
        <h1>
            password change page
        </h1>
    </v-container>
</template>

<script>
import Error from "@/components/Error.vue";

export default {
  name: 'PasswordChangeComponent',
  components: {
    Error
  },
  data() {
    return {
    }
  },
  methods: {
    handleSubmit() {

    }
  },
  async created() {

  },
  computed: {

  }
}
</script>