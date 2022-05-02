import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css'
import './assets/css/reset.css'

//总是过不了，估计要升级到vue3再尝试
// import { OhVueIcon } from "oh-vue-icons";
// Vue.component("v-icon", OhVueIcon);

Vue.config.productionTip = false
Vue.use(ElementUI)

import VueDND from 'awe-dnd'
Vue.use(VueDND)

import store from './vuex'

import iView from 'iview';



Vue.config.productionTip = false
Vue.use(iView)


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

