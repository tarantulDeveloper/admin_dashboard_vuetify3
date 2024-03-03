import axios from "axios";
import {baseURL, REFRESH_TOKEN_NAME} from "@/store/variables";
import {jwtDecode} from "jwt-decode";
import LocalstorageService from "@/service/localstorage-service";
import {ACCESS_TOKEN_NAME} from "@/store/variables";
import VuexStoreService from "@/service/vuex-store-service";
import router from "@/router";

class AuthService {
    async login(email, password) {
        try {
            const response = await axios.post(`${baseURL}/auth/sign-in`, {
                email: email,
                password: password
            });
            const token = response.data.token;
            const refreshToken = response.data.refresh_token;
            const decodedJwt = jwtDecode(token);
            const authRole = decodedJwt.role;
            const systemUser = (authRole === 'Администратор' || authRole === 'Менеджер' || authRole === 'Пользователь');
            // || authRole === 'Пользователь'
            LocalstorageService.setter(ACCESS_TOKEN_NAME, token);
            LocalstorageService.setter(REFRESH_TOKEN_NAME, refreshToken);

            const profile_photo_url = decodedJwt.profile_photo_url;
            const firstName = decodedJwt.firstName;
            const lastName = decodedJwt.lastName;
            await VuexStoreService.setter(decodedJwt.sub, authRole, true, systemUser, profile_photo_url, firstName, lastName);

            await router.push({name: 'home'})

        } catch (error) {
            LocalstorageService.cleaner();
            await VuexStoreService.cleaner();
            throw error;
        }
    }
}

export default new AuthService();