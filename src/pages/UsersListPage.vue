<template>
  <users-table :users-array="usersArray"/>
</template>

<script>
import UsersTable from "@/components/UsersTable.vue";
import UserService from "@/service/user-service";

export default {
    components: {UsersTable},
    data() {
      return {
        usersArray: []
      }
    },
    async created() {
      try {
        this.usersArray = await UserService.fetchAllUsers();
      } catch(error) {
        console.error(error.response.data.message)
      }

    }
  }
</script>