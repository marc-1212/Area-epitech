<template>
 <div>
   <nav class="flex justify-between bg-gray-700 text-white w-screen">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
        <router-link class="text-3xl font-bold font-heading" to="/">
          <img class="h-30" src="./assets/logo/logo.png" alt="logo">
        </router-link>
        <button class="navbar-burger self-center mr-12 xl:hidden" type="button" v-on:click="toggleNavbar()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
      </div>
      <!---Menu items-->
      <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center px-5 py-6 flex space-x-6">
        <ul class="flex flex-col list-none ml-auto lg:flex-row lg:space-x-12 font-semibold font-heading">
          <router-link class="text-lg tracking-wide hover:text-gray-300 text-gray-200" to="/reactivity">Area</router-link>
          <router-link class="text-lg tracking-wide hover:text-gray-300 text-gray-200" to="/logs">Logs</router-link>
          <router-link class="text-lg tracking-wide hover:text-gray-300 text-gray-200" to="/home">Services</router-link>
          <router-link class="text-lg tracking-wide hover:text-gray-300 text-gray-200" to="/plans">Plans</router-link>
          <router-link class="text-lg tracking-wide hover:text-gray-300 text-gray-200" to="/login">Login</router-link>
          <router-link class="text-lg tracking-wide hover:text-gray-300 text-gray-200" to="/logout">Logout</router-link>
        </ul>
      </div>
    </div>
    </nav>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "area-navbar",
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleNavbar: function(){
      this.showMenu = !this.showMenu;
    }
  }
}
</script>