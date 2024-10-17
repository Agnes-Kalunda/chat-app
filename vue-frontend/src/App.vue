<template>
  <div class="app">
    <div class="sidebar">
      <ConversationList />
    </div>
    <div class="main">
      <template v-if="currentConversation">
        <div class="chat-header">
          <h2>{{ getConversationName }}</h2>
        </div>
        <MessageList />
        <MessageInput />
      </template>
      <div v-else class="no-conversation">
        Select a conversation to start chatting
      </div>
    </div>
  </div>
</template>

<script>
import ConversationList from './components/ConversationList.vue'
import MessageList from './components/MessageList.vue'
import MessageInput from './components/MessageInput.vue'

export default {
  components: {
    ConversationList,
    MessageList,
    MessageInput
  },
  computed: {
    currentConversation() {
      return this.$store.state.currentConversation
    },
    getConversationName() {
      if (!this.currentConversation) return ''
      
      if (this.currentConversation.type === 'private') {
        const otherUser = this.currentConversation.participants.find(
          p => p.id !== this.$store.state.user.id
        )
        return otherUser.name
      }
      return this.currentConversation.name
    }
  },
  async created() {
    if (localStorage.getItem('token')) {
      //  axios auth header
      const token = localStorage.getItem('token')
      this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      // fetch initial data
      await this.$store.dispatch('fetchConversations')
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

