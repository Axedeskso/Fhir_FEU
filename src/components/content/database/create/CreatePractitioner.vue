<template>
  <div class="panel" id="fadeCreatePractitioner"  v-show="showLocal">
    <div class="panel-content">
      <div class='backArrow'> <a href="#home" @click="reset">&#10140;</a></div>
      <h1 class='h1-modal'> Ajout de la ressource Practitioner</h1>
      <div class='shadow-block adjust'>
        <div class='margin15'>
          <b-card  no-body>
            <b-tabs card>

              <b-tab title="Identité" active>
                <div class="row">
                <div class="col-sm-1">
                  <label class='lab-modal'>Sexe</label>
                </div>
                <div class='col'>
                  <select v-model="gender" class="form-control">
                    <option disabled value="">Choisissez</option>
                    <option value="female">Femme</option>
                    <option value="male">Homme</option>
                  </select>
                </div>
                <div class="col-sm-1">
                  <label class='lab-modal'>Date de naissance</label>
                </div>
                <div class='col'>
                  <datepicker v-model="birthDate" placeholder="Selectionnez une date" name="uniquename"></datepicker>
                </div>
              </div>
              <div class="row" v-for="(name, indexName) in nameLocal">
                <div class="col-sm-1">
                  <label class='lab-modal' >Utilisation</label>
                </div>
                <div class="col" >
                  <input
                    type="text"
                    placeholder="ex: Home"
                    class="form-control"
                    v-model="nameLocal[indexName].use" />
                </div>
                <div class="col-sm-1" >
                  <label class='lab-modal'>Nom(s)</label>
                </div>
                <div class="col" >
                  <div v-for="(family, index) in name.family">
                    <input type="text" placeholder="Nom" class="form-control" v-model="nameLocal[indexName].family[index]" />
                  </div>
                </div>
                <div class="col-sm-1">
                  <div class="input-group-btn">
                    <button class="btn btn-success" @click="addFamily(indexName)"><span class="glyphicon glyphicon-plus white"></span></button>
                    <button class="btn btn-danger" @click="delFamily(indexName)"><span class="glyphicon glyphicon-trash white"></span></button>
                  </div>
                </div>
                <div class="col-sm-1" >
                  <label class='lab-modal'>Prénom(s)</label>
                </div>
                <div class="col" >
                  <div v-for="(given, index) in name.given">
                    <input type="text" placeholder="Prénom" class="form-control" v-model="nameLocal[indexName].given[index]" />
                  </div>
                </div>
                <div class="col-sm-1" >
                  <div class="input-group-btn">
                      <button class="btn btn-success" @click="addGiven(indexName)"><span class="glyphicon glyphicon-plus white"></span></button>
                      <button class="btn btn-danger" @click="delGiven(indexName)"><span class="glyphicon glyphicon-trash white"></span></button>
                  </div>
                </div>
              </div>
            </b-tab>

            <b-tab title="Communication">
              <div class="row">
                <div class="col-sm-1">
                  <label class='lab-modal'>Utilisation</label>
                </div>
                <div class='col'>
                  <div v-for="(telecom, index) in telecom">
                    <input type="text" placeholder="Utilisation" class="form-control" v-model="telecom.use" />
                  </div>
                </div>
                <div class="col-sm-1">
                  <label class='lab-modal'>Système</label>
                </div>
                <div class='col'>
                  <div v-for="(telecom, index) in telecom">
                    <input type="text" placeholder="ex:phone, email..." class="form-control" v-model="telecom.system" />
                  </div>
                </div>
                <div class="col-sm-1">
                  <label class='lab-modal'>Valeur</label>
                </div>
                <div class='col'>
                  <div v-for="(telecom, index) in telecom">
                    <input type="text" placeholder="ex:0662816336" class="form-control" v-model="telecom.value" />
                  </div>
                </div>
                <div class="col-sm-1" >
                  <div class="input-group-btn">
                      <button class="btn btn-success" @click="addTelecom"><span class="glyphicon glyphicon-plus white"></span></button>
                      <button class="btn btn-danger" @click="delTelecom"><span class="glyphicon glyphicon-trash white"></span></button>
                  </div>
                </div>
              </div>
            </b-tab>
            </b-tabs>
          </b-card>
        </div>
        <a class="btn btn-xs btn-success white-link" href="#home" @click="pushFields">Confirmer</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Datepicker from 'vuejs-datepicker'

function initialState (show) {
  return {
    gender: '',
    birthDate: '',
    telecom: [{
      use: '',
      system: '',
      value: ''
    }],
    nameLocal: [{
      family: [''],
      given: [''],
      use: ''
    }],
    showLocal: show
  }
}
export default {
  props: ['show'],
  components: {
    Datepicker
  },
  data: function () {
    return initialState(this.show)
  },
  methods: {
    addFamily: function (index) {
      this.nameLocal[index].family.push('')
    },
    delFamily: function (index) {
      this.nameLocal[index].family.pop()
    },
    addGiven: function (index) {
      this.nameLocal[index].given.push('')
    },
    delGiven: function (index) {
      this.nameLocal[index].given.pop()
    },
    addTelecom: function () {
      this.telecom.push({
        use: '',
        system: '',
        value: ''
      })
    },
    delTelecom: function () {
      this.telecom.pop()
    },
    reset: function () {
      Object.assign(this.$data, this.$options.data.call(this))
    },
    pushFields: function () {
      console.log(JSON.stringify({name: this.nameLocal, gender: this.gender, telecom: this.telecom}))
      var resource = {name: this.nameLocal, gender: this.gender, telecom: this.telecom, birthDate: this.birthDate}
      var token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzZmVzZmVzZ2VzZXMiLCJmdWxsTmFtZSI6IlRlc3QxIiwiX2lkIjoiNTljYTcwM2MzODJjYmUwNjQwY2FmZGQ0IiwiaWF0IjoxNTA2NDM5MzQxfQ.ty46L_-y5FmItHu1I0Wv9TcBfciaLGu_9PdajKWUyas'
      axios.post('http://62.210.38.108/fhir/core/api/practitioner/create', resource, {headers: { 'Authorization': token }}).then(response => {
        this.showSuccess = true
        this.dismissCountDownSuccess = this.dismissSecs
        Object.assign(this.$data, this.$options.data.call(this))
        this.$root.$emit('bv::refresh::table', 'practitioner-table')
      })
        .catch(e => {
          this.dismissCountDownError = this.dismissSecs
          this.errors.push(e)
        })
    },
    confirmAdd () {
      console.log(this.formdata)
    }
  }
}
</script>
