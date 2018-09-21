// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import VueSweetalert2 from 'vue-sweetalert2'
import VueGoogleCharts from 'vue-google-charts'
import axios from 'axios'
import config from './config/app'
const API_URL = config.getApiURL()

import 'vue-material/dist/vue-material.css'
import Auth from './services/Authentication'

Vue.config.productionTip = false

Vue.use(VueGoogleCharts)
Vue.use(VueSweetalert2)
Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: {
    color: 'blue',
    hue: '200'
  }
})

try {
  let API_TOKEN = { headers: {'Authorization': JSON.parse(localStorage.getItem('auth')).token.type_token + ' ' + JSON.parse(localStorage.getItem('auth')).token.acess_token} }
  axios.get(API_URL + 'patient/', API_TOKEN).then()
} catch (error) {
  Auth.logout()
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem('auth') == null || localStorage.getItem('auth') === 'undefined') {
      next()
      Auth.logout()
    } else {
      next()
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

