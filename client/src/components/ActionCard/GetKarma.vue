<template>
  <div class="input-container">
    <input class="area-input" type="text" placeholder="webhook" v-model="channel">
    <button @click="action" class="area-button">SAVE</button>
  </div>
</template>
    
<script lang="js">
import { defineComponent } from 'vue';
import dropdown from '../../assets/dropdown.png';
import { updateCardsReaction } from '../../actioncardServices.js';

export default defineComponent({
  name: 'GetKarma',
  data() {
    return {
      channel: '',
      localId: null
    };
  },
  props: {
    id: Number,
    redditWebhook: String
  },
  methods: {
    action() {
      console.log(localStorage.getItem('userId'));
      console.log(this.localId);
      updateCardsReaction('Reddit', 'getKarma', 'redditWebhook', this.channel, this.localId, localStorage.getItem("userId")).then((res) => {
        console.log(res);
      });
    }
  },
  created() {
    this.localId = this.id;
    this.channel = this.redditWebhook ? this.redditWebhook : '';
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