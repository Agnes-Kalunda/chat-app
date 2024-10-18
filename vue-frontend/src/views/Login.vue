<template>
    <div class="login-container">
      <div class="login-box">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label>Email</label>
            <input 
              type="email" 
              v-model="email" 
              required
              placeholder="Enter your email"
            >
          </div>
          <div class="form-group">
            <label>Password</label>
            <input 
              type="password" 
              v-model="password" 
              required
              placeholder="Enter your password"
            >
          </div>
          <button type="submit" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
        <p class="register-link">
          Don't have an account? 
          <router-link to="/register">Register</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        loading: false,
        error: null
      }
    },
    methods: {
      async handleLogin() {
        this.loading = true
        this.error = null
        
        try {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password
          })
          this.$router.push('/')
        } catch (err) {
          this.error = err.response?.data?.message || 'Login failed'
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f5f5f5;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
}

.error {
  color: red;
  margin-top: 1rem;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
}
</style>
