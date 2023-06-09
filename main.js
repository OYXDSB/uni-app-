import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

import axios from 'axios'
Vue.prototype.$http1 = axios

// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'
 uni.$http = $http
 
 //2、在main.js中导入vue-jsonp
 import {VueJsonp} from 'vue-jsonp'
 Vue.use(VueJsonp);
 
// 请求拦截器
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...'
  })
}
 
// 响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);
import store from '@/store';

const app = new Vue({
	store,
    ...App
})

// 接口请求挂载
import httpInterceptor from '@/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

// 自定义工具
import utils from "@/common/utils.js"
Vue.use(utils,app)

app.$mount()
