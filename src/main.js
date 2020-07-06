import '@babel/polyfill'

import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
//
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 数据字典
import dict from './components/Dict'

// 表单对象分隔符
import FormSubLabel from './components/FormSubLabel'

// 页面引擎
import showforms from './components/ElFormDesign/ShowForms'

// 权限指令
import permission from './components/Permission'
import './assets/styles/element-variables.scss'
// global css
import './assets/styles/index.scss'

// 代码高亮-暂不兼容IE
// import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'

// CSS3动画库
import 'vue2-animate/dist/vue2-animate.min.css'

import App from './App'
import store from './store'
import router from './router/routers'

import './assets/icons' // icon
import './router/index' // permission control
import 'echarts-gl'
import * as _ from 'lodash'
import moment from 'moment'

Vue.prototype.$moment = moment
Vue.prototype._ = _

// Mock
import Mock from '@/mock'

// Vue.use(VueHighlightJS)
Vue.use(mavonEditor)
Vue.use(permission)
Vue.use(dict)
Vue.use(Mock)
Vue.use(Element, {
  size: Cookies.get('size') || 'mini' // set element-ui default size
})

Vue.component('FormSubLabel', FormSubLabel)
Vue.component('showforms', showforms)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
