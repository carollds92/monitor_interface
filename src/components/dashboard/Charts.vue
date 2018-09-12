<script>
import Navigation from './Navigation.vue'
import { GChart } from 'vue-google-charts'
import axios from 'axios'
import config from '../../config/app'
const API_URL = config.getApiURL()

export default {
  name: 'charts',
  components: {
    Navigation,
    GChart
  },
  data () {
    return {
      chartData: [
        ['Day', 'Bpm Avg'],
        ['Mon', 100],
        ['Tue', 117],
        ['Wed', 96],
        ['Thu', 103],
        ['Fri', 90],
        ['Sat', 89],
        ['Mon', 85]
      ],
      chartOptions: {
        chart: {
          title: 'Avg of BPM',
          subtitle: 'Avg of BPM for Patient'
        },
        width: 600,
        height: 300
      },
      patientList: []
    }
  },
  mounted () {
    let API_TOKEN = { headers: {'Authorization': JSON.parse(localStorage.getItem('auth')).token.type_token + ' ' + JSON.parse(localStorage.getItem('auth')).token.acess_token} }
    axios.get(API_URL + 'patient/', API_TOKEN).then(response => {
      if (response.status === 200) {
        this.patientList = response.data
      }
    }).catch(error => {
      console.log(error.response.data)
    })
  },
  methods: {
    chartHandller: function (id) {
      console.log(id)
      this.openDialog('modal_patient')
    },
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    }
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
          <md-table-head>Grafico de BPM</md-table-head>
        </md-table-row>

        <md-table-row v-for="patient in patientList" :key="patient._id">
          <md-table-cell md-label="first_name" md-sort-by="first_name">{{patient.first_name}}</md-table-cell>
          <md-table-cell md-label="last_name">{{patient.last_name}}</md-table-cell>
          <md-table-cell md-label="email" md-sort-by="email">{{patient.email}}</md-table-cell>
          <md-table-cell md-label="age">{{patient.age}}</md-table-cell>
          <md-table-cell md-label="weight">{{patient.weight}}</md-table-cell>
          <md-table-cell md-label="">{{patient.medicines}}</md-table-cell>
          <md-table-cell><md-button class="md-icon-button md-primary" v-on:click="chartHandller(patient._id)"><md-icon >bar_chart</md-icon></md-button></md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    
    <md-dialog  ref="modal_patient">
      <md-dialog-title>Gráfico de BPM</md-dialog-title>
      <div class="chart-wrapper">
        <GChart
          class="chart-item"
          type="LineChart"
          :data="chartData"
          :options="chartOptions"
        />
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('modal_patient')">Fechar</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>
<style lang="sass" scoped>
$main-bg: #ecf0f1

.md-dialog 
  max-width: 768px
  
.wrapper
  background: $main-bg;
  height: 100vh;

.chart-wrapper
  display: flex
  align-items: center
  justify-content: center

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
