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

    // functions to change state
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

    
    actions:{
        async login({ commit }, credentials){
            const { data } = await axios.post('/api/login', credentials)
            commit('SET_USER', data.user)
            localStorage.setItem('token', data.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

        },

        async fetchConversations({ commit }){
            const { data } = await axios.get('/api/conversations')
            commit('SET_CONVERSATIONS', data)
        },

        async fetchMessages({ commit }){
            const { data } = await axios.get(`/api/conversations/${conversationId}/messages`)
            commit('SET_MESSAGES', data)
        },

        async sendMessage({ commit }, {conversationId, content}){
            const { data } = await axios.post(`/api/conversations/${conversationId}/messages`, {
                content,
                type: 'text'
            })

            commit('ADD_MESSAGE', data)
        }
    }

    
})