<script>
import Navigation from './Navigation.vue'
import axios from 'axios'
import config from '../../config/app'
const API_URL = config.getApiURL()

export default {
  name: 'patient',
  components: {
    Navigation
  },
  data () {
    return {
      patientList: null,
      patientEdit: {
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        age: '',
        weight: '',
        medicines: ''
      }
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
          let API_TOKEN = { headers: {'Authorization': JSON.parse(localStorage.getItem('auth')).token.type_token + ' ' + JSON.parse(localStorage.getItem('auth')).token.acess_token} }
          axios.delete(API_URL + 'patient/' + id, API_TOKEN).then(response => {
            if (response.status === 200) {
              axios.get(API_URL + 'patient/', API_TOKEN).then(response => { this.patientList = response.data })
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
    },
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    editClickHandller: function (id) {
      let el = this.patientList.find(item => {
        return item._id === id
      })
      this.patientEdit._id = el._id
      this.patientEdit.first_name = el.first_name
      this.patientEdit.last_name = el.last_name
      this.patientEdit.email = el.email
      this.patientEdit.age = el.age
      this.patientEdit.weight = el.weight
      this.patientEdit.medicines = el.medicines
      this.openDialog('modal_edit')
    },
    saveEdited () {
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
          axios.put(API_URL + 'patient/' + this.patientEdit._id, this.patientEdit, API_TOKEN).then(response => {
            if (response.status === 200) {
              axios.get(API_URL + 'patient/', API_TOKEN).then(response => { this.patientList = response.data })
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
  }
}
</script>
<template>
  <div class="wrapper">
    <Navigation></Navigation>

    <md-dialog  ref="modal_edit">
      <md-dialog-title>Editar Paciente</md-dialog-title>
        
        <div class="wrapper-form">
          <div class="box">
            <div class="form">

              <md-input-container>
                <label>Nome</label>
                <md-input v-model="patientEdit.first_name" type="name"></md-input>
              </md-input-container>

              <md-input-container>
                <label>Sobrenome</label>
                <md-input v-model="patientEdit.last_name" type="name"></md-input>
              </md-input-container>
              
              <md-input-container>
                <label>Email</label>
                <md-input v-model="patientEdit.email" type="email"></md-input>
              </md-input-container>

              <md-input-container>
                <label>Idade</label>
                <md-input v-model="patientEdit.age" type="text"></md-input>
              </md-input-container>

              <md-input-container>
                <label>Peso</label>
                <md-input v-model="patientEdit.weight" type="text"></md-input>
              </md-input-container>

              <md-input-container>
                <label>Medicamentos</label>
                <md-textarea v-model="patientEdit.medicines"></md-textarea>
              </md-input-container>

            </div>
          </div>
        </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('modal_edit')">Fechar</md-button>
        <md-button class="md-primary" @click="saveEdited()">Salvar</md-button>
      </md-dialog-actions>
    </md-dialog>

    <div class="table-wrapper">
      <md-table class="table-color" md-card>
        <md-toolbar>
          <h1 class="md-title">Pacientes</h1>
          <md-button class="md-icon-button md-primary" href="#/new-patient"><md-icon >add_circle</md-icon></md-button>
        </md-toolbar>
        
        <md-table-row>
          <md-table-head >Nome</md-table-head>
          <md-table-head>Sobrenome</md-table-head>
          <md-table-head>Email</md-table-head>
          <md-table-head>Idade</md-table-head>
          <md-table-head>Peso</md-table-head>
          <md-table-head>Medicamentos</md-table-head>
          <md-table-head>Remover</md-table-head>
          <md-table-head>Editar</md-table-head>
        </md-table-row>

        <md-table-row v-for="patient in patientList" :key="patient._id">
          <md-table-cell md-label="first_name" md-sort-by="first_name">{{patient.first_name}}</md-table-cell>
          <md-table-cell md-label="last_name">{{patient.last_name}}</md-table-cell>
          <md-table-cell md-label="email" md-sort-by="email">{{patient.email}}</md-table-cell>
          <md-table-cell md-label="age">{{patient.age}}</md-table-cell>
          <md-table-cell md-label="weight">{{patient.weight}}</md-table-cell>
          <md-table-cell md-label="">{{patient.medicines}}</md-table-cell>
          <md-table-cell><md-button class="md-icon-button md-primary" v-on:click="removeHandller(patient._id)"><md-icon >clear</md-icon></md-button></md-table-cell>
          <md-table-cell><md-button class="md-icon-button md-primary" v-on:click="editClickHandller(patient._id)"><md-icon >create</md-icon></md-button></md-table-cell>

        </md-table-row>
      </md-table>
      
    </div>
  </div>
</template>
<style lang="sass" scoped>
$main-bg: #ecf0f1

.form 
  width: 450px
  font-family: 'Quicksand', sans-serif
  font-weight: 200

.wrapper-form 
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


.controls 
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

.md-theme-default.md-toolbar
  color: #000
  background: #fff
</style>
