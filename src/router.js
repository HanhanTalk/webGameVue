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
import chat from './components/friends/chat.vue'
import chatRoom from './components/friends/chatRoom.vue'
import createChat from './components/friends/createChat.vue'
import friendAdd from './components/friends/friendAdd.vue'
import myFriend from './components/friends/myFriend.vue'
import waitRoom from './components/waitRoom.vue'
import wolfRoom from './components/wolfRoom.vue'

Vue.use(VueRouter)
//路由配置
//如果需要添加页面，就在这里添加路由
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
            component:friend,
            children:[
                {path:'chat',name:'chat',component:chat},
                {path:'createChat',name:'createChat',component:createChat},
                {path:'myFriend',name:'myFriend',component:myFriend},
                {path:'friendAdd',name:'friendAdd',component:friendAdd}
            ]
        },
        {
            path:'/chatRoom',
            name:'chatRoom',
            component:chatRoom
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
        },
        {
            path:'/waitRoom',
            name:'waitRoom',
            component:waitRoom
        },
        {
            path:'/wolfRoom',
            name:'wolfRoom',
            component:wolfRoom
        }
    ]
})

export default router;