<template>
  <ion-page class="ion-align-items-center">


<ion-content :fullscreen="true" style="max-width: 1000px">
  <div class="reactivity">
    <div class="button-container">
      <button @click="addCard" class="reactivity-button">ADD AREA CARD</button>
      <button @click="reload" class="reload-button">reload</button>
    </div>
    <div class="actions-container">
      <div v-for="card in cards" :key="card.id">
        <ActionCard
          :list="cards"
          :id="card.id"
          :action="card.action"
          :botToken="card.botToken"
          :frequency="card.frequency"
          :message="card.message"
          :reaction="card.reaction"
          :serviceAction="card.serviceAction"
          :serviceReaction="card.serviceReaction"
          :specificMessage="card.specificMessage"
          :status="card.status"
          :webhook="card.webhook"
          :jokeChannel="card.jokeChannel"
          :city="card.city"
          :cityAction="card.cityAction"
          :weatherChannel="card.weatherChannel"
          :tokenCheckMessage="card.tokenCheckMessage"
          :subreddit="card.subreddit"
          :redditTitle="card.redditTitle"
          :redditDescription="card.redditDescription"
          :redditWebhook="card.redditWebhook"
          :player="card.player"
          :riotKey="card.riotKey">
        </ActionCard>
        <div class="action-background"></div>
      </div>
    </div>
  </div>
  </ion-content>
  </ion-page>
</template>

<style>
.action-background {
  width: 559px;
  height: 406px;
  background-image: linear-gradient(to right, #2b5876 0%, #4e4376 51%);
  border-radius: 2em;
  rotate: 5deg;
  z-index: 0;
  margin-top: -438px;
  margin-left: 2em;
  position: relative;
}

.reload-button {
  margin-left: 20px;
  background-color: white;
  color: black;
  border-radius: 5px;
  border: 1px solid black;
  padding: 15px;
  margin-top: 15px;
}

.actions-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.reactivity-button {
  background-image: linear-gradient(to right, #2b5876 0%, #4e4376 51%, #2b5876 100%);
  border-radius: 0.5em;
  padding: 5px 15px;
  color: white;
  font-weight: bold;
  margin-top: 1em;
  transition: all 0.5s;
}

.reactivity-button:hover {
  background-image: linear-gradient(to right, #1a425d 0%, #2d1e61 51%, #1b4c6c 100%);
  box-shadow: 0px 10px 15px rgba(46, 86, 229, 0.4);
  transform: translateY(-4px);
}

</style>

<script lang="js">
import { defineComponent } from 'vue';
import ActionCard from '../components/ActionCard/ActionCard';
import { IonContent, IonPage } from '@ionic/vue';
import { addCard, fetchCards } from '../actioncardServices.js';

export default defineComponent({
  name: 'ReactivityPage',
  components: {
      IonContent,
      IonPage,
      ActionCard
    },
  data() {
    return {
      cards: [],
      id: 0,
      userId: 0
    };
  },
  mounted() {
    this.userId = localStorage.getItem("userId");
    fetchCards(this.userId).then((response) => {
      let va = JSON.stringify(response);
      let ca = JSON.parse(va);
      for (let i = 0; i < ca.data.result.length; i++) {
        this.cards.push(ca.data.result[i]);
      }
    });
  },
  methods: {
    addCard() {
      addCard(localStorage.getItem("userId")).then(() => {
      });
      this.cards = [];
      fetchCards(this.userId).then((response) => {
        let va = JSON.stringify(response);
        let ca = JSON.parse(va);
        for (let i = 0; i < ca.data.result.length; i++) {
          this.cards.push(ca.data.result[i]);
        }
        window.location.reload();
      });
    },
    reload() {
      window.location.reload();
    }
  }
})
</script>