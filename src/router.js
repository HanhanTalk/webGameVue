import Vue from 'vue'
import VueRouter from 'vue-router'
import landing from './components/landing.vue'
import login from './components/login.vue'
import reg from './components/reg.vue'
import home from './components/home.vue'
import gowolf from './components/goWolfKill.vue'
import gameinfo from './components/gameinfo.vue'
import friend from './components/friend.vue'
import find from './components/find.vue'
import self from './components/self.vue'
import rank from './components/rank.vue'
Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path:'/',
            name:'landing',
            component:landing
        },
        {
            path:'/login',
            name:'login',
            component:login
        },
        {
            path:'/reg',
            name:'reg',
            component:reg
        },
        {
            path:'/home',
            name:'home',
            component:home
        },
        {
            path:'/friend',
            name:'friend',
            component:friend
        },
         {
            path:'/find',
            name:'find',
            component:find
        },
         {
            path:'/self',
            name:'self',
            component:self
        },
         {
            path:'/rank',
            name:'rank',
            component:rank
        },
        {
            path:'/gowolf',
            name:'gowolf',
            component:gowolf
            // children:[
            //     {path:'gameinfo', name: 'gameinfo', component:gameinfo}
            // ]
        },
        {
            path:'/gowolf/gameinfo',
            name:'gameinfo',
            component:gameinfo
        }
    ]
})

export default router;