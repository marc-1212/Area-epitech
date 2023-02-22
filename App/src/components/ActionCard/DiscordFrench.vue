<template>
  <div class="input-container">
    <input class="area-input" type="text" placeholder="bot token" v-model="discordBotToken">
    <button @click="action" class="area-button">SAVE</button>
  </div>
</template>
  
<script lang="js">
import { defineComponent } from 'vue';
import { updateCardsAction } from '../../actioncardServices.js';

export default defineComponent({
  name: 'DiscordFrench',
  data() {
    return {
      discordBotToken: '',
      localId: null
    };
  },
  props: {
    id: Number,
    botToken: String
  },
  methods: {
    action() {
      console.log(localStorage.getItem('userId'));
      console.log(this.localId);
      updateCardsAction('Discord', 'FrenchInChat', 'botToken', this.discordBotToken, this.localId, localStorage.getItem("userId")).then((res) => {
        console.log(res);
      })
    }
  },
  created() {
    this.localId = this.id;
    this.discordBotToken = this.botToken ? this.botToken : '';
  }
})
</script>
    
<style>
.area-input {
  text-align: center;
  border: 1px solid black;
  border-radius: 2px;
  margin: 0.25em 0;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.area-button {
  background-image: linear-gradient(to right, #2b5876 0%, #4e4376 51%, #2b5876 100%);
  margin: 10px;
  padding: 5px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 1.5s;
  background-size: 200% auto;
  color: white;
  font-size: 12px;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
  border: none;
}

.area-button:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
}
</style>