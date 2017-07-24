import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'font-awesome-webpack'
import VueTouch from 'vue-touch'
import api from './api/api'
//设置cookie,增加到vue实例方便全局调用

// Vue.prototype.setCookie = (c_name,value,expiredays) => {
//     var exdate = new Date();
//     exdate.setDate(exdate.getDate() + expiredays);
//     document.cookie = c_name + "=" + escape(value) + ((expiredays == null)?"":";expires=" + exdate.toUTCString());

// }
// //获取cookie
// function getCookie(name){
//     var arr ,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//     if(arr = document.cookie.match(reg))
//         return (arr[2]);
//      else
//         return null;
//     }
// Vue.prototype.getCookie = getCookie;
// //删除cookie
// Vue.prototype.delCookie = (name) =>{
//     var exp = new Date();
//     exp.setTime(exp.getTime() - 1);
//     var cval = getCookie(name);
//     if(cval != null)
//         document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
// }
//创建一个Vue实例
var app = new Vue({
    template: '<App/>',
    router,
    store,
    components: { App },
    //监听路由检查登录
    watch:{
        "$route":'checkLogin'
    },
    //进入页面时
    mounted(){
        this.checkLogin();
    },
    methods:{
        checkLogin(){
            //检查是否存在session
            api.info().then((response) => {
                if(!response){
                    if(window.location.hash !== '#/login'){
                        this.$router.push('/');
                    }
                } else{
                    this.getUserInfo(response);
                }
            })

        //     if(!this.getCookie('session')){
        //         this.$router.push('/login');
        //     } else{
        //         this.$router.push('/home');
        //     }
         },
          getUserInfo(element){
                var currentUser = element;
                this.$store.commit('updateUserInfo',currentUser);
            
            },
        }
})
// Vue.use(VueTouch,{name:'v-touch'});
app.$mount('#app');