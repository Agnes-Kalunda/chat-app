import { createStore } from "vuex"
import axios from 'axios'

// initial state
export default createStore({
    state:{
        user:null,
        conversations: [],
        currentConversation: null,
        messages: []

    },

    mutations:{
        SET_user(state, user){
            state.user = user
        },
        SET_CONVERSATIONS(state, conversations){
            state.conversations = conversations
        },
        SET_CURRENTCONVERSATION(state, currentConversation){
            state.currentConversation = currentConversation
        },
        SET_MESSAGES(state, messages){
            state.messages = messages
        },
        ADD_MESSAGE(state, message){
            state.message.unshift(message)
        }
    },
})