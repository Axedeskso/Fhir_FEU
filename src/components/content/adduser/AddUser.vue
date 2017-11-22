<template>
  <div id="adduser" class="content">
    <div role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion1 variant="green">Ajouter un utilisateur</b-btn>
        </b-card-header>
        <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div>
              <b-form @submit="onSubmit">
                <b-container class="bv-example-row">
                  <b-row>
                    <b-col>
                      <b-form-group id="exampleInputGroup1"
                                  label="Email address:" label-for="exampleInput1"
                                  description="We'll never share your email with anyone else.">
                        <b-form-input id="exampleInput1"
                                      type="email" v-model="user.email" required
                                      placeholder="Enter email">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="exampleInputGroup2"
                                  label="Your Name:" label-for="exampleInput2">
                        <b-form-input id="exampleInput2"
                                      type="text" v-model="user.fullName" required
                                      placeholder="Enter name">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="exampleInputGroup3"
                                  label="Your Password:" label-for="exampleInput3">
                        <b-form-input id="exampleInput2"
                                      type="password" v-model="user.password" required
                                      placeholder="Enter password">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-container>     
                <b-button type="submit" variant="success">Submit</b-button>
                <b-button type="reset" variant="secondary">Reset</b-button>
              </b-form>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion2 variant="green">Liste des utilisateurs</b-btn>
        </b-card-header>
        <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div class="my-1 row">
              <div class="col-md-6">
                <b-form-group horizontal label="Filter" :label-cols="3">
                  <b-form-input v-model="filter" placeholder="Type to Search" />
                </b-form-group>
              </div>
            </div>

            <div class="row my-1">
              <div class="col-sm-8">
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" />
              </div>
              <div class="col-sm-4 text-md-right">
                <b-button :disabled="!sortBy" @click="sortBy = null">Clear Sort</b-button>
              </div>
            </div>
            <b-table id="user-table" small fixed bordered striped hover show-empty
                     :no-provider-paging="true"
                     :no-provider-sorting="true"
                     :no-provider-filtering="true"
                     :busy.sync="isBusy" 
                     :items="users"
                     :fields="fields"
                     :current-page="currentPage"
                     :per-page="perPage"
                     :filter="filter"
                     :sort-by.sync="sortBy"
                     :sort-desc.sync="sortDesc"
                     @filtered="onFiltered"
            >
              <template slot="fullName" slot-scope="row">{{row.item.fullName}}</template>
              <template slot="email" slot-scope="row">{{row.item.email}}</template>
              <template slot="created" slot-scope="row">{{row.item.created}}</template>
              <template slot="actions" slot-scope="row">
                <button class="btn btn-xs btn-success" @click.stop="details(row.item,row.index,$event.target)">
                  <span class="glyphicon glyphicon-search"></span>
                </button>
                <button class="btn btn-xs btn-primary" @click.stop="edit(row.item,row.index,$event.target)">
                      <span class="glyphicon glyphicon-pencil"></span>
                </button>
              </template>
            </b-table>

            <p>
              Sort By: {{ sortBy || 'n/a' }}, Direction: {{ sortDesc ? 'descending' : 'ascending' }}
            </p>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-modal id="modaluser" class="modaluser" size="lg" @hide="resetModal" ok-only>
      <h4 class="my-1 py-1" slot="modal-header">Utilisateur: {{ modalDetails.data.fullName }}</h4>
        <b-container class="bv-example-row">
          <b-row>
              <b-col>
                Email : {{modalDetails.data.email}}
              </b-col>
              <b-col>
                Date de création : {{modalDetails.data.created}}
              </b-col>
          </b-row>
        </b-container>
      </b-modal>

      <b-modal id="modaluser-edit" class="modaluser" size="lg" @hide="resetModal">
      <h4 class="my-1 py-1" slot="modal-header">Modification de l'utilisateur: {{ modalDetails.data.fullName }}</h4>
        <b-container class="bv-example-row">
          <b-row>
              <b-col>
                Email : {{modalDetails.data.email}}
              </b-col>
              <b-col>
              Date de création : {{modalDetails.data.created}}
              </b-col>
          </b-row>
        </b-container>
      </b-modal>
    </div>

    <b-alert :show="dismissCountDownSuccess"
                 dismissible
                 variant="success"
                 @dismissed="dismissCountdown=0"
                 @dismiss-count-down="countDownChanged">
          Créé ! L'utilisateur  {{this.user.fullName}} à été enregistré.
    </b-alert>

    <b-alert :show="dismissCountDownError"
                 dismissible
                 variant="danger"
                 @dismissed="dismissCountdown=0"
                 @dismiss-count-down="countDownChanged">
          Erreur ! L'utilisateur n'a pas pu être enregistré.
    </b-alert>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'test',
  components: {
  },
  data () {
    return {
      user: {
        email: null,
        fullName: null,
        password: null
      },
      items: [],
      fields: {
        fullName: {
          label: 'Nom',
          sortable: true,
          'class': 'text-center'
        },
        email: {
          label: 'Email',
          sortable: true,
          'class': 'text-center'
        },
        created: {
          label: 'Date de création',
          sortable: true,
          'class': 'text-center'
        },
        actions: {
          label: ''
        }
      },
      currentPage: 1,
      perPage: 10,
      totalRows: null,
      sortBy: null,
      sortDesc: false,
      filter: null,
      modalDetails: {
        index: '',
        data: '',
        _id: ''
      },
      isBusy: false,
      dismissSecs: 3,
      dismissCountDownSuccess: 0,
      dismissCountDownError: 0
    }
  },
  methods: {
    doLogin () {
      this.submitData = this.user
    },
    details (item, index, button) {
      this.modalDetails.data = item
      this.modalDetails.index = index
      this.modalDetails._id = item._id
      this.$root.$emit('bv::show::modal', 'modaluser', button)
    },
    edit (item, index, button) {
      this.modalDetails.data = item
      this.modalDetails.index = index
      this.modalDetails._id = item._id
      this.$root.$emit('bv::show::modal', 'modaluser-edit', button)
    },
    resetModal () {
      this.modalDetails.data = ''
      this.modalDetails.index = ''
      this.modalDetails._id = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    users (ctx) {
      // Here we don't set isBusy prop, so busy state will be handled by table itself
      // this.isBusy = true
      var token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzZmVzZmVzZ2VzZXMiLCJmdWxsTmFtZSI6IlRlc3QxIiwiX2lkIjoiNTljYTcwM2MzODJjYmUwNjQwY2FmZGQ0IiwiaWF0IjoxNTA2NDM5MzQxfQ.ty46L_-y5FmItHu1I0Wv9TcBfciaLGu_9PdajKWUyas'
      let promise = axios.get('http://62.210.38.108/fhir/core/auth/users', {headers: { 'Authorization': token }})

      return promise.then(response => {
        console.log(response)
        const items = response.data
        this.totalRows = items.length
        return (items)
      })
      .catch(error => {
        console.log(error.response)
        return []
      })
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    onSubmit (evt) {
      evt.preventDefault()
      axios.post('http://62.210.38.108/fhir/core/auth/register', this.user).then(response => {
        console.log(response)
        this.showSuccess = true
        this.dismissCountDownSuccess = this.dismissSecs
        this.$root.$emit('bv::refresh::table', 'user-table')
      })
        .catch(e => {
          this.dismissCountDownError = this.dismissSecs
          this.errors.push(e)
        })
    }
  }
}
</script>
