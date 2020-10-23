import Vue from 'vue'
import axios from 'axios'
import api from './base.js'
import router from '../router/index.js'
import store from '../store/index.js'
//获取cookie里的值
let that = Vue.prototype

//获取cookeie
function getCookie3(name) {    //可以搜索RegExp和match进行学习
       
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");   
    if (arr = document.cookie.match(reg)) {       return unescape(arr[2]);    } else {       return null;    }
}

//删除cookie
function delCookie(c_name) {
    setCookie(c_name, "", -1)
}

export default {
    //设置cookies
    setCookie(c_name, value, expire) {
        var date = new Date()
        date.setSeconds(date.getSeconds() + expire)
        document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toGMTString()
            //console.log(document.cookie)
    },
    Get(prop, data = {}) {
        let formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key])
        })

        return new Promise((resolve, reject) => {
            axios.get(api[prop], formData).then(response => {
                resolve(response);
            }).catch(err => {
                reject(err);
            })
        })
    },

    //post 方法

    Post(prop, data = {}) {
        if (prop == 'submit_withdraw' || prop == 'login' || prop == 'register' || prop == 'publish' || prop == 'pay_setmeal') {
            store.state.LOADING = true
        }

        let formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key])

        });
        getCookie3('openid') && formData.append('openid', getCookie3('openid'))
        return new Promise((resolve, reject) => {
            axios.post(api[prop], formData).then(response => {
                if (response.data.status == 2) {
                    delCookie('openid')
                    that.$toast(response.data.result.message)
                    router.replace({ path: '/' });
                    return
                }
                if (response.data.status == 3) {
                    localStorage.removeItem('webopenid');
                    that.$toast(response.data.result.message)
                    router.replace({ name: 'weblogin' });
                    return
                }
                resolve(response.data);

                setTimeout(() => {
                    store.state.LOADING = false
                }, 400)

            }).catch(err => {
                reject(err);
            })
        })
    },
}