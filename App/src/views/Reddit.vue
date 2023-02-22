<template>
    <div class="min-h-screen bg-gray-700 py-6 flex flex-col justify-center sm:py-12">
    </div>
  </template>
  
  <style>
  .service {
    width: 250px;
    height: 250px;
    display: flex;
    background-color: white;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    margin-top: 50px;
  }
  .service-title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .service-input {
    border: 1px solid black;
    margin-bottom: 10px;
  }
  .service-button {
    background-color: violet;
    padding: 5px 20px;
    border-radius: 5px;
    margin-top: 30px;
    font-weight: bold;
  }
  </style>
  
  <script lang="js">
  import { defineComponent } from 'vue';
  import { redditAuth } from '../logServices.js';
  
  export default defineComponent({
    name: 'RedditAuth',
    data() {
      return {
      };
    },
    mounted() {
        const q = this.$route.query
        redditAuth(q.code, localStorage.getItem('userId'), localStorage.getItem('redditClient'), localStorage.getItem('redditSecret')).then((response) => {
          console.log(response);
        });
    },
    components: {
    },
    methods: {
      auth() {
        
      }
    }
  })
  </script>