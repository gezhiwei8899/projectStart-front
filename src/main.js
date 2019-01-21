// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {request} from './config/index'
import vueBeauty from 'vue-beauty'
import 'vue-beauty/package/style/vue-beauty.min.css'

Vue.config.productionTip = false;

Vue.use(vueBeauty);
window.requestPath = request.requestPath;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
