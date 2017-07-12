import Vue from 'vue'
import VueRouter from 'vue-router'
import index from './components/index.vue'
import login from './components/login.vue'
import reg from './components/reg.vue'
import home from './components/home.vue'


Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path:'/',
            name:'index',
            component:index
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
        }
    ]
})

export default router;