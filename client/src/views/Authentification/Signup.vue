<script lang="js">
  import { defineComponent } from 'vue';
  import { register } from '../../services/auth-service.js';
  import { useAuthStore } from "../../store/auth-store";
  import { loginGoogle } from '../../services/auth-service.js';
  import { inject } from "vue";

  export default defineComponent ({
    name: 'Register',
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        alert: "",
        user: ''
      };
    },
    methods: {
      registerUser () {
        this.alert = "";
        if ((this.password === this.confirmPassword) && this.password != '' && this.email != '' && this.firstname != '' && this.lastname != '') {
          register(this.firstname, this.lastname, this.email, this.password).then((response) => {
              window.location.href = "/login";
          }).catch((error)=>{
              this.alert = error;
          });
        }
        else {
          this.alert = "Passwords must match";
        }
      },
      printuser() {
        console.log(this.user);
      },
      async handleSignIn() {
        try {
          const googleUser = await this.$gAuth.signIn();
          // console.log(this.$gAuth.signIn);
          if (!googleUser) {
            return null;
          }
          this.user = googleUser.getBasicProfile().getEmail();
          console.log(this.user);
          loginGoogle(this.user).then((res) => {
            console.log(this.user);
            console.log(res.data.id);
            localStorage.setItem("userId", res.data.id);
            this.authStore.update(true);
            window.location.href = "/reactivity";
          })
          .catch((error) => {
            this.alert = error.response.data.message;
          });;
        } catch (error) {
          console.log(error);
          return null;
        }
        
      },
    },
    setup() {
      const Vue3GoogleOauth = inject("Vue3GoogleOauth");
      const authStore = useAuthStore();
      return {
        authStore,
        Vue3GoogleOauth,
      };
    },
    created() {
      console.log(localStorage.getItem("userId"));
    }
  })
</script>

