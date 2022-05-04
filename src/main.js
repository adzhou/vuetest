import Vue from 'vue'
import App from './App'
import Cookies from 'js-cookie'

import store from './vuex'

import router from './router'


import iView from 'iview';

import 'iview/dist/styles/iview.css'

import ElementUI from 'element-ui'

// import './permission' // permission control
import './utils/error-log' // error log
import './icons' // icon

import 'element-ui/lib/theme-chalk/index.css'

import './assets/css/reset.css'

import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
//总是过不了，估计要升级到vue3再尝试
// import { OhVueIcon } from "oh-vue-icons";
// Vue.component("v-icon", OhVueIcon);

import * as filters from './filters' // global filters
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
 if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}


Vue.config.productionTip = false
// Vue.use(ElementUI)

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

import VueDND from 'awe-dnd'
Vue.use(VueDND)





// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.use(iView)


// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})