<script lang="js">
  import { defineComponent } from 'vue';
  import { useAuthStore } from "../../store/auth-store";
  import { logout } from '../../services/auth-service.js';
  import { inject } from "vue";

  export default defineComponent ({
    name: 'Logout',
    beforeMount(){
        logout().then((res) => {
          console.log(res);
          localStorage.setItem("userId", 0);
          this.authStore.update(false);
          try {
            this.$gAuth.signOut();
            //console.log(this.$gAuth.signOut);
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => {
          this.alert = error.response;
        });;
    },
    setup() {
      const Vue3GoogleOauth = inject("Vue3GoogleOauth");
      const authStore = useAuthStore();
      return {
        Vue3GoogleOauth,
        authStore,
      };
    }
  })
</script>

<template>
    <div class="logout">
      <img class="logout-image" src="../../assets/logout.png" alt="">
    </div>
</template>

<style>
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logout-image {
  margin-top: 70px;
}
</style>