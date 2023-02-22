<script lang="js">
  import { defineComponent } from 'vue';
  import { activateCard, deactivateCard, fetchDiscordStatus } from '../discordServices';
  import { activateTwitter, deactivateTwitter, fetchTwitterStatus } from '../twitterServices';
  import { useAuthStore } from "../store/auth-store";


  export default defineComponent ({
    name: 'homePage',
    data () {
      return {
        discordStatus: null,
        discordMessage: '',
        discordChannel: '',
        discrodAction: '',
        discordReaction: '',
        discordBotToken: '',
        twitterStatus: null,
        twitterMessage: '',
        twitterChannel: '',
        logged: 0
      };
    },
    setup() {
      const authStore = useAuthStore();
      return {
        authStore,
      };
    },
    mounted() {
      this.logged = localStorage.getItem("userId");
      console.log(this.logged);
    },
    methods: {
    //discord methods
    activateDiscord () {
      props = {
        discordMessage: this.discordMessage,
        discordChannel: this.discordChannel,
        discrodAction: this.discrodAction,
        discordReaction: this.discordReaction,
        discordBotToken: this.discordBotToken
      }
      activateCard(props).then((response) => {
        console.log(response.data.connected);
        this.discordStatus = response.data.connected;
      });
    },
    deactivateDiscord () {
      deactivateCard().then((response) => {
        console.log(response.data.connected);
        this.discordStatus = response.data.connected;
      });
    },
    fetchDiscordStatus () {
      fetchDiscordStatus().then((response) => {
        console.log(response.data.connected);
        this.discordStatus = response.data.connected;
      });
    },
    //twitter methods
    activateTwitter () {
      activateTwitter(this.twitterMessage, this.twitterChannel).then((response) => {
        console.log(response.data.connected);
        this.twitterStatus = response.data.connected;
      });
    },
    deactivateTwitter () {
      deactivateTwitter().then((response) => {
        console.log(response.data.connected);
        this.twitterStatus = response.data.connected;
      });
    },
    fetchTwitterStatus () {
      fetchTwitterStatus().then((response) => {
        console.log(response.data.connected);
        this.twitterStatus = response.data.connected;
      });
    },
    }
  })
</script>

<template>
  <div>
    <div class="area">
      <div class="action">
        <h3>discord</h3>
        <input class="area-input" type="text" placeholder="message to send" v-model="discordMessage">
        <input class="area-input" type="text" placeholder="webhook url" v-model="discordChannel">
        <input class="area-input" type="text" placeholder="action name" v-model="discrodAction">
        <input class="area-input" type="text" placeholder="bot token" v-model="discordBotToken">
        <input class="area-input" type="text" placeholder="reaction name" v-model="discordReaction">
        <div class="action-buttons">
          <button class="area-button" @click="activateDiscord">activate</button>
          <button class="area-button" @click="deactivateDiscord">deactivate</button>
        </div>
        <p>Status: {{ discordStatus == null ? 'DISABLED' : 'ACTIVE' }}</p>
      </div>
    </div>
    <div class="area">
      <div class="action">
        <h3>twitter</h3>
        <input class="area-input" type="text" placeholder="message to send" v-model="twitterMessage">
        <input class="area-input" type="text" placeholder="webhook url" v-model="twitterChannel">
        <div class="action-buttons">
          <button class="area-button" @click="activateTwitter">activate</button>
          <button class="area-button" @click="deactivateTwitter">deactivate</button>
        </div>
        <p>Status: {{ twitterStatus == null ? 'DISABLED' : 'ACTIVE' }}</p>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
  .area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .area-button {
    border: 1px solid black;
    border-radius: 2px;
    padding: 5px;
  }
  .action {
    border: 1px solid black;
    border-radius: 1em;
    width: 15em;
    height: 15em;
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .action-buttons {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
  }
  .area-input {
    text-align: center;
    border: 1px solid black;
    border-radius: 2px;
  }
</style>