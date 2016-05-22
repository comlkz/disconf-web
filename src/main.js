import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { configRouter } from './route-config.js'

import { directive } from './directive.js'
var VueValidator = require('vue-validator')
Vue.use(VueValidator)
Vue.use(VueRouter);//通过全局方法use使用vue-router插件

Vue.validator('url', function (val) {
  return /^(http\:\/\/|https\:\/\/)(.{4,})$/.test(val)
})

Vue.filter('date', function (value,format) {

  return moment(new Date(value)).format(format)
})

directive(Vue)

var router = new VueRouter()
configRouter(router)
router.start(App, '#app')