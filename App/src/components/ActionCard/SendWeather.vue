<template>
  <div class="input-container">
    <div class="values">
      <input class="area-input" type="text" placeholder="webhook url" v-model="channel">
      <input class="area-input" type="text" placeholder="city name" v-model="cityValue">
    </div>
    <button @click="action" class="area-button">SAVE</button>
  </div>
</template>
    
<script lang="js">
import { defineComponent } from 'vue';
import { updateCardsReaction } from '../../actioncardServices.js';

export default defineComponent({
  name: 'SendWeather',
  data() {
    return {
      channel: '',
      cityValue: '',
      localId: null
    };
  },
  props: {
    id: Number,
    weatherChannel: String,
    city: String
  },
  methods: {
    action() {
      console.log(localStorage.getItem('userId'));
      console.log(this.localId);
      updateCardsReaction('Weather', 'sendWeather', 'weatherChannel', this.channel, this.localId, localStorage.getItem("userId")).then((res) => {
        console.log(res);
      });
      updateCardsReaction('Weather', 'sendWeather', 'city', this.cityValue, this.localId, localStorage.getItem("userId")).then((res) => {
        console.log(res);
      });
    }
  },
  created() {
    this.localId = this.id;
    this.channel = this.weatherChannel ? this.weatherChannel : '';
    this.cityValue = this.city ? this.city : '';
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