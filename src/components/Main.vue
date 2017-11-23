<template>
  <div id="main">
  <!--<b-container fluid>-->

    <Header/>
    <router-view/>
    <LateralMenu/>
<!--</b-container>-->
  </div>
</template>

<script>
  import VueRouter from 'vue-router'
  import Home from '../components/content/home/Home'
  import Database from '../components/content/database/Database'
  import AddUser from '../components/content/adduser/AddUser'
  import Appointment from '../components/content/appointment/Appointment'
  import Update from '../components/content/update/Update'
  import Archive from '../components/content/archive/Archive'
  import Statistics from '../components/content/statistics/Statistics'
  import Legal from '../components/content/legal/Legal'

  const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/base',
      name: 'Database',
      component: Database
    },
    {
      path: '/ajout-utilisateur',
      name: 'AddUser',
      component: AddUser
    },
    {
      path: '/rendez-vous',
      name: 'Appointment',
      component: Appointment
    },
    {
      path: '/mise-a-jour',
      name: 'Update',
      component: Update
    },
    {
      path: '/archive',
      name: 'Archive',
      component: Archive
    },
    {
      path: '/statistiques',
      name: 'Statistics',
      component: Statistics
    },
    {
      path: '/legal',
      name: 'Legal',
      component: Legal
    }
  ]

  const router = new VueRouter({routes})
  export default {
    name: 'app',
    router,
    components: { Home, Database, AddUser, Appointment, Update, Archive, Statistics, Legal }
  }
</script>
