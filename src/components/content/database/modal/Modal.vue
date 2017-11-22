<template>
  <div>
    <div class="panel" id="fade"  v-show="showLocal">
        <div class="panel-content"  v-if="type === 'show'">
        <div class='backArrow'> <a href="#home" @click="reset">&#10140; </a></div>
        <h1 class='h1-modal'> {{ resource}} : détail {{ item.content._id }}</h1>
        <div class='shadow-block adjust'>
          <div v-if="resource === 'Practitioner'">
            <div class='margin15' id='ident-practi'>
              <b-card no-body>
                <b-tabs card>
                  <b-tab title="Identité" active>
                    <div class="row">
                      <div class="col-sm-1">
                        <label class='lab-modal'>Sexe</label>
                      </div>
                      <div class='col'>
                        <div class="form-control">{{ item.content.gender }}</div>
                      </div>
                      <div class="col-sm-1">
                        <label class='lab-modal'>Date de naissance</label>
                      </div>
                      <div class='col'>
                        <div class="form-control">{{ item.content.birthDate}}</div>
                      </div>
                    </div>
                    <div class="row" v-for="name in item.content.name">
                      <div class="col-sm-1">
                        <label class='lab-modal' >Utilisation</label>
                      </div>
                      <div class="col" >
                        <div class="form-control">{{ name.use }}</div>
                      </div>
                      <div class="col-sm-1" >
                        <label class='lab-modal'>Nom(s)</label>
                      </div>
                      <div class="col" >
                        <div class="form-control" v-for="family in name.family">
                          {{ family }}
                        </div>
                      </div>
                      <div class="col-sm-1" >
                        <label class='lab-modal'>Prénom(s)</label>
                      </div>
                      <div class="col" >
                        <div  class="form-control" v-for="given in name.given">
                          {{ given }}
                        </div>
                      </div>
                    </div>
                </b-tab>
                <b-tab title="Communication">
                  <div class="row" v-for="telecom in item.content.telecom" >
                    <div class="col-sm-1">
                      <label class='lab-modal'>Utilisation</label>
                    </div>
                    <div class='col'>
                      <div class="form-control">
                        {{ telecom.use }}
                      </div>
                    </div>
                    <div class="col-sm-1">
                      <label class='lab-modal'>Système</label>
                    </div>
                    <div class='col'>
                      <div class="form-control">{{ telecom.system }}</div>
                    </div>
                    <div class="col-sm-1">
                      <label class='lab-modal'>Valeur</label>
                    </div>
                    <div class='col'>
                      <div class="form-control">{{ telecom.value}}</div>
                    </div>
                  </div>
                </b-tab>
                <b-tab title="Diplômes/Qualifications">
                  <div class="row" v-for="qualification in item.content.qualification">
                  <div  v-if="qualification.code.text">
                    <div class="col-sm-1">
                      <label class='lab-modal'>Nom</label>
                    </div>
                    <div class='col'>
                      <div class="form-control">
                        {{ qualification.code.text }}
                      </div>
                    </div>
                    <div class="col-sm-1">
                      <label class='lab-modal'>Année</label>
                    </div>
                    <div class='col'>
                      <div class="form-control">{{ qualification.period}}</div>
                    </div>
                    <div class="col-sm-1">
                      <label class='lab-modal'>Lieu</label>
                    </div>
                    <div class='col'>
                      <div class="form-control">{{ qualification.issuer}}</div>
                    </div>
                    </div>
                  </div>
                  <div class="row" v-for="qualification in item.content.qualification">
                      <div v-for="coding in qualification.code.coding" v-if="qualification.code.coding">
                        <div class="col-sm-1">
                          <label class='lab-modal'>Statut</label>
                        </div>
                        <div class='col'>
                          <div class="form-control">
                            {{ coding.display }}
                          </div>
                        </div>
                      </div>
                  </div>
                </b-tab>
               </b-tabs>
            </b-card>
          </div>
        </div>
        </div>
        </div>
        <div class="panel-content"  v-else-if="type === 'edit'">
       <div class='backArrow'> <a href="#home" @click="reset">&#10140;</a></div>
        <h1 class='h1-modal'> {{ resource}} : Modification {{ item.content._id }}</h1>
        <div class='shadow-block adjust'>
          <div v-if="resource === 'Practitioner'">
          <div class='margin15'>
              <b-card no-body>
              <b-tabs card>
                  <b-tab title="Identité" active>
                      <div class="row">
                      <div class="col-sm-1">
                        <label class='lab-modal'>Sexe</label>
                      </div>
                      <div class='col'>
                        <select v-model="item.content.gender" class="form-control">
                          <option disabled value="">Choisissez</option>
                          <option value="female">Femme</option>
                          <option value="male">Homme</option>
                        </select>
                      </div>
                      <div class="col-sm-1">
                        <label class='lab-modal'>Date de naissance</label>
                      </div>
                      <div class='col'>
                        <datepicker v-model="item.content.birthDate" placeholder="Selectionnez une date" name="uniquename"></datepicker>
                      </div>
                    </div>
                    <div class="row" v-for="(name, indexName) in item.content.name">
                      <div class="col-sm-1">
                        <label class='lab-modal' >Utilisation</label>
                      </div>
                      <div class="col" >
                        <input
                          type="text"
                          placeholder="ex: Home"
                          class="form-control"
                          v-model="name.use" />
                      </div>
                      <div class="col-sm-1" >
                        <label class='lab-modal'>Nom(s)</label>
                      </div>
                      <div class="col" >
                        <div v-for="(family, index) in name.family">
                          <input type="text" placeholder="Nom" class="form-control" v-model="item.content.name[indexName].family[index]" />
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
                          <input type="text" placeholder="Prénom" class="form-control" v-model="item.content.name[indexName].given[index]" />
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
                        <div v-for="(telecom, index) in item.content.telecom">
                          <input type="text" placeholder="Utilisation" class="form-control" v-model="telecom.use" />
                        </div>
                      </div>
                      <div class="col-sm-1">
                        <label class='lab-modal'>Système</label>
                      </div>
                      <div class='col'>
                        <div v-for="(telecom, index) in item.content.telecom">
                          <input type="text" placeholder="ex:phone, email..." class="form-control" v-model="telecom.system" />
                        </div>
                      </div>
                      <div class="col-sm-1">
                        <label class='lab-modal'>Valeur</label>
                      </div>
                      <div class='col'>
                        <div v-for="(telecom, index) in item.content.telecom">
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
          </div>
            <a class="btn btn-xs btn-success white-link" href="#home" @click="pushFields">Confirmer</a>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Datepicker from 'vuejs-datepicker'

