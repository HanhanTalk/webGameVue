import Vue from 'vue'
import Vuex from 'vuex'

//状态管理，Vuex配置
Vue.use(Vuex)

//声明一个状态state
const state = {
      //  domain:'http://127.0.0.1/' 保存后台请求地址，方便修改
         //保存用户信息
        userInfo:{
        uid:null,
        accout:null,
        password:null,
        nick:null,
        ulevel:null,
        gold:null,
        flower:null,
        portrait:null
        },
        //title
        title:null
    }
    //更新状态
const mutations = {
        //更新用户信息
        updateUserInfo(state,newUserInfo){
            state.userInfo = newUserInfo;
        },
        updateTitle(state,newTitle){
            state.title = newTitle;
        }
    }

//注册所有模块
export default new Vuex.Store({
    state,
    mutations
})


