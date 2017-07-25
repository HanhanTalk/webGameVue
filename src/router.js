import Vue from 'vue'
import VueRouter from 'vue-router'
import landing from './components/landing.vue'
import login from './components/login.vue'
import reg from './components/reg.vue'
import home from './components/home.vue'
import gowolf from './components/games/wolfkill/goWolfKill.vue'
import gameinfo from './components/games/wolfkill/gameinfo.vue'
import friend from './components/friends/friend.vue'
import find from './components/find/find.vue'
import self from './components/self/self.vue'
import rank from './components/rank/rank.vue'
import chat from './components/friends/chat.vue'
import chatRoom from './components/friends/chatRoom.vue'
import createChat from './components/friends/createChat.vue'
import friendAdd from './components/friends/friendAdd.vue'
import myFriend from './components/friends/myFriend.vue'
import waitRoom from './components/games/gameroom/waitRoom.vue'
import wolfRoom from './components/games/gameroom/wolfRoom.vue'
import game from './components/games/game.vue'
import huacaiRoom from './components/games/gameroom/huacaiRoom.vue'
import gameroom from './components/games/gameroom/gameroom.vue'
import test from './components/games/gameroom/test.vue'
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
            component:home,
            children:[
                {path:'game',name:'game',component:game},
                {path:'find',name:'find',component:find},
                {path:'self',name:'self',component:self},
                {path:'rank',name:'rank',component:rank},
                {path:'friend',name:'friend',component:friend,
                children:[
                    {path:'chat',name:'chat',component:chat},
                    {path:'createChat',name:'createChat',component:createChat},
                    {path:'myFriend',name:'myFriend',component:myFriend},
                    {path:'friendAdd',name:'friendAdd',component:friendAdd},
                    {path:'chatRoom',name:'chatroom',component:chatRoom}
                ]
            }
            ]
        },
        {   
            path:'/gameroom',
            name:'gameroom',
            component:gameroom,
            children:[
                {path:'test/:id',name:'test',component:test},
                {path:'waitRoom/:id',name:'waitRoom',component:waitRoom},
                {path:'huacaiRoom/:id',name:'huacaiRoom',component:huacaiRoom},
                {path:'wolfRoom/:id',name:'wolfRoom',component:wolfRoom}
            ]
        },
        {
            path:'/chatRoom',
            name:'chatRoom',
            component:chatRoom
        },
        {
            path:'/gowolf',
            name:'gowolf',
            component:gowolf
        },
        {
            path:'/gowolf/gameinfo',
            name:'gameinfo',
            component:gameinfo
        }
    ]
})

export default router;