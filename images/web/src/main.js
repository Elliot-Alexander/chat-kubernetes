import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SmoothVuebar from 'smooth-vuebar'
import VueSocketIO from "vue-socket.io"
import SocketIO from 'socket.io-client'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(SmoothVuebar)

let address = window.location.host + ":4000"

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO(address)
}))
library.add(fas, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)
