<template>
  <div class="input-container">
    <input class="area-input" type="text" placeholder="subreddit name" v-model="channel">
    <button @click="action" class="area-button">SAVE</button>
  </div>
</template>
    
<script lang="js">
import { defineComponent } from 'vue';
import { updateCardsAction } from '../../actioncardServices.js';

export default defineComponent({
  name: 'RedditSubPost',
  data() {
    return {
      channel: '',
      localId: null
    };
  },
  props: {
    id: Number,
    subreddit: String
  },
  methods: {
    action() {
      console.log(localStorage.getItem('userId'));
      console.log(this.localId);
      updateCardsAction('Reddit', 'NewSubPost', 'subreddit', this.channel, this.localId, localStorage.getItem("userId")).then((res) => {
        console.log(res);
      })
    }
  },
  created() {
    this.localId = this.id;
    this.channel = this.subreddit ? this.subreddit : '';
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