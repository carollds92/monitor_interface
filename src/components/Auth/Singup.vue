<script>
import Auth from '../../services/Authentication'

export default {
  name: 'singup',
  data () {
    return {
      first_name: '',
      last_name: '',
      email: '',
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
    sinupHandler: function () {
      let credentials = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        login: this.login,
        password: this.password
      }
      Auth.signup(this, credentials)
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
      <h1>Criar Conta</h1>
      <div class="login-form">

        <md-input-container>
          <label>Nome</label>
          <md-input v-model="first_name" type="name"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Sobrenome</label>
          <md-input v-model="last_name" type="name"></md-input>
        </md-input-container>
        
        <md-input-container>
          <label>Email</label>
          <md-input v-model="email" type="email"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Login</label>
          <md-input v-model="login" type="name"></md-input>
        </md-input-container>

        <md-input-container md-has-password>
          <label>Senha</label>
          <md-input v-model="password" type="password" ></md-input>
        </md-input-container>

      </div>

      <div class="login-controls">
        <md-button class="md-raised md-primary" v-on:click="sinupHandler">Cadastrar</md-button>
        <a class='link-primary' href="#/login">Ja possui uma conta?</a>
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
