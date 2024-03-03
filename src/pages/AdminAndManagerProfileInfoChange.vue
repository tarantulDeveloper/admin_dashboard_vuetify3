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
                                    v-model="email"
                                    variant="outlined"
                                    color="purple-accent-3"
                                    />
                                </v-col>
                                <v-col>
                                    <v-text-field
                                    disabled
                                    label="Роль"
                                    v-model="role"
                                    variant="outlined"
                                    color="purple-accent-3"
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                    label="Номер телефона"
                                    v-model="userInfo.phoneNumber"
                                    variant="outlined"
                                    color="purple-accent-3"
                                    />
                                </v-col>
                                <v-col>
                                    <v-text-field
                                    label="Имя"
                                    v-model="userInfo.firstName"
                                    variant="outlined"
                                    color="purple-accent-3"
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
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
                                    <v-btn 
                                color="purple-accent-3"
                                block
                                @click="$router.push('/password')"
                                >
                                    Изменить пароль
                                </v-btn>
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
                                    @click="$router.push('/')"
                                    >
                                        Отмена
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col>
                            <v-img 
                            :width="267"
                            aspect-ratio="1/1"
                            cover
                            :src="profileImagePath" />
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
import Error from "@/components/Error.vue";
import UserService from "@/service/user-service";
import router from "@/router";

export default {
  name: 'AdminAndManagerProfileInfoChange',
  components: {
    Error
  },
  data() {
    return {
        email: '',
        role: '',
        profileImagePath: '',
        userInfo: {
            firstName: '',
            lastName: '',
            patronymic: '',
            phoneNumber: ''
        },
        error: null,
        newImgFile: null
    }
  },
  methods: {
    async handleSubmit() {
        try{
          await UserService.updateAdminOrManagerInfo(this.userInfo);
          router.back()
        } catch(e) {
          this.error = e.response.data.message
        }
    },
    async handleProfileImgChange() {
        const userProfileImg = new FormData();
        userProfileImg.append('profileImg', this.newImgFile[0]);
        try {
            await UserService.updateImg(userProfileImg);
            router.back()
        } catch (e) {
            this.error = e.response.data.message;
        }
    }
  },
  async created() {
    try {
      const user = await UserService.getAdminOrManagerInfo();
      this.email = user.email;
      this.role = user.role;
      this.profileImagePath = user.profileImagePath;
      this.userInfo.firstName = user.firstName;
      this.userInfo.lastName = user.lastName;
      this.userInfo.patronymic = user.patronymic;
      this.userInfo.phoneNumber = user.phoneNumber;
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
                this.userInfo.phoneNumber
            );
        }
  }
}
</script>