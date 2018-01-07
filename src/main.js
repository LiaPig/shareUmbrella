// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
// import Vuex from 'vuex'
import store from './store'

import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor);
Vue.use(ElementUI);
// Vue.use(Vuex)
Vue.use(store);



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
