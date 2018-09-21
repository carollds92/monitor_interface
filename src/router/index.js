import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Auth/Login'
import Singup from '@/components/Auth/Singup'
import Charts from '@/components/dashboard/Charts'
import Patient from '@/components/dashboard/Patient'
import Profile from '@/components/dashboard/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Charts,
      meta: {requiresAuth: true}
    },
    {
      path: '/patient',
      name: 'patient',
      component: Patient,
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
