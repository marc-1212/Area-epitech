<template>
  <div class="input-container">
    <div class="values">
      <input class="area-input" type="text" placeholder="message too send" v-model="discordMessage">
      <input class="area-input" type="text" placeholder="webhook url" v-model="discordChannel">
    </div>
    <button @click="action" class="area-button">SAVE</button>
  </div>
</template>
  
<script lang="js">
import { defineComponent } from 'vue';
import {updateCardsReaction} from '../../actioncardServices.js';

export default defineComponent({
  name: 'DiscordMessage',
  data() {
    return {
      discordMessage: '',
      discordChannel: '',
      localId: null
    };
  },
  props: {
    id: Number,
    message: String,
    webhook: String
  },
  methods: {
    action() {
      console.log(localStorage.getItem('userId'));
      console.log(this.localId);
      updateCardsReaction('Discord', 'SendMessage', 'message', this.discordMessage, this.localId, localStorage.getItem("userId")).then((res) => {
          console.log(res);
      })
      updateCardsReaction('Discord', 'SendMessage', 'webhook', this.discordChannel, this.localId, localStorage.getItem("userId")).then((res) => {
          console.log(res);
      })
    }
  },
  created() {
    this.localId = this.id;
    this.discordChannel = this.webhook ? this.webhook : '';
    this.discordMessage = this.message ? this.message : '';
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
}

.values {
  display: flex;
  flex-direction: column;
}
</style>