import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import { DateTime } from 'luxon'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.prototype.$luxon = DateTime
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