<template>
  <div class="min-h-screen bg-gray-700 py-6 flex flex-col justify-center sm:py-12">
	  <div class="relative py-3 sm:max-w-xl sm:mx-auto">
	  	<div class="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
	  	  <div class="relative px-4 py-8 bg-white shadow-lg sm:rounded-3xl sm:p-20">
	  	  	<div class="max-w-md mx-auto">
            <div>
	  	  	    <h1 class="text-3xl font-semibold text-center">Create your account</h1>
	  	  	</div>

	  	  		<!---Sign up form input---->
	  	  		<div class="divide-y divide-gray-200">
	  	  			<div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
	  	  				<!---Full name input---->
                <div class="mb-6">
                  <input
                    type="text"
                    class="form-control block w-full px-3 py-2 text-base font-small drop-shadow-2xl text-gray-700 bg-white rounded-2xl bg-clip-padding border-2 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                    placeholder="Enter your first name"
                    v-model="firstname"
                  />
                </div>
                <div class="mb-6">
                  <input
                    type="text"
                    class="form-control block w-full px-3 py-2 text-base font-small drop-shadow-2xl text-gray-700 bg-white rounded-2xl bg-clip-padding border-2 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                    placeholder="Enter your last name"
                    v-model="lastname"
                  />
                </div>
                <!---Email input---->
                <div class="mb-6">
                  <input
                    type="text"
                    class="form-control block w-full px-3 py-2 text-base font-small drop-shadow-2xl text-gray-700 bg-white rounded-2xl bg-clip-padding border-2 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                    placeholder="Enter your email"
                    v-model="email"
                  />
                </div>
	  	  				<div class="flex justify-center items-center mb-6">
	  	  				<!---Password input---->
                  <div class="mb-6">
                    <input
                      type="password"
                      class="form-control block w-full px-3 py-2 text-base font-small drop-shadow-2xl text-gray-700 bg-white rounded-2xl bg-clip-padding border-2 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                      placeholder="Password"
                      v-model="password"
                    />
                  </div>
                  <div class="mb-6">
                    <input
                      type="password"
                      class="form-control block w-full px-3 py-2 text-base font-small drop-shadow-2xl text-gray-700 bg-white rounded-2xl bg-clip-padding border-2 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                      placeholder="Confirm password"
                      v-model="confirmPassword"
                    />
                  </div>
                </div>
	  	  			<!---Sign in methods---->
                <!-- Submit button -->
                  <button
                    type="submit"
                    class="inline-block text-center px-7 py-3 bg-purple-400 text-white font-medium text-sm leading-snug uppercase rounded-2xl shadow-md hover:bg-purple-500 hover:shadow-lg focus:bg-purple-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-500 active:shadow-lg transition duration-150 ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    @click="registerUser"
                  >Sign up</button>
                <!-- Other Signing up methods -->
                  <!-- Line asking how to sign in -->
                  <div
                  class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                  >
                  <p class="text-center text-base font-semibold mx-4 mb-0">Or Sign up with</p>
                  </div>
                  <!-- Buttons: Google | Apple | Twitter -->
                  <div>
                  <div class="flex items-center justify-center space-x-4 mt-3">
                    <button @click='handleSignIn' :disabled='!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized' class="flex items-center py-2 px-4 text-base  rounded bg-white hover:bg-gray-100 text-gray-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                      <svg class="px-2" xmlns="http://www.w3.org/2000/svg" xwidth="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="black" d="M21.456 10.154c.123.659.19 1.348.19 2.067c0 5.624-3.764 9.623-9.449 9.623A9.841 9.841 0 0 1 2.353 12a9.841 9.841 0 0 1 9.844-9.844c2.658 0 4.879.978 6.583 2.566l-2.775 2.775V7.49c-1.033-.984-2.344-1.489-3.808-1.489c-3.248 0-5.888 2.744-5.888 5.993c0 3.248 2.64 5.998 5.888 5.998c2.947 0 4.953-1.685 5.365-3.999h-5.365v-3.839h9.26Z"/></svg>
                      Google
                    </button>
                    <button @click='printuser' class="flex items-center py-2 px-4 text-base  rounded bg-white hover:bg-gray-100 text-gray-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                      <svg class="mx-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="black" d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5c-34.9-50-87.7-77.5-157.3-82.8c-65.9-5.2-138 38.4-164.4 38.4c-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8c23.8 68.2 109.6 235.3 199.1 232.6c46.8-1.1 79.9-33.2 140.8-33.2c59.1 0 89.7 33.2 141.9 33.2c90.3-1.3 167.9-153.2 190.5-221.6c-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7c-44.8 2.6-96.6 30.5-126.1 64.8c-32.5 36.8-51.6 82.3-47.5 133.6c48.4 3.7 92.6-21.2 129-63.7z"/></svg>
                      Apple
                    </button>
                    <button class="flex items-center py-2 px-4 text-base  rounded bg-white hover:bg-gray-100 text-gray-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                      <svg class="mx-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="black" d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578a9.3 9.3 0 0 1-2.958 1.13a4.66 4.66 0 0 0-7.938 4.25a13.229 13.229 0 0 1-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 0 0 3.96 9.824a4.647 4.647 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568a4.692 4.692 0 0 1-2.104.08a4.661 4.661 0 0 0 4.352 3.234a9.348 9.348 0 0 1-5.786 1.995a9.5 9.5 0 0 1-1.112-.065a13.175 13.175 0 0 0 7.14 2.093c8.57 0 13.255-7.098 13.255-13.254c0-.2-.005-.402-.014-.602a9.47 9.47 0 0 0 2.323-2.41l.002-.003Z"/></svg>
                      Twitter 
                    </button>
                  </div>
                  <!-- Redirection to Sign up -->
                  <div
                  class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5"
                  >
                  </div>
                  <p class="text-center text-base">Already have an account?</p>
                  <router-link class="my-4 flex justify-center text-base font-bold hover:underline" to="/login">Login here</router-link>
              </div>
	  	  			</div>
	  	  		</div>
	  	  	</div>
	  	  </div>
	  </div>
  </div>
</template>