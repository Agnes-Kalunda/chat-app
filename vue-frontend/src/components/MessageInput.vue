<template>
    <div class="message-input">
      <form @submit.prevent="sendMessage">
        <input type="text"
               v-model="message"
               placeholder="Type a message..."
               @keyup.enter="sendMessage">
        <button type="submit">Send</button>
      </form>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  computed: {
    currentConversation() {
      return this.$store.state.currentConversation
    }
  },
  methods: {
    async sendMessage() {
      if (!this.message.trim() || !this.currentConversation) return

      await this.$store.dispatch('sendMessage', {
        conversationId: this.currentConversation.id,
        content: this.message
      })
      
      this.message = ''
    }
  }
}
</script>
  