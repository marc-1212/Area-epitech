<script lang="js">
import { defineComponent } from 'vue';
import { fetchLogs, sendLog, clearLogs } from '../logServices.js';
import MessageComponent from '../components/Message/Message';
import { IonContent, IonPage } from '@ionic/vue';

export default defineComponent({
  name: 'LogsPage',
  components: {
      IonContent,
      IonPage,
      MessageComponent
    },
  data() {
    return {
      messages: []
    };
  },
  mounted() {
    this.userId = localStorage.getItem("userId");
    fetchLogs(this.userId).then((response) => {
      let va = JSON.stringify(response);
      let msg = JSON.parse(va);
      for (let i = 0; i < msg.data.result.length; i++) {
        this.messages.push(msg.data.result[i]);
      }
    });
  },
  methods: {
    sendHello() {
      sendLog(this.userId, 'hello', 'area').then(() => {
        window.location.reload();
      });
    },
    clear() {
      clearLogs(this.userId).then(() => {
        window.location.reload();
      });
    }
  }
})
</script>

<template>
  <ion-page class="ion-align-items-center">


<ion-content :fullscreen="true" style="max-width: 1000px">
  <div class="logs">
    <h1 class="logs-title">YOUR AREA LOGS:</h1>
    <div class="logs-messages">
      <div class="logs-msg" v-for="msg in messages" :key="msg.id">
        <MessageComponent :message="msg.message" :from="msg.creator"></MessageComponent>
      </div>
    </div>
    <button @click="clear" class="logs-button">CLEAR MESSAGES</button>
  </div>
  </ion-content>
  </ion-page>
</template>

<style>
.logs-title {
  font-weight: bold;
  font-size: 27px;
  color: rgb(61, 61, 61);
  margin: 2em;
}

.logs-messages {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  min-height: 500px;
  margin: 1em;
}

.logs-button {
  background-image: linear-gradient(to right, #2b5876 0%, #4e4376 51%, #2b5876 100%);
  margin: 1em;
  padding: 5px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 1.5s;
  font-weight: bold;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
  border: none;
}

.logs-button:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
}

.logs-msg:nth-child(even) {
  background-color: lightgray;
}
</style>