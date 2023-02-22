<template>
  <div class="selector-view">
    <div class="selector-container">
      <div>ACTION:</div>
      <div class="dropdown">
        <div class="dropdown-title">
          <p>{{ currentItem_s1_action }}</p>
          <img class="dropdown-img" src="https://cdn-icons-png.flaticon.com/512/60/60995.png" alt="">
        </div>
        <div class="dropdown-content">
          <p class="dropdown-item" v-on:click="selectItem_action(item)" v-for="item in items_s1_action"
            :key="item.message">
            {{ item }}
          </p>
        </div>
      </div>
      <div class="dropdown">
        <div class="dropdown-title">
          <p>{{ currentItem_s2_action }}</p>
          <img class="dropdown-img" src="https://cdn-icons-png.flaticon.com/512/60/60995.png" alt="">
        </div>
        <div class="dropdown-content">
          <p class="dropdown-item" v-on:click="selectItem_s2_action(item)" v-for="item in items_s2_action"
            :key="item.message">
            {{ item }}
          </p>
        </div>
      </div>
      <div v-if="currentItem_s2_action === 'Crono'">
        <TimerCrono :id="id" :frequency="frequency"></TimerCrono>
      </div>
      <div v-if="currentItem_s2_action === 'FrenchInChat'">
        <DiscordFrench :id="id" :botToken="botToken"></DiscordFrench>
      </div>
      <div v-if="currentItem_s2_action === 'SpecificMessage'">
        <SpecificMessage :id="id" :specificMessage="specificMessage" :tokenCheckMessage="tokenCheckMessage">
        </SpecificMessage>
      </div>
      <div v-if="currentItem_s2_action === 'CheckUmbrella'">
        <CheckUmbrella :id="id" :cityAction="cityAction"></CheckUmbrella>
      </div>
      <div v-if="currentItem_s2_action === 'CheckSunny'">
        <CheckSunny :id="id" :cityAction="cityAction"></CheckSunny>
      </div>
      <div v-if="currentItem_s2_action === 'NewPost'">
        <RedditNewPost :id="id"></RedditNewPost>
      </div>
      <div v-if="currentItem_s2_action === 'NewSubPost'">
        <RedditNewSubPost :id="id" :subreddit="subreddit"></RedditNewSubPost>
      </div>
      <div v-if="currentItem_s2_action === 'checkRobery'">
        <CheckRobery :id="id"></CheckRobery>
      </div>
      <div v-if="currentItem_s2_action === 'checkBestTeam'">
        <checkBestTeam :id="id"></checkBestTeam>
      </div>
      <div v-if="currentItem_s2_action === 'IsPlayingLoL'">
        <RiotIsPlayingLoL :id="id" :player="player" :riotKey="riotKey"></RiotIsPlayingLoL>
      </div>
    </div>
    <div class="selector-container">
      <div>REACTION:</div>
      <div class="dropdown">
        <div class="dropdown-title">
          <p>{{ currentItem_s1_reaction }}</p>
          <img class="dropdown-img" src="https://cdn-icons-png.flaticon.com/512/60/60995.png" alt="">
        </div>
        <div class="dropdown-content">
          <p class="dropdown-item" v-on:click="selectItem_reaction(item)" v-for="item in items_s1_reaction"
            :key="item.message">
            {{ item }}
          </p>
        </div>
      </div>
      <div class="dropdown">
        <div class="dropdown-title">
          <p>{{ currentItem_s2_reaction }}</p>
          <img class="dropdown-img" src="https://cdn-icons-png.flaticon.com/512/60/60995.png" alt="">
        </div>
        <div class="dropdown-content">
          <p class="dropdown-item" v-on:click="selectItem_s2_reaction(item)" v-for="item in items_s2_reaction"
            :key="item.message">
            {{ item }}
          </p>
        </div>
      </div>
      <div v-if="currentItem_s2_reaction === 'SendMessage'">
        <DiscordMessage :id="id" :message="message" :webhook="webhook"></DiscordMessage>
      </div>
      <div v-if="currentItem_s2_reaction === 'SendJoke'">
        <SendJoke :id="id" :jokeChannel="jokeChannel"></SendJoke>
      </div>
      <div v-if="currentItem_s2_reaction === 'SendAnimeRandom'">
        <SendAnimeRandom :id="id" :webhook="webhook"></SendAnimeRandom>
      </div>
      <div v-if="currentItem_s2_reaction === 'sendLaLigaDisc'">
        <sendLaLigaDisc :id="id" :webhook="webhook"></sendLaLigaDisc>
      </div>
      <div v-if="currentItem_s2_reaction === 'sendBundesDisc'">
        <sendBundesDisc :id="id" :webhook="webhook"></sendBundesDisc>
      </div>
      <div v-if="currentItem_s2_reaction === 'sendSerieADisc'">
        <sendSerieADisc :id="id" :webhook="webhook"></sendSerieADisc>
      </div>
      <div v-if="currentItem_s2_reaction === 'sendPremierDisc'">
        <sendPremierDisc :id="id" :webhook="webhook"></sendPremierDisc>
      </div>
      <div v-if="currentItem_s2_reaction === 'createCollection'">
        <RedditCreateCollection :id="id" :subreddit="subreddit" :redditTitle="redditTitle"
          :redditDescription="redditDescription"></RedditCreateCollection>
      </div>
      <div v-if="currentItem_s2_reaction === 'getKarma'">
        <GetKarma :id="id" :redditWebhook="redditWebhook"></GetKarma>
      </div>
      <div v-if="currentItem_s2_reaction === 'sendWeather'">
        <SendWeather :id="id" :weatherChannel="weatherChannel" :city="city"></SendWeather>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import DiscordMessage from './DiscordMessage.vue';
