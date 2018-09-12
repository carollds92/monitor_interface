<script>
import Navigation from './Navigation.vue'
import axios from 'axios'
import config from '../../config/app'

const API_URL = config.getApiURL()
const API_TOKEN = config.getApiToken()
export default {
  name: 'patient',
  components: {
    Navigation
  },
  data () {
    return {
      patientList: null
    }
  },
  methods: {
    removeHandller: function (id) {
      this.$swal({
        title: 'Você tem certeza?',
        text: 'Você não poderá reverter esta ação!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remover!'
      }).then((result) => {
        if (result.value) {
          axios.delete(API_URL + 'patient/' + id, API_TOKEN).then(response => {
            if (response.status === 200) {
              this.patientList = this.patientList.filter(item => item._id !== response.data._id)
              this.$swal(
                'Excluido!',
                'O paciente foi removido da base de Dados.',
                'success'
              )
            }
          }).catch(error => {
            console.log(error.response.data)
          })
        }
      })
    }
  },
  mounted () {
    axios.get(API_URL + 'patient/', API_TOKEN).then(response => {
      if (response.status === 200) {
        this.patientList = response.data
      }
    }).catch(error => {
      console.log(error.response.data)
    })
  }
}
</script>
<template>
  <div class="wrapper">
    <Navigation></Navigation>

    <div class="table-wrapper">
      <md-table class="table-color" md-card>
        <md-table-toolbar>
          <h1 class="md-title">Pacientes</h1>
        </md-table-toolbar>
        <md-table-row>
          <md-table-head >Nome</md-table-head>
          <md-table-head>Sobrenome</md-table-head>
          <md-table-head>Email</md-table-head>
          <md-table-head>Idade</md-table-head>
          <md-table-head>Peso</md-table-head>
          <md-table-head>Medicamentos</md-table-head>
          <md-table-head>Remover</md-table-head>
        </md-table-row>

        <md-table-row v-for="patient in patientList" :key="patient._id">
          <md-table-cell md-label="first_name" md-sort-by="first_name">{{patient.first_name}}</md-table-cell>
          <md-table-cell md-label="last_name">{{patient.last_name}}</md-table-cell>
          <md-table-cell md-label="email" md-sort-by="email">{{patient.email}}</md-table-cell>
          <md-table-cell md-label="age">{{patient.age}}</md-table-cell>
          <md-table-cell md-label="weight">{{patient.weight}}</md-table-cell>
          <md-table-cell md-label="">{{patient.medicines}}</md-table-cell>
          <md-table-cell><md-button class="md-icon-button md-primary" v-on:click="removeHandller(patient._id)"><md-icon >clear</md-icon></md-button></md-table-cell>
        </md-table-row>
      </md-table>
      <div class="controls">
        <md-button class="md-raised md-primary" href="#/new-patient">Cadastrar Pacientes</md-button>
      </div>
    </div>
  </div>
</template>
<style lang="sass" scoped>
$main-bg: #ecf0f1

.controls 
  margin-top: 4rem
  display: flex
  flex-flow: column wrap
  text-align: center
  width: 25vh

.wrapper
  background: $main-bg
  height: 100vh

.table-wrapper
  height: 70vh
  display: flex
  flex-flow: column wrap
  justify-content: center
  align-items: center

.table-color
  background: #fff
  padding: 2.5rem
  border-radius: 20px

</style>
