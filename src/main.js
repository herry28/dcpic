import Vue from 'vue'
import App from './App'

import request from "./utils/request"

Vue.config.productionTip = false

//将请求方法挂载到原型上
Vue.prototype.request=request

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