import DiscordFrench from './DiscordFrench.vue';
import TimerCrono from './TimerCrono.vue';
import SendJoke from './SendJoke.vue';
import SendWeather from './SendWeather.vue';
import CheckUmbrella from './CheckUmbrella.vue';
import SpecificMessage from './SpecificMessage.vue';
import CheckSunny from './CheckSunny';
import RedditNewPost from './RedditNewPost';
import RedditNewSubPost from './RedditSubPost';
import RedditCreateCollection from './RedditCreateCollection';
import SendAnimeRandom from './SendAnimeRandom.vue';
import CheckRobery from './CheckRobery.vue';
import CheckBestTeam from './CheckBestTeam.vue';
import SendLaLigaDisc from './sendLaLigaDisc.vue';
import SendBundesDisc from './sendBundesDisc.vue';
import SendSerieADisc from './sendSerieADisc.vue';
import SendPremierDisc from './sendPremierDisc.vue';
import GetKarma from './GetKarma';
import RiotIsPlayingLoL from './RiotIsPlayingLoL';

export default defineComponent({
  name: 'SelectorPage',
  props: {
    id: Number,
    action: String,
    botToken: String,
    frequency: String,
    message: String,
    reaction: String,
    serviceAction: String,
    serviceReaction: String,
    specificMessage: String,
    status: Number,
    webhook: String,
    jokeChannel: String,
    city: String,
    weatherChannel: String,
    cityAction: String,
    tokenCheckMessage: String,
    subreddit: String,
    redditDescription: String,
    redditTitle: String,
    redditWebhook: String,
    player: String,
    riotKey: String
  },
  components: {
    DiscordMessage,
    DiscordFrench,
    TimerCrono,
    SendJoke,
    SendWeather,
    CheckUmbrella,
    CheckSunny,
    SpecificMessage,
    RedditNewPost,
    RedditNewSubPost,
    RedditCreateCollection,
    SendAnimeRandom,
    CheckRobery,
    CheckBestTeam,
    SendLaLigaDisc,
    SendBundesDisc,
    SendSerieADisc,
    SendPremierDisc,
    GetKarma,
    RiotIsPlayingLoL
  },
  data() {
    return {
      currentItem_s1_action: '',
      currentItem_s2_action: '',
      title: 'Service',
      items_s1_action: ['Discord', 'Timer', 'Reddit', 'Football', 'Weather', 'Riot'],
      items_s2_action: [],
      currentItem_s1_reaction: '',
      currentItem_s2_reaction: '',
      items_s1_reaction: ['Discord', 'Joke', 'Anime', 'Football', 'Reddit', 'Weather'],
      items_s2_reaction: [],
      items_discord_action: ['FrenchInChat', 'SpecificMessage'],
      items_reddit_action: ['NewPost', 'NewSubPost'],
      items_discord_reaction: ['SendMessage'],
      items_timer_action: ['Crono'],
      items_joke_reaction: ['SendJoke'],
      items_weather_action: ['CheckUmbrella', 'CheckSunny'],
      items_weather_reaction: ['sendWeather'],
      items_reddit_reaction: ['createCollection', 'getKarma'],
      items_anime_reaction: ['SendAnimeRandom'],
      items_football_action: ['checkRobery', 'checkBestTeam'],
      items_football_reaction: ['sendLaLigaDisc', 'sendBundesDisc', 'sendSerieADisc', 'sendPremierDisc'],
      items_riot_action: ['IsPlayingLoL']
    };
  },
  methods: {
    selectItem_action(value) {
      this.currentItem_s1_action = value;
      if (value === 'Discord') {
        this.items_s2_action = this.items_discord_action;
      } else if (value === 'Timer') {
        this.items_s2_action = this.items_timer_action;
      } else if (value === 'Weather') {
        this.items_s2_action = this.items_weather_action;
      } else if (value === 'Reddit') {
        this.items_s2_action = this.items_reddit_action;
      } else if (value === 'Football') {
        this.items_s2_action = this.items_football_action;
      } else if (value === 'Riot') {
        this.items_s2_action = this.items_riot_action;
      }
    },
    selectItem_s2_action(value) {
      this.currentItem_s2_action = value;
    },
    selectItem_reaction(value) {
      this.currentItem_s1_reaction = value;
      if (value === 'Discord') {
        this.items_s2_reaction = this.items_discord_reaction;
      } else if (value === 'Joke') {
        this.items_s2_reaction = this.items_joke_reaction;
      } else if (value === 'Weather') {
        this.items_s2_reaction = this.items_weather_reaction;
      } else if (value === 'Reddit') {
        this.items_s2_reaction = this.items_reddit_reaction;
      } else if (value === 'Anime') {
        this.items_s2_reaction = this.items_anime_reaction;
      } else if (value === 'Football') {
        this.items_s2_reaction = this.items_football_reaction;
      }
    },
    selectItem_s2_reaction(value) {
      this.currentItem_s2_reaction = value;
    }
  },
  setup() {

  },
  created() {
    this.currentItem_s1_action = this.serviceAction ? this.serviceAction : this.title;
    this.currentItem_s2_action = this.action ? this.action : 'action';
    this.currentItem_s1_reaction = this.serviceReaction ? this.serviceReaction : this.title;
    this.currentItem_s2_reaction = this.reaction ? this.reaction : 'reaction';
  }
})
</script>
  
<style>
.dropdown {
  cursor: pointer;
  border: 1px solid black;
  width: fit-content;
  padding: 5px 15px;
  border-radius: 0.5em;
  margin: 0.5em 0;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-item:hover {
  cursor: pointer;
  background-color: rgb(225, 225, 225);
}

.dropdown-img {
  width: 0.5em;
}

.dropdown-title {
  display: flex;
  min-width: 100px;
  align-items: center;
  justify-content: space-around;
}

.selector-view {
  display: flex;
  align-items: top;
  justify-content: space-evenly;

}

.selector-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>