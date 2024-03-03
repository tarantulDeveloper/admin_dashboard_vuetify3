<template>
  <v-container>
    <error v-if="error" :error="error"/>
    <v-card class="border border-3">
      <v-card-title class="text-center">
        Редактирование моего профиля
      </v-card-title>

      <v-card-item>
        <v-form class="p-2" @submit.prevent="handleSubmit">
          <v-row>
            <v-col>
              <v-row>
                <v-col>
                  <v-text-field
                      disabled
                      label="Email"
                      v-model="userInfo.email"
                      variant="outlined"
                      color="purple-accent-3"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                      label="Номер телефона"
                      v-model="userInfo.phoneNumber"
                      variant="outlined"
                      color="purple-accent-3"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                      label="Имя"
                      v-model="userInfo.firstName"
                      variant="outlined"
                      color="purple-accent-3"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                      label="Фамилия"
                      v-model="userInfo.lastName"
                      variant="outlined"
                      color="purple-accent-3"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                      label="Отчество"
                      v-model="userInfo.patronymic"
                      variant="outlined"
                      color="purple-accent-3"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                      label="Персональный номер"
                      v-model="userInfo.personalNumber"
                      variant="outlined"
                      color="purple-accent-3"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                      label="Номер документа"
                      v-model="userInfo.documentId"
                      variant="outlined"
                      color="purple-accent-3"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                      label="Орган выдачи"
                      v-model="userInfo.authority"
                      variant="outlined"
                      color="purple-accent-3"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                      label="Гражданство"
                      v-model="userInfo.citizenship"
                      variant="outlined"
                      color="purple-accent-3"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                      type="submit"
                      color="purple-accent-3"
                      block
                      :disabled="!formIsValid"
                  >
                    Изменить
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                      color="red"
                      block
                      @click="$router.push('/profile')"
                  >
                    Отмена
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col md="4">
              <v-img :src="userInfo.profileImagePath"/>
              <v-file-input
                  class="mt-5"
                  label="Фото профиля"
                  accept="image/*"
                  variant="outlined"
                  color="purple-accent-3"
                  prepend-icon="mdi-image"
                  v-model="newImgFile"
              />
              <v-btn
                  color="purple-accent-3"
                  block
                  @click="handleProfileImgChange"
              >
                Изменить фото профиля
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-item>

    </v-card>
  </v-container>
</template>


<script>
import UserService from "@/service/user-service";
import Error from "@/components/Error.vue";
import VuexStoreService from "@/service/vuex-store-service";

export default {
  name: 'DealerProfileInfoChangeComponent',
  components: {
    Error
  },
  data() {
    return {
      userInfo: {
        firstName: '',
        lastName: '',
        patronymic: '',
        email: '',
        phoneNumber: '',
        profileImagePath: '',
        personalNumber: '',
        documentId: '',
        authority: '',
        documentIssuedAt: undefined,
        documentExpiresAt: undefined,
        citizenship: '',
        birthDate: undefined
      },
      error: null,
      newImgFile: null
    }
  },
  methods: {
    async handleSubmit() {
      try {
        await UserService.changePersonalInfo(this.userInfo);
        this.$router.push("/profile")
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
    async handleProfileImgChange() {
      const userProfileImg = new FormData();
      userProfileImg.append('profileImg', this.newImgFile[0]);
      try {
        const response = await UserService.updateImg(userProfileImg);
        await VuexStoreService.setProfilePhotoUrl(response.message);
        this.$router.push("/profile")
      } catch (e) {
        this.error = e.response.data.message;
      }
    }
  },
  async created() {
    try {
      this.userInfo = await UserService.getPersonalData();
    } catch (e) {
      this.error = e.response.data.message;
    }
  },
  computed: {
    formIsValid() {
      return (
          this.userInfo.firstName &&
          this.userInfo.lastName &&
          this.userInfo.patronymic &&
          this.userInfo.phoneNumber &&
          this.userInfo.personalNumber &&
          this.userInfo.documentId &&
          this.userInfo.authority &&
          this.userInfo.citizenship
      );
    }
  }
}
</script>