<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="welcomepage">
        <h1 class="welcometitle-bg">
          Welcome to our APP!
        </h1>
        <router-link class="welcome-button" to="/tabs/signup">REGISTER HERE NOW!</router-link>
        <h3 class="welcome-account">
          Already have an account? Log In instead
        </h3>
        <router-link class="welcome-login" to="/tabs/login">LOG IN</router-link>
      </div>
    </ion-content>
  </ion-page>
</template>

<style>
.welcomepage {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  background-color: rgb(78, 86, 107);
}
.welcometitle {
  text-align: center;
  font-weight: bold;
  font-style: italic;
  font-size: 65px;
  color: rgb(255, 255, 255);
  margin-top: -172px;
}
.welcometitle-bg {
  text-align: center;
  font-weight: bold;
  font-style: italic;
  font-size: 65px;
  color: white;
  margin-left: 2px;
}
.welcome-button {
  margin-top: 40px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 24px 0px rgba(0,0,0,0.75);
  background: white;
  color: black;
}
.welcome-login {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 24px 0px rgba(0,0,0,0.75);
  background: white;
  color: black;
}
.welcome-account {
  margin-top: 50px;
  color: white;
  text-align: center;
  font-size: 16px;
}
</style>

<script lang="js">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';

export default  defineComponent({
  name: 'Tab1Page',
  components: { IonContent, IonPage }
});
</script>
