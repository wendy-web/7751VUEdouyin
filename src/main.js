import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Toast } from 'vant'
import api from './api/index.js'
import { setCookie, getCookie, delCookie } from './assets/js/cookie.js'
import VueCookies from 'vue-cookies'

import 'lib-flexible'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/public.css'
import 'vant/lib/index.css'
import animated from 'animate.css'
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.use(VueCookies)
Vue.prototype.$cookieStore = { setCookie, getCookie, delCookie }
    // 引用复制的插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// 引用方位滑动层的插件
import { Popup } from 'vant';
Vue.use(Popup);

// 引用轮播图
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);


import 'swiper/swiper-bundle.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

// 引用信用指标
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/gauge'
Vue.component('chart', ECharts)

// 导入vant的组件
Vue.use(Vant);
Vue.use(ElementUI);
Vue.use(animated);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

var isMobile = /^1[3|4|5|6|7|8][0-9]{9}$/;
Vue.prototype.$isMobile = isMobile;

//获取cookie里的值
function getCookie3(name) {    //可以搜索RegExp和match进行学习
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");   
    if (arr = document.cookie.match(reg)) {      
        return unescape(arr[2]);
    } else {
        return null;  
    }
}
let islogin = getCookie3('openid') || false;
// console.log(islogin)
//  if(islogin==false){
//    router.replace({name:'login'})
//  }
// 重定向 配置未登陆的时候跳转登陆页面
router.beforeEach((to, from, next) => {
    islogin = getCookie3('openid') || false;
    if (to.meta.islg) {
        if (islogin == false) {
            Toast('请重新登录!')
            next('/')
        } else {
            next()
        }
    } else {
        next()
    }

})