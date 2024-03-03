import axios from 'axios';
import router from './router';
import {baseURL, REFRESH_TOKEN_NAME} from "@/store/variables";
import {ACCESS_TOKEN_NAME} from "@/store/variables";
import VuexStoreService from "@/service/vuex-store-service";



const instance = axios.create({
    baseURL: baseURL
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        ACCESS_TOKEN_NAME
    )}`;
    return config;
})

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem(REFRESH_TOKEN_NAME);
                const authenticationResponse = await axios.post(
                    `${baseURL}/auth/refresh-token?refresh_token=${refreshToken}`);

                localStorage.setItem(ACCESS_TOKEN_NAME, authenticationResponse.data.token);
                localStorage.setItem(REFRESH_TOKEN_NAME, authenticationResponse.data.refresh_token);
                return instance(originalRequest);
            } catch(e) {
                await VuexStoreService.cleaner();
                localStorage.clear();
                await router.push("/login")
                return Promise.reject(e)
            }
        }
        return Promise.reject(error);
    }
)

export default instance;

