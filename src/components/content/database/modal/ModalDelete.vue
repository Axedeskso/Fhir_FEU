<template>
  <div id="fadeDelete" class='delete-modal panel fade-delete' title="Suppresion" v-show="showLocal">
    <div class='delete-modal-content'>
      <p> {{ resource }} {{ deleteId }} </p>
      <p class="my-4">Êtes-vous sur de vouloir supprimer cette ressource ?</p>
      <div class='footer-modal'>
        <a class="btn btn-xs btn-success white-link" href="#home" @click="confirmDelete(deleteId)">Confirmer</a>
        <a href="#home"  class="btn btn-xs btn-default">Annuler</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
function initialState (show, resource, deleteId) {
  return {
    showLocal: show,
    resourceLocal: resource,
    idLocal: deleteId
  }
}
export default {
  props: ['type', 'show', 'resource', 'deleteId'],
  data: function () {
    return initialState(this.show, this.resource, this.deleteId)
  },
  methods: {
    confirmDelete (evt) {
      console.log('DELETE')
      var res = this.resource.toLowerCase()
      console.log(this.idLocal)
      var token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzZmVzZmVzZ2VzZXMiLCJmdWxsTmFtZSI6IlRlc3QxIiwiX2lkIjoiNTljYTcwM2MzODJjYmUwNjQwY2FmZGQ0IiwiaWF0IjoxNTA2NDM5MzQxfQ.ty46L_-y5FmItHu1I0Wv9TcBfciaLGu_9PdajKWUyas'
      axios.delete('http://62.210.38.108/fhir/core/api/' + res + '/destroy/' + this.deleteId, {headers: { 'Authorization': token }}).then(response => {
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
