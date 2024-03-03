<template>
  <div v-if="error">
    <error :error="error"/>
  </div>

  <div v-else>
    <v-container>
      <v-card>
        <v-card-title>
          <h2 class="text-center">{{$t('client_update_title')}}</h2>
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
                    :rules="emailRules"
                />
              </v-col>
              <v-col>
                <v-text-field
                    v-model="user.role"
                    variant="outlined"
                    label="Роль"
                    disabled
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

                      <v-img :src="user.profileImagePath" width="200px" height="200px" cover
                       class="my-4 border border-3"></v-img>

                <v-row>
                  <v-col>
                    <v-text-field
                        :label="$t('registration.personalNumber')"
                        v-model="user.personalNumber"
                        disabled
                        variant="outlined"
                        :rules="personalNumberRules"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                        :label="$t('registration.firstName')"
                        v-model="user.firstName"
                        variant="outlined"
                        :rules="firstNameRules"
                    />
                  </v-col>
                </v-row>
                <v-row>
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

                <v-row>
                  <v-col>
                    <v-text-field
                        :label="$t('registration.citizenship')"
                        v-model="user.citizenship"
                        variant="outlined"
                        :rules="citizenshipRules"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                        :label="$t('registration.documentId')"
                        v-model="user.documentId"
                        variant="outlined"
                        :rules="documentIdRules"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                        :label="$t('registration.authority')"
                        v-model="user.authority"
                        variant="outlined"
                        :rules="authorityRules"
                    />
                  </v-col>

                </v-row>
                <v-row>
                  <v-col>
                    <v-date-picker
                        v-model="user.birthDate"
                        :title="$t('registration.birthDate') + ' ' + ((new Date(user.birthDate)).toLocaleDateString('ru'))"
                        color="purple-accent-3"
                        class="mx-auto border border-3"
                        :max="new Date()"
                    />
                  </v-col>
                  <v-col>

                    <v-date-picker
                        v-model="user.documentIssuedAt"
                        :title="$t('registration.documentIssuedAt')+ ' ' + ((new Date(user.documentIssuedAt)).toLocaleDateString('ru'))"
                        color="purple-accent-3"
                        class="mx-auto border border-3"
                        :max="new Date()"
                    />
                  </v-col>
                  <v-col>
                    <v-date-picker
                        v-model="user.documentExpiresAt"
                        :title="$t('registration.documentExpiresAt') + ' ' + ((new Date(user.documentExpiresAt)).toLocaleDateString('ru'))"
                        color="purple-accent-3"
                        class="mx-auto border border-3"
                        :min="new Date()"
                    />
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
import UserService from "@/service/user-service";
import Error from "@/components/Error.vue";
import router from "@/router";
import {VueTelInput} from "vue-tel-input";

export default {
  name: 'CustomerComponent',
  components: {
    Error,
    VueTelInput
  },
  data() {
    return {
      user: {
        email: '',
        role: '',
        phoneNumber: '',
        activated: null,
        createdAt: '',
        updatedAt: '',
        deleted: null,
        profileImagePath: null,
        personalNumber: '',
        documentId: '',
        authority: '',
        documentIssuedAt: undefined,
        documentExpiresAt: undefined,
        citizenship: '',
        birthDate: undefined,
        firstName: '',
        lastName: '',
        patronymic: ''
      },
      error: null
    }
  },
  async created() {
    try {
      const id = this.$route.params.id;
      const response = await UserService.fetchClientById(id);
      this.user = response;
      this.user.birthDate = new Date(response.birthDate)
      this.user.documentIssuedAt = new Date(response.documentIssuedAt)
      this.user.documentExpiresAt = new Date(response.documentExpiresAt)
    } catch (error) {
      this.error = error.response.data.message;
    }

  },

  methods: {
    async handleSubmit(event) {
      const {valid} = await event
      
      if(!valid) {
        try{
          await UserService.updateClient(this.user);
          router.back()
        } catch(e) {
          this.error = e.response.data.message
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
    personalNumberRules() {
      return [
        v => !!v || this.$t('registration.personalNumberRuleFirst'),
        v => /^[0-9]{14}$/.test(v) || this.$t('registration.personalNumberRuleSecond'),
      ]
    },
    documentIdRules() {
      return [
        v => !!v || this.$t('registration.documentIdRuleFirst'),
        v => /^[a-zA-Z]{2}\d*$/.test(v) || this.$t('registration.documentIdRuleSecond'),
      ]
    },
    authorityRules() {
      return [
        v => !!v || this.$t('registration.authorityRule')
      ]
    },
    citizenshipRules() {
      return [
        v => !!v || this.$t('registration.citizenshipRule'),
        v => /^[a-zA-Zа-яА-Я\s]*$/.test(v) || this.$t('registration.letterRule'),
      ]
    }
  },
}


</script>