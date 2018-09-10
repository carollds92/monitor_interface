import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Auth/Login'
import Singup from '@/components/Auth/Singup'
import Dashboard from '@/components/dashboard/Dashboard'
import Charts from '@/components/dashboard/Charts'
import NewPatient from '@/components/dashboard/NewPatient'
import Profile from '@/components/dashboard/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {requiresAuth: true}
    },
    {
      path: '/charts',
      name: 'charts',
      component: Charts,
      meta: {requiresAuth: true}
    },
    {
      path: '/patient',
      name: 'patient',
      component: NewPatient,
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
