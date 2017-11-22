<template>
  <div>
    <Modal v-if="mountModal" :show="show" :item="editingItem" :type="typeModal" :resource="resourceType" ></Modal>
    <ModalDelete v-if="deleteModal" :show="show" :deleteId="deleteId" :resource="resourceType"></ModalDelete>
    <CreatePractitioner v-if="addModal" :show="show"></CreatePractitioner>
    <div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion1 variant="light">AllergyIntolerance</b-btn>
      </b-card-header>
      <b-collapse id="accordion1" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <p> Liste resources AllergyIntolerance </p>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion2 variant="light" >Patient</b-btn>
      </b-card-header>
      <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
        <p> Liste resources Patient </p>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion3 variant="light">Practitioner</b-btn>
      </b-card-header>
      <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
        <TablePractitioners @clicked-show-item="clickedShowDetailModal" @clicked-add-item="clickedShowAddModal" />
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
  </div>
</template>

<script>
import TablePractitioners from '../tables/TablePractitioners'
import Modal from '../modal/Modal'
import ModalDelete from '../modal/ModalDelete'
import CreatePractitioner from '../create/CreatePractitioner'
export default {
  name: 'gridtest',
  components: {
    TablePractitioners,
    Modal,
    ModalDelete,
    CreatePractitioner
  },
  data () {
    return {
      editingItem: {},
      show: true,
      mountModal: false,
      typeModal: '',
      resourceType: '',
      deleteModal: false,
      deleteId: '',
      addModal: false
    }
  },
  methods: {
    clickedShowDetailModal: function (value) {
      if (value.typeModal !== 'delete') {
        this.mountModal = true
        this.editingItem = value.item.item
        this.typeModal = value.typeModal
      } else {
        this.deleteModal = true
        this.deleteId = value.item.item.content._id
      }
      this.resourceType = value.resourceType
    },
    clickedShowAddModal: function (value) {
      this.addModal = true
    }
  }
}
</script>
