<script>
import Auth from '../../services/Authentication'

export default {
  name: 'navigation',
  data () {
    return {
      user: [],
      token: []
    }
  },
  methods: {
    toggleLeftSidenav: function () {
      this.$refs.leftSidenav.toggle()
    },
    logout: function () {
      Auth.logout()
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('auth')).user
    this.token = JSON.parse(localStorage.getItem('auth')).token
  }
}
</script>
<template>
  <div class="phone-viewport">
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title">Monitor Dashboard</h2>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-medium">
        <div class="md-toolbar-container">
          <h3 class="md-title">Ola, {{this.user.first_name}}</h3>
        </div>
      </md-toolbar>
      <div class="phone-viewport">
        <md-list>
          <md-list-item>
            <md-icon>home</md-icon> <a class='link-primary' href="#/">Home</a>
          </md-list-item>

          <md-list-item>
            <md-icon>timeline</md-icon> <a class='link-primary' href="#/charts">Gráficos de Batimentos</a>
          </md-list-item>

          <md-list-item>
            <md-icon>add_box</md-icon> <a class='link-primary' href="#/patient">Cadastro de Pacientes</a>
          </md-list-item>

          <md-list-item>
            <md-icon>person</md-icon> <a class='link-primary' href="#/profile">Perfil</a>
          </md-list-item>
          <md-divider class="md-inset"></md-divider>
          <md-list-item>
            <md-icon>exit_to_app</md-icon> <a class='link-primary' v-on:click="logout" href="#/login">Sair</a>
          </md-list-item>
        </md-list>
      </div>

    </md-sidenav>

  </div>
</template>
<style lang="scss" scoped>
.link-primary {
  color: #333333 !important
}
</style>
