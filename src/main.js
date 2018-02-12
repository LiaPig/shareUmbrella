// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import store from './store'
import axios from 'axios'
import util from './common/js/util'

import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor);
Vue.use(ElementUI);
// Vue.use(Vuex)
Vue.use(store);


Vue.config.productionTip = false;
// 更改原型(加入到原型属性中)
Vue.prototype.$http = axios;
Vue.prototype.baseJs = util;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
