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
      patientData: {
        _id: '',
        _user: '',
        first_name: '',
        last_name: '',
        email: '',
        age: '',
        weight: '',
        sensor: '',
        medicines: ''
      },
      modalTitle: '',
      modalState: ''
    }
  },
  methods: {
    modalActionHandller: function (action, id) {
      if (action === 'modal_edit') {
        this.modalTitle = 'Editar Paciente'
        this.modalState = 'ed'
        this.editHandller(id)
      } else {
        this.modalTitle = 'Novo Paciente'
        this.modalState = 'sv'
        this.resetPatientInfo()
        this.openDialog('modalAction')
      }
    },
    newPatientHandller: function () {
      delete this.patientData['_id']
      let API_TOKEN = { headers: {'Authorization': JSON.parse(localStorage.getItem('auth')).token.type_token + ' ' + JSON.parse(localStorage.getItem('auth')).token.acess_token} }
      axios.post(API_URL + 'patient/', this.patientData, API_TOKEN).then((response) => {
        if (response.status === 200) {
          axios.get(API_URL + 'patient/doctor/' + this.patientData._user, API_TOKEN)
            .then(response => { this.patientList = response.data })
            .then(() => {
              this.$swal(
                'Salvo!',
                'O paciente foi salvo da base de Dados.',
                'success'
              ).then(() => {
                this.closeDialog('modalAction')
              })
            }).catch(err => {
              this.$swal(
                'Erro!',
                'Ocorreu um erro.',
                'error'
              ).then(() => {
                this.closeDialog('modalAction')
              })
              console.log(err)
            })
        }
      }).catch(error => {
        console.log(error.response.data)
      })
    },
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
              axios.get(API_URL + 'patient/doctor/' + this.patientData._user, API_TOKEN)
                .then(response => { this.patientList = response.data })
                .then(() => {
                  this.$swal(
                    'Excluido!',
                    'O paciente foi removido da base de Dados.',
                    'success'
                  ).then(() => {
                    this.closeDialog('modalAction')
                  })
                }).catch(err => {
                  this.$swal(
                    'Erro!',
                    'Ocorreu um erro.',
                    'error'
                  ).then(() => {
                    this.closeDialog('modalAction')
                  })
                  console.log(err)
                })
            }
          }).catch(error => {
            console.log(error.response.data)
          })
        }
      })
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
          axios.put(API_URL + 'patient/' + this.patientData._id, this.patientData, API_TOKEN).then(response => {
            if (response.status === 200) {
              axios.get(API_URL + 'patient/doctor/' + this.patientData._user, API_TOKEN)
                .then(response => {
                  this.patientList = response.data
                  console.log(response.data)
                }).then(() => {
                  this.$swal(
                    'Sucesso!',
                    'O paciente foi editado.',
                    'success'
                  ).then(() => {
                    this.closeDialog('modalAction')
                  })
                }).catch((err) => {
                  this.$swal(
                    'Erro!',
                    'Ocorreu um erro.',
                    'error'
                  ).then(() => {
                    this.closeDialog('modalAction')
                  })
                  console.log(err)
                })
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
    editHandller: function (id) {
      let el = this.patientList.find(item => {
        return item._id === id
      })
      this.patientData._id = el._id
      this.patientData.first_name = el.first_name
      this.patientData.last_name = el.last_name
      this.patientData.email = el.email
      this.patientData.age = el.age
      this.patientData.weight = el.weight
      this.patientData.sensor = el.sensor
      this.patientData.medicines = el.medicines
      this.openDialog('modalAction')
    },
    resetPatientInfo () {
      this.patientData._id = ''
      this.patientData.first_name = ''
      this.patientData.last_name = ''
      this.patientData.email = ''
      this.patientData.age = ''
      this.patientData.weight = ''
      this.patientData.sensor = ''
      this.patientData.medicines = ''
    }
  },
  mounted () {
    let API_TOKEN = { headers: {'Authorization': JSON.parse(localStorage.getItem('auth')).token.type_token + ' ' + JSON.parse(localStorage.getItem('auth')).token.acess_token} }
    let _user = JSON.parse(localStorage.getItem('auth')).user._id
    axios.get(API_URL + 'patient/doctor/' + _user, API_TOKEN).then(response => {
      if (response.status === 200) {
        this.patientList = response.data
      }
      this.patientData._user = JSON.parse(localStorage.getItem('auth')).user._id
    }).catch(error => {
      console.log(error.response)
    })
  }
}
</script>
<template>
  <div class="wrapper">
    <Navigation></Navigation>

    <md-dialog ref="modalAction">
      <md-dialog-title>{{this.modalTitle}}</md-dialog-title>
        
        <div class="wrapper-form">
          <div class="box">
            <div class="form">

              <md-input-container>
                <label>Nome</label>
                <md-input v-model="patientData.first_name" type="name"></md-input>
              </md-input-container>

              <md-input-container>
                <label>Sobrenome</label>
                <md-input v-model="patientData.last_name" type="name"></md-input>
              </md-input-container>
              
              <md-input-container>
                <label>Email</label>
                <md-input v-model="patientData.email" type="email"></md-input>
              </md-input-container>

              <md-input-container>
                <label>Idade</label>
                <md-input v-model="patientData.age" type="text"></md-input>
              </md-input-container>

              <md-input-container>
                <label>Peso</label>
                <md-input v-model="patientData.weight" type="text"></md-input>
              </md-input-container>

              <md-input-container>
                <label>Monitor ID</label>
                <md-input v-model="patientData.sensor" type="text"></md-input>
              </md-input-container>

              <md-input-container>
                <label>Medicamentos</label>
                <md-textarea v-model="patientData.medicines"></md-textarea>
              </md-input-container>

            </div>
          </div>
        </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('modalAction')">Fechar</md-button>
        <md-button v-if="this.modalState === 'ed'" class="md-primary" @click="saveEdited()">Salvar</md-button>
        <md-button v-if="this.modalState === 'sv'" class="md-primary" @click="newPatientHandller()">Salvar</md-button>
      </md-dialog-actions>
    </md-dialog>

    <div class="table-wrapper">
      <md-table class="table-color" md-card>
        <md-toolbar>
          <h1 class="md-title">Pacientes</h1>
          <md-button class="md-icon-button md-primary" @click="modalActionHandller('save')"><md-icon >add_circle</md-icon></md-button>
        </md-toolbar>
        
        <md-table-row>
          <md-table-head >Nome</md-table-head>
          <md-table-head>Sobrenome</md-table-head>
          <md-table-head>Email</md-table-head>
          <md-table-head>Idade</md-table-head>
          <md-table-head>Peso</md-table-head>
          <md-table-head>Monitor ID</md-table-head>
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
          <md-table-cell md-label="weight">{{patient.sensor}}</md-table-cell>
          <md-table-cell md-label="">{{patient.medicines}}</md-table-cell>
          <md-table-cell><md-button class="md-icon-button md-primary" v-on:click="removeHandller(patient._id)"><md-icon >clear</md-icon></md-button></md-table-cell>
          <md-table-cell><md-button class="md-icon-button md-primary" v-on:click="modalActionHandller('modal_edit', patient._id)"><md-icon >create</md-icon></md-button></md-table-cell>

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
