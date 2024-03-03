<template>
  <div v-if="error">
    <error :error="error"/>
  </div>
  <div v-else>
    <v-table
        fixed-header
    >
      <thead>
      <tr>
        <th class="text-left">
          Email
        </th>
        <th class="text-left">
          Роль
        </th>
        <th class="text-left">
          {{$t('deleted')}}
        </th>
        <th class="text-left">
          {{$t('active')}}
        </th>
        <th class="text-center">
          {{$t('actions')}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="u in usersArray"
          :key="u.id"
          v-show="user !== u.email"
      >
        <td>{{ u.email }}</td>
        <td>{{ u.role }}</td>
        <td>
          <v-switch
              v-model="u.deleted"
              color="primary"
              :label="`${u.deleted ? 'True' : 'False'}`"
              disabled
          />
        </td>
        <td>
          <v-switch
              v-model="u.activated"
              color="primary"
              :label="`${u.activated ? 'true' : 'false'}`"
              @click.prevent="handleActivate(u)"
          />
        </td>
        <td class="text-center"><v-btn icon="mdi-pencil-circle-outline" color="purple-accent-3" @click="handleRoute(u.role, u.id)"></v-btn></td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import router from "@/router";
  import UserService from "@/service/user-service";
  import Error from "@/components/Error.vue";

  export default {
    name: 'UserTable',
    components: {
      Error
    },
    data() {
      return {
        showActivateDialog: false,
        error: null
      }
    },
    props: {
      usersArray: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      ...mapGetters(['user']),
    },
    methods: {
      handleRoute(role, id) {
        if(role === 'ROLE_USER') {
          router.push({name: 'client_update', params: {id: id}})
        } else {
          router.push({name: 'user_update', params: {id: id}})
        }
      },

      async handleActivate(u) {
        try{
          console.log(u)
          const response = await UserService.changeActivatedStatusOfUserById(u.id, !u.activated);
          console.log(response)
          u.activated = response.activated;
          return response;
        } catch (e) {
          this.error = e.response.data.message;
        }

      }
    }
  }
</script>