function initialState (show) {
  return {
    showLocal: show
  }
}

export default {
  props: ['show', 'item', 'type', 'resource'],
  data: function () {
    return initialState(this.show)
  },
  components: {
     Datepicker
  },
  methods: {
    addFamily: function (index) {
      this.item.content.name[index].family.push('')
    },
    delFamily: function (index) {
      this.item.content.name[index].family.pop()
    },
    addGiven: function (index) {
      this.item.content.name[index].given.push('')
    },
    delGiven: function (index) {
      this.item.content.name[index].given.pop()
    },
    addTelecom: function () {
      this.item.content.telecom.push({
        use: '',
        system: '',
        value: ''
      })
    },
    delTelecom: function () {
      this.item.content.telecom.pop()
    },
    pushFields: function () {
      console.log(JSON.stringify(this.item))
      var token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzZmVzZmVzZ2VzZXMiLCJmdWxsTmFtZSI6IlRlc3QxIiwiX2lkIjoiNTljYTcwM2MzODJjYmUwNjQwY2FmZGQ0IiwiaWF0IjoxNTA2NDM5MzQxfQ.ty46L_-y5FmItHu1I0Wv9TcBfciaLGu_9PdajKWUyas'
      axios.put('http://62.210.38.108/fhir/core/api/practitioner/update/' + this.item.content._id, this.item.content, {headers: { 'Authorization': token }}).then(response => {
        console.log(response)
        this.showSuccess = true
        this.dismissCountDownSuccess = this.dismissSecs
        Object.assign(this.$data, this.$options.data.call(this))
        this.$root.$emit('bv::refresh::table', 'practitioner-table')
      })
        .catch(e => {
          this.dismissCountDownError = this.dismissSecs
          this.errors.push(e)
        })
      Object.assign(this.$data, this.$options.data.call(this))
    },
    reset: function () {
      Object.assign(this.$data, this.$options.data.call(this))
    },
    onSubmit (evt) {
      evt.preventDefault()
      console.log(JSON.stringify(this.item))
      var token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzZmVzZmVzZ2VzZXMiLCJmdWxsTmFtZSI6IlRlc3QxIiwiX2lkIjoiNTljYTcwM2MzODJjYmUwNjQwY2FmZGQ0IiwiaWF0IjoxNTA2NDM5MzQxfQ.ty46L_-y5FmItHu1I0Wv9TcBfciaLGu_9PdajKWUyas'
      axios.put('http://62.210.38.108/fhir/core/api/practitioner/update/' + this.item.content._id, this.item.content, {headers: { 'Authorization': token }}).then(response => {
        console.log(response)
        this.showSuccess = true
        this.dismissCountDownSuccess = this.dismissSecs
        Object.assign(this.$data, this.$options.data.call(this))
        this.$root.$emit('bv::refresh::table', 'practitioner-table')
      })
        .catch(e => {
          this.dismissCountDownError = this.dismissSecs
          this.errors.push(e)
        })
    }
  }

}
</script>
