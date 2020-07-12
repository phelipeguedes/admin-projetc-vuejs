import Vue from 'vue'
import App from './App.vue'
import store from './config/store'
import router from './config/router'
import './config/bootstrap'
import titleMixin from './config/title-mixin'

Vue.config.productionTip = false

Vue.use(titleMixin)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
