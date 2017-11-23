<template>
  <div id="appointment" class="content">
    <div class="body-container">
      <div class="container-content">

        <div class="my-1 row">
          <div class="col-md-6">
            <b-form-group horizontal label="Filter" :label-cols="3">
              <b-form-input v-model="filter" placeholder="Type to Search" />
            </b-form-group>
          </div>
        </div>

        <div class="my-1 row">
      <b-table id='appointment-table' small fixed bordered striped hover show-empty
               :no-provider-paging="true"
               :no-provider-sorting="false"
               :no-provider-filtering="true"
               :busy.sync="isBusy"
               :items="appointment"
               :fields="fields"
               :current-page="currentPage"
               :per-page="perPage"
               :filter="filter"
               :sort-by.sync="sortBy"
               :sort-desc.sync="sortDesc"
               @filtered="onFiltered"
      >
      <!--
        <template slot="participant" slot-scope="row">
          <span v-if="row.item.content.participant !== 'null'">{{row.item.content.participant[1].actor.display}}</span>
        </template>
        <template slot="patient" slot-scope="row">
          <span v-if="row.item.content.participant[0] != 'null'">{{row.item.content.participant[0].actor.display}}</span>
        </template>-->
        <template slot="description" slot-scope="row">{{row.item.content.description}}</template>
        <template slot="start" slot-scope="row">{{row.item.content.start}}</template>
        <template slot="end" slot-scope="row">{{row.item.content.end}}</template>
        <template slot="status" slot-scope="row">{{row.item.content.status}}</template>
        <template slot="actions" slot-scope="row">
          <span v-if="row.item.content.status == 'booked' && row.item.content.status != 'proposed'">
            <a class="btn btn-xs btn-primary" href="#fade" data-hover="Fade" @click="clickItem(row, 'show', 'appointment')"><span class="glyphicon glyphicon-search white"></span></a>
          </span>
          <span v-if="row.item.content.status != 'booked' && row.item.content.status == 'proposed'">
            <a class="btn btn-xs btn-success" href="#/rendez-vous" data-hover="Fade" @click="postAppointmentRequest(row, 'accepted')"><span class="glyphicon glyphicon-ok white"></span></a>
            <a class="btn btn-xs btn-danger" href="#/rendez-vous" data-hover="FadeDelete" @click="postAppointmentRequest(row, 'declined')"><span class="glyphicon glyphicon-remove white"></span></a>
          </span>
        </template>
      </b-table>
    </div>
      <div class="row my-1">
        <div class="col-sm-12">
          <b-pagination  class="pag-tab" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" />
        </div>
      </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  participant: 'table-appointments',
  data () {
    return {
      items: [],
      fields: {
        participant: {
          label: 'Participant',
          key: 'participant',
          'class': 'text-center'
        },
        patient: {
          label: 'Patient',
          key: 'patient',
          'class': 'text-center'
        },
        description: {
          label: 'Description',
          key: 'description',
          sortable: true,
          'class': 'text-center'
        },
        start: {
          label: 'Début',
          key: 'start',
          sortable: true,
          'class': 'text-center'
        },
        end: {
          label: 'Fin',
          key: 'end',
          sortable: true,
          'class': 'text-center'
        },
        status: {
          label: 'Statut',
          key: 'status',
          sortable: true,
          'class': 'text-center'
        },
        actions: {
          label: ''
        }
      },
      currentPage: 1,
      perPage: 6,
      totalRows: null,
      sortBy: null,
      sortDesc: false,
      filter: null,
      modalDetails: {
        index: '',
        data: ''
      },
      isBusy: false,
      editingItem: {},
      show: false,
      typeModal: '',
      resource: ''
    }
  },
  methods: {
    clickItem (item, type, resource) {
      this.editingItem = item
      this.show = true
      this.typeModal = type
      this.resource = resource
      console.log(this.show + '-' + this.editingItem + '-' + this.typeModal)
      this.$emit('clicked-show-item', {item: item, show: this.show, typeModal: type, resourceType: resource})
    },
    addItem () {
      this.show = true
      this.$emit('clicked-add-item', {show: this.show})
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    appointment (ctx) {
      this.isBusy = true
      var token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzZmVzZmVzZ2VzZXMiLCJmdWxsTmFtZSI6IlRlc3QxIiwiX2lkIjoiNTljYTcwM2MzODJjYmUwNjQwY2FmZGQ0IiwiaWF0IjoxNTA2NDM5MzQxfQ.ty46L_-y5FmItHu1I0Wv9TcBfciaLGu_9PdajKWUyas'
      let promise = axios.get('http://62.210.38.108/fhir/core/api/appointment/', {headers: { 'Authorization': token }})
      return promise.then(response => {
        this.isBusy = false
        // console.log(response)
        const items = response.data.entry
        this.totalRows = items.length
        return (items)
      })
      .catch(error => {
        this.isBusy = false
        console.log(error.response)
        return []
      })
    },
    postAppointmentRequest (apt, reponse) {
      var obj = apt.item.content

      var resource = {
        'resourceType': 'AppointmentResponse',
        'id': '',
        'text': {
          'status': reponse,
          'div': ''
        },
        'identifier': [
          {
            'system': '',
            'value': ''
          }
        ],
        'appointment': {
          'reference': obj._id,
          'display': obj.description === 'undefined' ? '' : obj.description
        },
        'start': obj.start === 'undefined' ? '' : obj.start,
        'end': obj.end === 'undefined' ? '' : obj.end,
        'participantType': [{}],
        'actor': {
          'reference': obj.participant[1].actor === 'undefined' ? '' : obj.participant[1].actor,
          'display': 'TEST2'
        },
        'participantStatus': reponse,
        'comment': obj.comment === 'undefined' ? '' : obj.comment
      }

      var token =
        'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzZmVzZmVzZ2VzZXMiLCJmdWxsTmFtZSI6IlRlc3QxIiwiX2lkIjoiNTljYTcwM2MzODJjYmUwNjQwY2FmZGQ0IiwiaWF0IjoxNTA2NDM5MzQxfQ.ty46L_-y5FmItHu1I0Wv9TcBfciaLGu_9PdajKWUyas'
      axios
        .post(
          'http://62.210.38.108/fhir/core/api/appointmentresponse/create',
          resource,
          { headers: { Authorization: token } }
        )
        .then(response => {
          this.showSuccess = true
          this.dismissCountDownSuccess = this.dismissSecs
          Object.assign(this.$data, this.$options.data.call(this))
          this.updateAppointment(apt, reponse)
        })
        .catch(e => {
          this.dismissCountDownError = this.dismissSecs
          this.errors.push(e)
          alert('appointmentResponse n\'a pas pu être envoyé')
        })
    },
    updateAppointment (apt, reponse) {
      var obj = apt.item.content

      obj.status = (reponse === 'accepted' ? 'booked' : 'cancelled')

      var token =
        'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzZmVzZmVzZ2VzZXMiLCJmdWxsTmFtZSI6IlRlc3QxIiwiX2lkIjoiNTljYTcwM2MzODJjYmUwNjQwY2FmZGQ0IiwiaWF0IjoxNTA2NDM5MzQxfQ.ty46L_-y5FmItHu1I0Wv9TcBfciaLGu_9PdajKWUyas'
      axios
        .put(
          'http://62.210.38.108/fhir/core/api/appointment/update/' + obj._id,
          obj,
          { headers: { Authorization: token } }
        )
        .then(response => {
          this.showSuccess = true
          this.dismissCountDownSuccess = this.dismissSecs
          Object.assign(this.$data, this.$options.data.call(this))
          this.$root.$emit('bv::refresh::table', 'appointment-table')
        })
        .catch(e => {
          this.dismissCountDownError = this.dismissSecs
          this.errors.push(e)
          alert('appointment n\'a pas pu être mis à jour')
        })
    }
  }
}
</script>
