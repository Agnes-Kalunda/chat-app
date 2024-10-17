<template>
    <div class="conversation-list">
      <div v-for="conversation in conversations" :key="conversation.id"
           @click="selectConversation(conversation)"
           :class="['conversation', { active: isActive(conversation) }]">
        <div class="avatar" v-if="conversation.type === 'private'">
          <img :src="getOtherParticipant(conversation).avatar || '/default-avatar.png'"
               :alt="getOtherParticipant(conversation).name">
        </div>
        <div class="details">
          <h3>{{ getConversationName(conversation) }}</h3>
          <p class="last-message" v-if="conversation.messages[0]">
            {{ conversation.messages[0].content }}
          </p>
        </div>
      </div>
    </div>
  </template>


<script>
export default {
    // retrieve conversation from vuex state
  computed: {
    conversations() {
      return this.$store.state.conversations
    },
    currentConversation() {
      return this.$store.state.currentConversation
    }
  },
  methods: {
    selectConversation(conversation) {
      this.$store.commit('SET_CURRENT_CONVERSATION', conversation)
      this.$store.dispatch('fetchMessages', conversation.id)
    },
    isActive(conversation) {
      return this.currentConversation?.id === conversation.id
    },
    getOtherParticipant(conversation) {
      return conversation.participants.find(p => p.id !== this.$store.state.user.id)
    },
    getConversationName(conversation) {
      if (conversation.type === 'private') {
        return this.getOtherParticipant(conversation).name
      }
      return conversation.name
    }
  }
}
</script>
  