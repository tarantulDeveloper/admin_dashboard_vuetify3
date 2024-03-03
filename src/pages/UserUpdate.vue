<template>
  <div v-if="error">
    <error :error="error"/>
  </div>

  <div v-else>
    <v-container>
      <v-card>
        <v-card-title>
          <h2 class="text-center">{{$t('system_user_update_title')}}</h2>
        </v-card-title>
        <v-card-item>
          <v-form @submit.prevent="handleSubmit" class="p-1">
            <v-row>
              <v-col>
                <v-text-field
                    disabled
                    v-model="user.email"
                    label="Email"
                    variant="outlined"
                />
              </v-col>
              <v-col>
                <v-select
                    v-model="user.role"
                    :items="roles"
                    variant="outlined"
                    label="Роль"
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
                    v-model="user.firstName"
                    label="Firstname"
                    variant="outlined"
                />
              </v-col>
              <v-col>
                <v-text-field
                    v-model="user.lastName"
                    label="Lastname"
                    variant="outlined"
                />
              </v-col>
              <v-col>
                <v-text-field
                    v-model="user.patronymic"
                    label="Patronymic"
                    variant="outlined"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-switch
                    :label="'Статус ' + (user.activated ? $t('active') : $t('blocked'))"
                    v-model="user.activated"
                    color="purple-accent-3"/>
              </v-col>
              <v-col>
                <v-switch
                    :label="$t('deleted') + ': ' + (user.deleted ? $t('yes') : $t('no'))"
                    v-model="user.deleted"
                    color="purple-accent-3"/>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <span>{{$t('created_at')}}: {{ (new Date(user.createdAt)).toLocaleString("ru") }}</span>
              </v-col>
              <v-col>
                <span>{{$t('updated_at')}}: {{ user.updatedAt ? (new Date(user.updatedAt)).toLocaleString("ru") : '' }}</span>
              </v-col>
            </v-row>
            <v-row class="my-4">
              <v-col>
                <v-btn type="submit" block color="green">{{$t('submit')}}</v-btn>
              </v-col>
              <v-col>
                <v-btn color="red" block @click="$router.push('/users')">{{$t('cancel')}}</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-item>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Error from "@/components/Error.vue";
import UserService from "@/service/user-service";
import router from "@/router";
import {VueTelInput} from "vue-tel-input";

export default {
  components: {
    Error,
    VueTelInput
  },
  data() {
    return {
      user: {
        id: null,
        email: '',
        role: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        patronymic: '',
        profileImagePath: '',
        activated: false,
        createdAt: '',
        updatedAt: '',
        deleted: false,
        file: null
      },
      error: null,
      roles: [
          'ROLE_ADMIN', 'ROLE_MANAGER'
      ],
      file: null
    }
  },
  async created() {
    const id = this.$route.params.id;
    try {
      this.user = await UserService.fetchUserById(id);
    } catch (e) {
      this.error = e.response.data.message;
    }
  },
  methods: {
    async handleSubmit(event) {
      const {valid} = await event;

      if(valid) {
        try {
          await UserService.updateAdminOrManager(this.user);
          router.back();
        } catch (e) {
          this.error = e.response.data.message;
        }
      }

    }
  }
}
</script>