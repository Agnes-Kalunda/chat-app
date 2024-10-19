import { createRouter, createWebHistory } from 'vue-router'
import UserLogin from '../views/UserLogin.vue'
import UserHome from '../views/UserHome.vue' // Create this view for the authenticated home page

const routes = [
  {
    path: '/',
    component: UserHome, // Assuming this will be your authenticated user's landing page
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: UserLogin
  }
  // {
  //   path: '/register',
  //   component: Register
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Router guard for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') // Retrieve the auth token
  
  if (to.meta.requiresAuth && !token) {
    next('/login') // Redirect to login if trying to access a protected route
  } else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/') // Redirect to home if already logged in
  } else {
    next() // Proceed as normal
  }
})

export default router
