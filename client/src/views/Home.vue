<template>
  <div class="min-h-screen bg-gray-700 py-6 flex flex-col justify-center sm:py-12">
    <h1 class="text-white text-center text-4xl font-semibold tracking-widest">Explore</h1>
    <div class="py-10 h-screen bg-gray-700 px-2">
      <div class="max-w mx-auto overflow-hidden md:max-w-xl">
        <!----SEARCH BAR--->
        <form class="flex items-center">
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-full">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>
            <input type="text" id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search" required>
          </div>
        </form>
      </div>
      <!----GRID--->
      <div class="relative mx-auto max-w-7xl">
        <div class="grid gap-x-8 gap-y-8 grid-cols-3 md:gap-1">
          <!----DISCORD--->
          <div class="service">
            <h1 class="service-title">REDDIT</h1>
            <input class="service-input" type="password" placeholder="reddit client id" v-model="redditClient">
            <input class="service-input" type="password" placeholder="reddit secret id" v-model="redditSecret">
            <button @click="auth" class="logs-button">Log In</button>
          </div>
        </div>
      </div>
    </div>
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
  border-radius: 3px;
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
  name: 'HomePage',
  data() {
    return {
      redditClient: '',
      redditSecret: ''
    };
  },
  mounted() {
  },
  components: {
  },
  methods: {
    auth() {
      localStorage.setItem("redditClient", this.redditClient);
      localStorage.setItem("redditSecret", this.redditSecret);
      window.open(`https://www.reddit.com/api/v1/authorize?
							client_id=${this.redditClient}&response_type=code
							&state=random-string
							&redirect_uri=http://localhost:8081/reddit/callback
							&duration=permanent&scope=identity,submit,save`,
            "_self");
    }
  }
})
</script>