<template>
	 <b-modal v-on:details='showDetails($event.target)' id="modalpatient" @hide="resetModal" ok-only>
      <h4 class="my-1 py-1" slot="modal-header">Détails du patient: {{ modalDetails.data.content._id }}</h4>
      <b-row>
      <b-col>Nom : {{modalDetails.data.content.name[0].family[0]}}</b-col>
      <b-col>Prénom : {{modalDetails.data.content.name[0].given[0]}}</b-col>
      </b-row>
      <b-row>
      <b-col>Date de naissance : {{modalDetails.data.content.birthDate}}</b-col>
      <b-col>Prénom : {{modalDetails.data.content.name[0].given[0]}}</b-col>
      </b-row>
      <pre>{{ modalDetails.data.content._id }}</pre>
    </b-modal>
</template>

<script>
export default {
  name: 'details-patient',
  props: ['item'],
  data () {
    return {
    }
  },
  methods: {
    resetModal () {
      this.modalDetails.data = ''
      this.modalDetails.index = ''
    },
    showDetails (button) {
      this.$root.$emit('bv::show::modal', 'modalpatient', button)
    }
  }
}
</script>