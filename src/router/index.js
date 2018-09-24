import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Auth/Login'
import Singup from '@/components/Auth/Singup'
import Home from '@/components/dashboard/Home'
import Profile from '@/components/dashboard/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Home,
      meta: {requiresAuth: true}
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {requiresAuth: true}
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/singup',
      name: 'singup',
      component: Singup
    }

  ]
})
