<template>
  <div class="input-container">
    <div class="values">
      <input class="area-input" type="text" placeholder="message to check for" v-model="message">
      <input class="area-input" type="text" placeholder="bot token" v-model="discordBotToken">
    </div>
    <button @click="action" class="area-button">SAVE</button>
  </div>
</template>
    
<script lang="js">
import { defineComponent } from 'vue';
import { updateCardsAction } from '../../actioncardServices.js';

export default defineComponent({
  name: 'SpecificMessage',
  data() {
    return {
      message: '',
      discordBotToken: '',
      localId: null
    };
  },
  props: {
    id: Number,
    specificMessage: String,
    tokenCheckMessage: String
  },
  methods: {
    action() {
      console.log(localStorage.getItem('userId'));
      console.log(this.localId);
      updateCardsAction('Discord', 'SpecificMessage', 'specificMessage', this.message, this.localId, localStorage.getItem("userId")).then((res) => {
        console.log(res);
      });
      updateCardsAction('Discord', 'SpecificMessage', 'tokenCheckMessage', this.discordBotToken, this.localId, localStorage.getItem("userId")).then((res) => {
        console.log(res);
      });
    }
  },
  created() {
    this.localId = this.id;
    this.message = this.specificMessage ? this.specificMessage : '';
    this.discordBotToken = this.tokenCheckMessage ? this.tokenCheckMessage : '';
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
</style>