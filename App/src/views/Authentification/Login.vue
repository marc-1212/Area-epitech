<script lang="js">
import { defineComponent } from 'vue';
import { useAuthStore } from "../../store/auth-store";
import { login, loginGoogle } from '../../services/auth-service.js';
import { inject } from "vue";
import { IonContent, IonPage } from '@ionic/vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
    IonContent,
    IonPage
  },
  data() {
    return {
      email: '',
      password: '',
      alert: '',
      user: ''
    };
  },
  methods: {
    fetchUser() {
      this.alert = "";
      console.log(this.email);
      login(this.email, this.password).then((res) => {
        console.log(this.email);
        console.log(this.password);
        console.log(res.data.id);
        localStorage.setItem("userId", res.data.id);
        this.authStore.update(true);
        window.location.href = "/tabs/reactivity";
      })
        .catch((error) => {
          this.alert = error.response.data.message;
        });
    },
    printuser() {
      console.log(this.user);
    },
    async handleSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
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
          window.location.href = "/tabs/reactivity";
        })
          .catch((error) => {
            this.alert = error.response.data.message;
          });
      } catch (error) {
        console.log(error);
        return null;
      }

    },
    async handleSignOut() {
      try {
        await this.$gAuth.signOut();
        // console.log(this.$gAuth.signOut);
        this.user = '';
      } catch (error) {
        console.log(error);
      }
    }
  },
  setup() {
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    const authStore = useAuthStore();
    return {
      authStore,
      Vue3GoogleOauth,
    };
  }
})
</script>

<style>
.white {
  color: white;
}
.input-box {
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
}
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(78, 86, 107);
  height: 100%;
}
.signup-title {
  color: white;
  font-size: 30px;
  font-style: italic;
}
.signup-button {
  padding: 20px;
  color: black;
  background-color: white;
  border-radius: 10px;
  font-weight: bold;
}
.signup-google {
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 5px;
}
</style>

<template>
  <ion-page class="ion-align-items-center">
    <ion-content :fullscreen="true" style="max-width: 1000px">
      <div class="signup">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div class="signup">
            <div class="signup">
              <div>
                <h1 class="signup-title">Login to Area</h1>
              </div>
              <!---Sign in form input---->
              <div class="signup">
                <div class="signup">
                  <!---Email input---->
                  <div class="mb-6">
                    <input type="text"
                      class="input-box"
                      placeholder="Enter your email" v-model="email" />
                  </div>
                  <!---Password input---->
                  <div class="mb-6">
                    <input type="password"
                      class="input-box"
                      placeholder="Password" v-model="password" />
                  </div>
                  <!---Sign in methods---->
                  <div class="flex justify-center items-center mb-6">
                    <!---Forget password link---->
                    <a href="#!"
                      class="text-base text-gray-600 hover:text-purple-500 hover:underline focus:text-purple-500  active:text-purple-800 duration-200 transition ease-in-out">
                      Having troubles signing in?
                    </a>
                  </div>
                  <!-- Submit button-->
                  <button
                    class="signup-button"
                    @click="fetchUser" tag="button">Sign in</button>
                  <!-- Other Signing up methods -->
                  <!-- Line asking how to sign in -->
                  <div
                    class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p class="white">Or Sign in with</p>
                  </div>
                  <!-- Buttons: Google | Apple | Twitter -->
                  <div>
                    <div class="signup">
                      <button @click='handleSignIn' :disabled='!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized'
                        class="signup-google">
                        <svg class="px-2" xmlns="http://www.w3.org/2000/svg" xwidth="20" height="20"
                          preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                          <path fill="black"
                            d="M21.456 10.154c.123.659.19 1.348.19 2.067c0 5.624-3.764 9.623-9.449 9.623A9.841 9.841 0 0 1 2.353 12a9.841 9.841 0 0 1 9.844-9.844c2.658 0 4.879.978 6.583 2.566l-2.775 2.775V7.49c-1.033-.984-2.344-1.489-3.808-1.489c-3.248 0-5.888 2.744-5.888 5.993c0 3.248 2.64 5.998 5.888 5.998c2.947 0 4.953-1.685 5.365-3.999h-5.365v-3.839h9.26Z" />
                        </svg>
                        Google
                      </button>
                    </div>
                    <!-- Redirection to Sign up -->
                    <div
                      class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5">
                    </div>
                    <p class="white">Don't have an account?</p>
                    <router-link class="my-4 flex justify-center text-base font-bold hover:underline" to="/tabs/signup">
                      Register here</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>