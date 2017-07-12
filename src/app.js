import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'font-awesome-webpack'

var app = new Vue({
    template: '<App/>',
    router,
    store,
    components: { App },
    methods:{
        checkLogin(){
            //检查是否存在session
        }
    }
})
app.$mount('#app');