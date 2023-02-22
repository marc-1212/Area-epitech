<template>
  <div class="input-container">
    <div class="values">  
      <input class="area-input" type="text" placeholder="player name" v-model="p">
      <input class="area-input" type="text" placeholder="riot api key" v-model="key">
    </div>
    <button @click="action" class="area-button">SAVE</button>
  </div>
</template>
  
<script lang="js">
import { defineComponent } from 'vue';
import {updateCardsAction} from '../../actioncardServices.js';

export default defineComponent({
  name: 'RiotIsPlayingLoL',
  data() {
    return {
      p: '',
      key: '',
      localId: null
    };
  },
  props: {
    id: Number,
    player: String,
    riotKey: String
  },
  methods: {
    action() {
      console.log(localStorage.getItem('userId'));
      console.log(this.localId);
      updateCardsAction('Riot', 'IsPlayingLoL', 'player', this.p, this.localId, localStorage.getItem("userId")).then((res) => {
          console.log(res);
      });
      updateCardsAction('Riot', 'IsPlayingLoL', 'riotKey', this.key, this.localId, localStorage.getItem("userId")).then((res) => {
          console.log(res);
      });
    }
  },
  created() {
    this.localId = this.id;
    this.p = this.player ? this.player : '';
    this.key = this.riotKey ? this.riotKey : '';
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