<script>
import Auth from '../../services/Authentication'

export default {
  name: 'login',
  data () {
    return {
      login: '',
      password: '',
      snackBar: {
        vertical: 'top',
        horizontal: 'center',
        duration: 10000
      }
    }
  },
  methods: {
    loginHandler: function () {
      let credentials = {
        login: this.login,
        password: this.password
      }
      Auth.login(this, credentials)
    },
    openSnack: function (error) {
      this.$refs.snackbar.open(error)
    }
  }
}
</script>
<template>
<div>
  <md-snackbar :md-position="snackBar.vertical + ' ' + snackBar.horizontal" ref="snackbar" :md-duration="snackBar.duration">
    <span>Login ou senha incorretos</span>
    <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">OK</md-button>
  </md-snackbar>

  <div class="login-wrapper">
    
    <div class="login-box">
      <h1> Monitor App</h1>
      <div class="login-form">
        <md-input-container>
          <label>Login</label>
          <md-input v-model="login" type="text"></md-input>
        </md-input-container>
        <md-input-container md-has-password>
          <label>Senha</label>
          <md-input v-model="password" type="password" ></md-input>
        </md-input-container>
      </div>

      <div class="login-controls">
        <md-button class="md-raised md-primary" v-on:click="loginHandler">Entrar</md-button>
        <a class='link-primary' href="#/singup/">Cadastre-se</a>
      </div>

    </div>

  </div>
</div>
</template>
<style lang="sass" scoped>
$main-bg: #EEF3FE

.login-wrapper 
  background: $main-bg
  display: flex
  flex-flow: column wrap
  justify-content: center
  align-items: center


.login-box
  margin-top: 10rem
  padding: 5rem
  border: 1px solid rgba(0, 0, 0, 0.1)
  border-radius: 15px
  display: flex
  flex-flow: column wrap
  justify-content: center
  align-items: center

.login-box h1 
  color: rgba(0, 0, 0, 0.3)
  margin-bottom: 3rem
  font-family: 'Quicksand', sans-serif

.login-form 
  width: 350px
  font-family: 'Quicksand', sans-serif
  font-weight: 200


.login-controls 
  margin-top: 4rem
  display: flex
  flex-flow: column wrap
  text-align: center


.link-primary 
  color: #333333
  margin-top: 1rem
  font-family: 'Quicksand', sans-serif
  font-weight: 200

</style>
