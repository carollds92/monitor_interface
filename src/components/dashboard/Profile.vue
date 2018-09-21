<script>
import Navigation from './Navigation.vue'
import axios from 'axios'
import config from '../../config/app'
const API_URL = config.getApiURL()

export default {
  name: 'profile',
  components: {
    Navigation
  },
  data () {
    return {
      user: {
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        login: '',
        password: ''
      }
    }
  },
  mounted () {
    let user = JSON.parse(localStorage.getItem('auth')).user
    this.user._id = user._id
    this.user.first_name = user.first_name
    this.user.last_name = user.last_name
    this.user.email = user.email
    this.user.login = user.login
  },
  methods: {
    editUserHandller: function () {
      this.$swal({
        title: 'Você tem certeza?',
        text: 'Você não poderá reverter esta ação!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, salvar alteraçoẽs!'
      }).then((result) => {
        if (result.value) {
          let API_TOKEN = { headers: {'Authorization': JSON.parse(localStorage.getItem('auth')).token.type_token + ' ' + JSON.parse(localStorage.getItem('auth')).token.acess_token} }
          axios.put(API_URL + 'user/' + this.user._id, this.user, API_TOKEN).then(response => {
            if (response.status === 200) {
              axios.get(API_URL + 'user/' + this.user._id, API_TOKEN).then(response => { this.user = response.data })
              this.$swal(
                'Sucesso!',
                'O paciente foi editado.',
                'success'
              )
            }
          }).catch(error => {
            console.log(error.response.data)
          })
        }
      })
    }
  }
}
</script>
<template>
  <div class="wrapper">
    <Navigation></Navigation>
     <div class="login-wrapper">
      <div class="login-box">
        <h1>Ediar Perfil</h1>
        <div class="login-form">

          <md-input-container>
            <label>Nome</label>
            <md-input v-model="user.first_name" type="name"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Sobrenome</label>
            <md-input v-model="user.last_name" type="name"></md-input>
          </md-input-container>
          
          <md-input-container>
            <label>Email</label>
            <md-input v-model="user.email" type="email"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Login</label>
            <md-input v-model="user.login" type="name"></md-input>
          </md-input-container>

          <md-input-container md-has-password>
            <label>Senha</label>
            <md-input v-model="user.password" type="password" ></md-input>
          </md-input-container>

        </div>

        <div class="login-controls">
          <md-button class="md-raised md-primary" v-on:click="editUserHandller">Salvar</md-button>
        </div>

      </div>

    </div>
  </div>
</template>
<style lang="sass" scoped>
$main-bg: #ecf0f1

.wrapper
  background: $main-bg


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

</style>
