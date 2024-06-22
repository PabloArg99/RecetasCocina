import {defineStore} from "pinia";

export const useGlobalStore = defineStore('global', {
    state: () => ({
        
        activeUsername:"Duko"

    }),
    actions: {
        setActiveUsername(username) {
            this.activeUsername = username
        },
        setActiveEmail(email){
            this.activeUserEmail = email
        }
    },
    getters: {
        getActiveUsername: state => state.activeUsername
    }
})