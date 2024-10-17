<template>
    <div class="message-list" ref="messageList">
      <div v-for="message in messages" :key="message.id"
           :class="['message', { 'message-own': isOwnMessage(message) }]">
        <div class="message-avatar">
          <img :src="message.user.avatar || '/default-avatar.png'"
               :alt="message.user.name">
        </div>
        <div class="message-content">
          <div class="message-header">
            <span class="message-author">{{ message.user.name }}</span>
            <span class="message-time">{{ formatTime(message.created_at) }}</span>
          </div>
          <div class="message-body">{{ message.content }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { format } from 'date-fns'
  
  export default {
    computed: {
      messages() {
        return this.$store.state.messages
      }
    },
    methods: {
      isOwnMessage(message) {
        return message.user_id === this.$store.state.user.id
      },
      formatTime(time) {
        return format(new Date(time), 'HH:mm')
      }
    },
    // called after DOM has been updated
    updated() {
      this.$nextTick(() => {
        this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight
      })
    }
  }
  </script>