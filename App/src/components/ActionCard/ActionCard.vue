<template>
  <div class="action-card">
    <div>
      <button @click="removeCard" class="action-close">X</button>
      <SelectorPage :id="id" :action="action" :botToken="botToken" :frequency="frequency" :message="message"
        :reaction="reaction" :serviceAction="serviceAction" :serviceReaction="serviceReaction"
        :specificMessage="specificMessage" :status="status" :webhook="webhook" :jokeChannel="jokeChannel" :city="city"
        :weatherChannel="weatherChannel" :cityAction="cityAction" :tokenCheckMessage="tokenCheckMessage"
        :subreddit="subreddit" :redditTitle="redditTitle" :redditDescription="redditDescription"
        :redditWebhook="redditWebhook" :player="player" :riotKey="riotKey">
      </SelectorPage>
    </div>
    <div class="buttons">
      <button @click="activateCard" class="button">ACTIVATE</button>
      <h1 class="status">STATUS: {{ this.cardStatus ? "ACTIVE" : "DISABLED" }}</h1>
      <button @click="deactivateCard" class="button">DEACTIVATE</button>
    </div>
  </div>
</template>
  
<style>
.action-card {
  width: 559px;
  -webkit-box-shadow: 10px 10px 43px 0px rgba(138, 138, 138, 1);
  -moz-box-shadow: 10px 10px 43px 0px rgba(138, 138, 138, 1);
  box-shadow: 10px 10px 43px 0px rgba(138, 138, 138, 1);
  border-radius: 2em;
  margin: 2em;
  display: flex;
  z-index: 99;
  flex-direction: column;
  position: relative;
  min-height: 406px;
  justify-content: space-between;
  background-color: white;
}

.action-card-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.action-close {
  font-weight: bold;
  position: relative;
  margin-top: 1em;
  left: 92%;
}

.input {
  border: 1px solid rgb(72, 72, 72);
  border-radius: 0.5em;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin: 2em;
}

.button {
  background-image: linear-gradient(to right, #2b5876 0%, #4e4376 51%, #2b5876 100%);
  min-width: 150px;
  color: white;
  border-radius: 0.5em;
  margin: 0 1em;
  padding: 0 10px;
  font-weight: 600;
  transition: all 0.5s;
}

.button:hover {
  background-image: linear-gradient(to right, #1a425d 0%, #2d1e61 51%, #1b4c6c 100%);
  box-shadow: 0px 10px 15px rgba(46, 86, 229, 0.4);
  transform: translateY(-4px);
}

@media (max-width: 450px) {
  .action-card {
    width: auto;
    margin: 1em auto;
  }
  .action-background {
    display: none;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .actions-container {
    flex-direction: column;
    align-items: center;
  }
  .action-close {
    background-color: transparent;
    color: black;
    margin-left: -10px;
  }
  .area-input {
    max-width: 130px;
    background-color: white;
  }
  .dropdown, .dropdown-title {
    height: 40px;
    padding: 0;
  }
  .area-button {
    height: 30px;
  }
  .button {
    height: 25px;
  }
  .status {
    font-size: 16px;
  }
  .reactivity-button {
    height: 40px;
  }
}
</style>
  
<script lang="js">
import { defineComponent } from 'vue';
import SelectorPage from './Selector.vue'
import { removeCard, activateCard, deactivateCard } from '../../actioncardServices.js'

export default defineComponent({
  name: 'ActionCard',
  components: {
    SelectorPage
  },
  data() {
    return {
      cardStatus: ''
    };
  },
  mounted() {
    this.cardStatus = this.status;
  },
  methods: {
    removeCard() {
      removeCard(this.id).then(() => {
        window.location.reload();
      });
    },
    activateCard() {
      activateCard(this.action, this.reaction, this.botToken, this.message, this.webhook, this.serviceAction, this.serviceReaction, this.specificMessage, this.frequency, this.id, this.tokenCheckMessage, this.jokeChannel, this.subreddit, this.redditTitle, this.redditDescription, this.weatherChannel, this.city, this.cityAction, this.redditWebhook, this.player, this.riotKey, localStorage.getItem("userId")).then((response) => {
        this.cardStatus = response.data.status;
      });
    },
    deactivateCard() {
      deactivateCard(this.id).then((response) => {
        this.cardStatus = response.data.status;
      });
    }
  },
  setup() {

  },
  props: {
    list: Object,
    id: Number,
    action: String,
    botToken: String,
    frequency: String,
    message: String,
    reaction: String,
    serviceAction: String,
    serviceReaction: String,
    status: Number,
    webhook: String,
    specificMessage: String,
    tokenCheckMessage: String,
    jokeChannel: String,
    city: String,
    cityAction: String,
    weatherChannel: String,
    subreddit: String,
    redditTitle: String,
    redditDescription: String,
    redditWebhook: String,
    player: String,
    riotKey: String
  }
})
</script>