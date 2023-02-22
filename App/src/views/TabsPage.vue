<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/reactivity">
          <ion-label>Home</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-label>Search</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="logs" href="/tabs/logs">
          <ion-label>Logs</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="login" href="/tabs/login">
          <ion-label>Login</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="logout" href="/tabs/logout">
          <ion-label>Logout</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonPage, IonRouterOutlet },
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
    }
  }
});
</script>
