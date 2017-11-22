<template>
  <div>
    <div class="my-1 row">
      <div class="col-md-6">
        <b-form-group horizontal label="Filter" :label-cols="3">
          <b-form-input v-model="filter" placeholder="Type to Search" />
        </b-form-group>
      </div>
    </div>

    <div class="row my-1">
      <div class="col-sm-8">
        <b-pagination  class="pag-tab" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" />
      </div>
      <div class="col-sm-4 text-md-right">
        <b-button :disabled="!sortBy" @click="sortBy = null">Clear Sort</b-button>
      </div>
    </div>
    <b-table id='practitioner-table' small fixed bordered striped hover show-empty
             :no-provider-paging="true"
             :no-provider-sorting="false"
             :no-provider-filtering="true"
             :busy.sync="isBusy"
             :items="practitioner"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             @filtered="onFiltered"
    >
      <template slot="name" slot-scope="row">{{row.item.content.name[0].given[0]}} {{row.item.content.name[0].family[0]}}</template>
      <template slot="given" slot-scope="row">{{row.item.content.name[0].given[0]}}</template>
      <template slot="family" slot-scope="row">{{row.item.content.name[0].family[0]}}</template>
      <template slot="prefix" slot-scope="row">{{row.item.content.name[0].prefix[0]}}</template>
      <template slot="gender" slot-scope="row">{{row.item.content.gender}}</template>
      <template slot="actions" slot-scope="row">

        <a class="btn btn-xs btn-success" href="#fade" data-hover="Fade" @click="clickItem(row, 'show', 'Practitioner')"><span class="glyphicon glyphicon-search white"></span></a>
        <a class="btn btn-xs btn-primary" href="#fade" data-hover="Fade" @click="clickItem(row, 'edit', 'Practitioner')"><span class="glyphicon glyphicon-pencil white"></span></a>
        <a class="btn btn-xs btn-danger" href="#fadeDelete" data-hover="FadeDelete" @click="clickItem(row, 'delete', 'Practitioner')"><span class="glyphicon glyphicon-trash white"></span></a>
      </template>
    </b-table>

    <p>
      Sort By: {{ sortBy || 'n/a' }}, Direction: {{ sortDesc ? 'descending' : 'ascending' }}
    </p>
    <a class="btn btn-xs btn-success white-link" href="#fadeCreatePractitioner" data-hover="FadeCreatePractitioner" @click="addItem()"><span class="glyphicon glyphicon-plus"></span></a>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'table-practitioners',
  data () {
    return {
      items: [],
      fields: {
        name: {
          label: 'Nom Complet',
          'class': 'text-center'
        },
        given: {
          label: 'Prénom',
          key: 'given',
          sortable: true,
          'class': 'text-center'
        },
        family: {
          label: 'Nom',
          key: 'family',
          sortable: true,
          'class': 'text-center'
        },
        prefix: {
          label: 'Préfixe',
          key: 'prefix',
          sortable: true,
          'class': 'text-center'
        },
        gender: {
          label: 'Sexe',
          key: 'gender',
          sortable: true,
          'class': 'text-center'
        },
        actions: {
          label: ''
        }
      },
      currentPage: 1,
      perPage: 5,
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
    practitioner (ctx) {
      this.isBusy = true
      var token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzZmVzZmVzZ2VzZXMiLCJmdWxsTmFtZSI6IlRlc3QxIiwiX2lkIjoiNTljYTcwM2MzODJjYmUwNjQwY2FmZGQ0IiwiaWF0IjoxNTA2NDM5MzQxfQ.ty46L_-y5FmItHu1I0Wv9TcBfciaLGu_9PdajKWUyas'
      let promise = axios.get('http://62.210.38.108/fhir/core/api/practitioner/', {headers: { 'Authorization': token }})

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
    }
  }
}
</script>
