<script lang="js">
  import { defineComponent } from 'vue';
  import { useAuthStore } from "../../store/auth-store";
  import { logout } from '../../services/auth-service.js';
  import { inject } from "vue";
  import { IonContent, IonPage } from '@ionic/vue';

  export default defineComponent ({
    name: 'LogoutPage',
    components: {
      IonContent,
      IonPage
    },
    beforeMount(){
        logout().then((res) => {
          console.log(res);
          localStorage.setItem("userId", 0);
          this.authStore.update(false);
          try {
            this.$gAuth.signOut();
            //console.log(this.$gAuth.signOut);
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => {
          this.alert = error.response;
        });
    },
    setup() {
      const Vue3GoogleOauth = inject("Vue3GoogleOauth");
      const authStore = useAuthStore();
      return {
        Vue3GoogleOauth,
        authStore,
      };
    }
  })
</script>

<style>
.input-box {
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
}
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(78, 86, 107);
  height: 100%;
}
.signup-title {
  color: white;
  font-size: 30px;
  font-style: italic;
}
.signup-button {
  padding: 20px;
  color: black;
  background-color: white;
  border-radius: 10px;
  font-weight: bold;
}
.signup-google {
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 5px;
}
</style>

<template>
  <ion-page class="ion-align-items-center">
    <ion-content :fullscreen="true" style="max-width: 1000px">
      <div class="signup">
        <h1 class="signup-title">
          You just logged out!
        </h1>
        <router-link class="signup-button" to="/tabs/login">Login back in</router-link>
      </div>
    </ion-content>
    </ion-page>
</template>