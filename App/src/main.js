import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './style.css'
import VueCookies from 'vue-cookies'
import { createPinia } from 'pinia'
import gAuthPlugin from 'vue3-google-oauth2'

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const pinia = createPinia()
let gauthClientId = '871148935486-pv0fo955ijm4fo8dber0aepg1shtkq6c.apps.googleusercontent.com';
const app = createApp(App)
  .use(gAuthPlugin, {
    clientId: gauthClientId,
    scope: 'email',
    prompt: 'consent',
    plugin_name: 'Area'
  })
  .use(IonicVue)
  .use(router)
  .use(pinia)
  .use(VueCookies);
  
router.isReady().then(() => {
  app.mount('#app');
});