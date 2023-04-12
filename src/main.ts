import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueLazyload from "vue-lazyload";
import Vue3Marquee from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import App from './App.vue'
import router from './router'

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .use(VueLazyload)
    .use(Vue3Marquee)
.mount('#app')
