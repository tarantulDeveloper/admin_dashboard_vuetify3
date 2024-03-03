import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './api'
import store from './store/vuex_store'
import {vuetify} from "@/plugins/vuetify.plugin";
import {createI18n} from "vue-i18n";
import Russian from "./locale/ru.json"
import Kyrgyz from "./locale/kg.json"

const i18n = createI18n({
    locale: 'RU',
    messages: {
        RU: Russian,
        KG: Kyrgyz
    },
    legacy: false
})

const app = createApp(App)
app.use(router)
app.use(store)
app.use(vuetify)
app.use(i18n)
app.mount('#app')
