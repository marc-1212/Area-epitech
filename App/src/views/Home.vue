<template>
  <ion-page class="ion-align-items-center">


    <ion-content :fullscreen="true" style="max-width: 1000px">
      <div class="signup">
        <div class="py-10 h-screen bg-gray-700 px-2">
          <!----GRID--->
          <div class="relative mx-auto max-w-7xl">
            <div class="grid gap-x-8 gap-y-8 grid-cols-3 md:gap-1">
              <!----DISCORD--->
              <div class="service">
                <h1 class="service-title">REDDIT</h1>
                <input class="input-box" type="password" placeholder="reddit client id" v-model="redditClient">
                <input class="input-box" type="password" placeholder="reddit secret id" v-model="redditSecret">
                <button @click="auth" class="logs-button">Log In</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style>
.service {
  width: 250px;
  height: 250px;
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  margin-top: 50px;
}

.service-title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
}

.service-input {
  border: 1px solid black;
  margin-bottom: 10px;
  border-radius: 3px;
}

.service-button {
  background-color: violet;
  padding: 5px 20px;
  border-radius: 5px;
  margin-top: 30px;
  font-weight: bold;
}
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

<script lang="js">
import { defineComponent } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage
  },
  data() {
    return {
      redditClient: '',
      redditSecret: ''
    };
  },
  methods: {
    auth() {
      localStorage.setItem("redditClient", this.redditClient);
      localStorage.setItem("redditSecret", this.redditSecret);
      window.open(`https://www.reddit.com/api/v1/authorize?
							client_id=${this.redditClient}&response_type=code
							&state=random-string
							&redirect_uri=http://localhost:8100/reddit/callback
							&duration=permanent&scope=identity,submit,save`,
        "_self");
    }
  }
})
</script>