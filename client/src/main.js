import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import VueCookies from 'vue-cookies'
import { createPinia } from 'pinia'
import gAuthPlugin from 'vue3-google-oauth2'

const pinia = createPinia()
let gauthClientId = '871148935486-pv0fo955ijm4fo8dber0aepg1shtkq6c.apps.googleusercontent.com';
createApp(App).use(gAuthPlugin, {
    clientId: gauthClientId,
    scope: 'email',
    prompt: 'consent',
    plugin_name: 'Area'
}).use(router).use(VueCookies).use(pinia).mount('#app')
