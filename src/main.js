// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import 'vue-awesome/icons'
import icon from 'vue-awesome/components/Icon.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import App from './App'
import Main from './components/Main'
import Header from './components/header/Header'
import LateralMenu from './components/lateralmenu/LateralMenu'
import Database from './components/content/database/Database'
import Legal from './components/content/legal/Legal'
import GridTest from './components/content/database/grid/GridTest'
import Vuetify from 'vuetify'

Vue.use(BootstrapVue)
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('Main', Main)
Vue.component('Header', Header)
Vue.component('LateralMenu', LateralMenu)
Vue.component('Database', Database)
Vue.component('Legal', Legal)
Vue.component('icon', icon)
Vue.component('GridTest', GridTest)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
new Vue({
  router,
  template: '<Main/>'
})
new Vue({
  template: '<Header/>'
})
new Vue({
  template: '<LateralMenu/>',
  data: {
    reveal: true,
    show: true
  }
})
new Vue({
  template: '<Database/>'
})
new Vue({
  template: '<Legal/>'
})

new Vue({
  template: '<GridTest/>'
})

new Vue({
  template: '<Container />'
})
