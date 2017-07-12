import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

//Vuex配置
const store = new Vuex.Store({
    state:{
         //保存用户信息
        userInfo:{

        uid:null,
        accout:null,
        password:null,
        nick:null,
        ulevel:null,
        gold:null,
        portrait:null

        }
    },
    mutations:{
        updateUserInfo(state,newUserInfo){
            state.userInfo = newUserInfo;
        }
    }
})

export default store

