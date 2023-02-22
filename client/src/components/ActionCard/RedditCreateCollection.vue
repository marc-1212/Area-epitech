<template>
  <div class="input-container">
    <div class="values">
      <input class="area-input" type="text" placeholder="subreddit name" v-model="sub">
      <input class="area-input" type="text" placeholder="collection title" v-model="tit">
      <input class="area-input" type="text" placeholder="collection desc" v-model="desc">
    </div>
    <button @click="action" class="area-button">SAVE</button>
  </div>
</template>
    
<script lang="js">
import { defineComponent } from 'vue';
import dropdown from '../../assets/dropdown.png';
import { updateCardsReaction } from '../../actioncardServices.js';

export default defineComponent({
  name: 'RedditCreateCollection',
  data() {
    return {
      sub: '',
      tit: '',
      desc: '',
      localId: null
    };
  },
  props: {
    id: Number,
    subreddit: String,
    redditTitle: String,
    redditDescription: String
  },
  methods: {
    action() {
      console.log(localStorage.getItem('userId'));
      console.log(this.localId);
      updateCardsReaction('Reddit', 'createCollection', 'subreddit', this.sub, this.localId, localStorage.getItem("userId")).then((res) => {
        console.log(res);
      });
      updateCardsReaction('Reddit', 'createCollection', 'redditTitle', this.tit, this.localId, localStorage.getItem("userId")).then((res) => {
        console.log(res);
      });
      updateCardsReaction('Reddit', 'createCollection', 'redditDescription', this.desc, this.localId, localStorage.getItem("userId")).then((res) => {
        console.log(res);
      });
    }
  },
  created() {
    this.localId = this.id;
    this.sub = this.subreddit ? this.subreddit : '';
    this.tit = this.redditTitle ? this.redditTitle : '';
    this.desc = this.redditDescription ? this.redditDescription : '';
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
  min-height: 150px;
  justify-content: space-between;
}

.values {
  display: flex;
  flex-direction: column;
}
</style>