<template>
  <div class="input-container">
    <input class="area-input" type="text" placeholder="city" v-model="city">
    <button @click="action" class="area-button">SAVE</button>
  </div>
</template>
  
<script lang="js">
import { defineComponent } from 'vue';
import dropdown from '../../assets/dropdown.png';
import { updateCardsAction } from '../../actioncardServices.js';

export default defineComponent({
  name: 'CheckSunny',
  data() {
    return {
      city: '',
      localId: null
    };
  },
  props: {
    id: Number,
    cityAction: String
  },
  methods: {
    action() {
      console.log(localStorage.getItem('userId'));
      console.log(this.localId);
      updateCardsAction('Weather', 'CheckSunny', 'cityAction',  this.city, this.localId, localStorage.getItem("userId")).then((res) => {
          console.log(res);
      })
    }
  },
  created() {
    this.localId = this.id;
    this.city = this.cityAction ? this.cityAction : '';
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