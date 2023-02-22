import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loggedIn: false
    }),
    actions: {
        update(value) {
            this.$patch({
                loggedIn: value,
            })
        }
    }
})