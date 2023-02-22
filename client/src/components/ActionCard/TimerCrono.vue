<template>
  <div class="input-container">
    <input class="area-input" type="text" placeholder="frequency" v-model="time">
    <button @click="action" class="area-button">SAVE</button>
  </div>
</template>
  
<script lang="js">
import { defineComponent } from 'vue';
import dropdown from '../../assets/dropdown.png';
import {updateCardsAction} from '../../actioncardServices.js';

export default defineComponent({
  name: 'TimerCrono',
  data() {
    return {
      time: '',
      localId: null
    };
  },
  props: {
    id: Number,
    frequency: String
  },
  methods: {
    action() {
      console.log(localStorage.getItem('userId'));
      console.log(this.localId);
      updateCardsAction('Timer', 'Crono', 'frequency', this.time, this.localId, localStorage.getItem("userId")).then((res) => {
          console.log(res);
      })
    }
  },
  created() {
    this.localId = this.id;
    this.time = this.frequency ? this.frequency : '';
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