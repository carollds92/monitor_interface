<script>
import Navigation from './Navigation.vue'
import config from '../../config/app'
import axios from 'axios'
const API_URL = config.getApiURL()
export default {
  name: 'newPatient',
  components: {
    Navigation
  },
  data () {
    return {
      first_name: '',
      last_name: '',
      email: '',
      age: '',
      weight: '',
      medicines: ''
    }
  },
  methods: {
    saveHandler: function () {
      let data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        age: this.age,
        weight: this.weight,
        medicines: this.medicines
      }
      let API_TOKEN = { headers: {'Authorization': JSON.parse(localStorage.getItem('auth')).token.type_token + ' ' + JSON.parse(localStorage.getItem('auth')).token.acess_token} }
      axios.post(API_URL + 'patient/', data, API_TOKEN).then((response) => {
        if (response.status === 200) {
          this.$router.push('/patient')
        }
      }).catch(error => {
        console.log(error.response.data)
      })
    }
  }
}
</script>
<template>
  <div class="wrapper">
    <Navigation></Navigation>
      <a class='link-primary' href="#/patient"><md-icon class="md-size-4x arrow-color">navigate_before</md-icon> </a>
    <div class="wrapper-form">
    
    <div class="box">
      <h1>Cadastrar Paciente</h1>
      <div class="form">

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
          <label>Idade</label>
          <md-input v-model="age" type="text"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Peso</label>
          <md-input v-model="weight" type="text"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Medicamentos</label>
          <md-textarea v-model="medicines"></md-textarea>
        </md-input-container>

      </div>

      <div class="controls">
        <md-button class="md-raised md-primary" v-on:click="saveHandler">Salvar</md-button>
      </div>

    </div>
  </div>

  </div>
</template>
<style lang="sass" scoped>
$main-bg: #ecf0f1;

.arrow-color
  color: #C6D4D8
  cursor: pointer

.wrapper
  background: $main-bg
  height: 100vh

.wrapper-form 
  background: $main-bg
  height: 100vh
  display: flex
  flex-flow: column wrap
  justify-content: center
  align-items: center


.box
  padding: 5rem
  border-radius: 15px
  display: flex
  flex-flow: column wrap
  justify-content: center
  align-items: center

.box h1 
  color: rgba(0, 0, 0, 0.3)
  margin-bottom: 3rem
  font-family: 'Quicksand', sans-serif

.form 
  width: 450px
  font-family: 'Quicksand', sans-serif
  font-weight: 200


.controls 
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
