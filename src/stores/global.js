import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    activeUsername: ''
  }),
  actions: {
    setActiveUsername(username) {
      this.activeUsername = username;
    }
  },
  getters: {
    getActiveUsername() {
      return this.activeUsername;
    },
    isUserLoggedIn(state) {
      return !!state.activeUsername;
    }
  }
});
