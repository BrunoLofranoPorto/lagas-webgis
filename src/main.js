import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
import './plugins/axios'

// utils
import get from 'lodash/get'
import has from 'lodash/has'
import set from 'lodash/set'
import forEach from 'lodash/forEach'

import '@curupira/grid-system/dist/main.css'

import VueMapbox from '@curupira/vue-mapbox'
Vue.config.MapBoxAccessToken = 'pk.eyJ1IjoiZmVsaXh4eGd1aWxoZXJtZSIsImEiOiJjazh0ZWk3bTIwNXEzM2dsMnB1OTVnNWZiIn0.8L6VugkL_G8wVdRNzuEskg'
Vue.use(VueMapbox)


console.log(process.env.VUE_APP_MAPBOXKEY);

Vue.config.productionTip = false

// AUTOMATIC LOAD ALL COMPONENTS.
// TODO - only temporary, create a async or manual method in the end
function requireAllComponents (requireContext) {
  var keys = requireContext.keys()
  forEach(keys, k => {
    var modulo = requireContext(k)
    var nome = k.match(/([^/]*).vue$/)
    Vue.component(nome[1], modulo.default || modulo)
  })
}
requireAllComponents(require.context('./components', true, /[A-Za-z]\w+\.(vue|js)$/))

// SETUP COMPONENT INSTANCES GLOBALS
Vue.use(function (Vue) {
  Vue.prototype.$has = has
  Vue.prototype.$get = get
  Vue.prototype.$set = set
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')