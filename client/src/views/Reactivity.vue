<template>
  <div class="reactivity">
    <div class="button-container">
      <button @click="addCard" class="reactivity-button">ADD AREA CARD</button>
    </div>
    <div v-if="!cards.length" class="empty">
      <img src="../assets/empty-2.png" class="empty-image" alt="">
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

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-image {
  width: 600px;
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
import { addCard, fetchCards, fetchId } from '../actioncardServices.js';

export default defineComponent({
  name: 'ReactivityPage',
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
  components: {
    ActionCard
  },
  methods: {
    addCard() {
      addCard(localStorage.getItem("userId")).then((response) => {
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
  }
})
</script>