<template>
   <div class="game-view">
    <userinfo></userinfo>
    <banner></banner> 
    <carouselAd></carouselAd>
    <div class="game-list">
        <ul>
            <li class="bg-langren" @click="goWolfKill">
                <div class="caption font-white">
                    <h1>狼人杀</h1>
                    <p>开始游戏<span class="fa fa-angle-right"></span></p>
                </div>
            </li>
            <li class="bg-huahua">
                <div class="caption">
                    <h1>你画我猜</h1>
                    <p>开始游戏<span class="fa fa-angle-right"></span></p>
                </div>
            </li>
             <li class="bg-wodi">
                <div class="caption">
                    <h1>谁是卧底</h1>
                    <p>开始游戏<span class="fa fa-angle-right"></span></p>
                </div>
            </li>
            <li class="bg-shaizi">
                <div class="caption font-white">
                    <h1>骰子德州</h1>
                    <p>开始游戏<span class="fa fa-angle-right"></span></p>
                </div>
            </li>
            <li class="bg-killer">
                <div class="caption font-white">
                    <h1>杀人游戏</h1>
                    <p>开始游戏<span class="fa fa-angle-right"></span></p>
                </div>
            </li>
             <li class="bg-ox">
                <div class="caption">
                    <h1>骰子牛牛</h1>
                    <p>开始游戏<span class="fa fa-angle-right"></span></p>
                </div>
            </li>
             <li class="bg-nishuo">
                <div class="caption font-white">
                    <h1>你说我猜</h1>
                    <p>开始游戏<span class="fa fa-angle-right"></span></p>
                </div>
            </li>
             <li class="bg-she">
                <div class="caption font-white">
                    <h1>贪吃蛇大作战</h1>
                    <p>开始游戏<span class="fa fa-angle-right"></span></p>
                </div>
            </li>
            <li class="bg-date">
                <div class="caption font-white">
                    <h1>6分钟约会</h1>
                    <p>开始游戏<span class="fa fa-angle-right"></span></p>
                </div>
            </li>
        </ul>
    </div>
   </div>   
</template>
<style>
    body{
        overflow-y:scroll; 
    }
    .game-view{
        margin-top: 360px;
        margin-bottom:120px;
    }
    .caption{
        text-align: right;
        margin: 60px 40px 0 0;
    }
    .caption h1{
        font-size:46px;
    }
    .caption p{
        font-size: 30px;
        margin-right:0;
        animation:Shake 0.5s linear 0.5s infinite alternate;
        -moz-animation: Shake 0.5s linear 0.5s infinite alternate;
        -webkit-animation: Shake 0.5s linear 0.5s infinite alternate;
        -o-animation: Shake 0.5s linear 0.5s infinite alternate;
    }
    @keyframes Shake{
        50% {margin-right:3px;}
        100%{margin-right:0 }
    }
    /* Firefox */
    @-moz-keyframes Shake{
        50% {margin-right:3px;}
        100%{margin-right:0 }
    }
    /*Safari Chrome */
    @-webkit-keyframes Shake{
        50% {margin-right:3px;}
        100%{margin-right:0 }
    }
    /*Opera*/
    @-o-keyframes Shake{
        50% {margin-right:3px;}
        100%{margin-right:0 }
    }
    .bg-langren{
        background: url(../../assets/bg-img/langrensha.jpg) no-repeat;
        background-size:250px;
        background-color:rgba(31,28,45,1);
        background-position: 20px;
    }
    .bg-huahua{
        background: url(../../assets/bg-img/nihuawocai.jpeg) no-repeat;
        background-size:auto 250px;
        background-color:rgba(255,255,255,1);
    }
    .bg-wodi{
        background: url(../../assets/bg-img/wodi.jpeg) no-repeat;
        background-size:auto 250px;
        background-color:rgba(248,115,117,1);
    }
    .bg-shaizi{
        background: url(../../assets/bg-img/shaizi.png) no-repeat;
        background-size:auto 250px;
        background-color:rgba(23,0,36,1);
    }
    .bg-nishuo{
        background: url(../../assets/bg-img/nishuowocai.jpeg) no-repeat;
        background-size:auto 250px;
        background-color:rgba(211,226,132,1);
    }
    .bg-ox{
        background: url(../../assets/bg-img/ox.jpeg) no-repeat;
        background-size:auto 250px;
        background-color:rgba(224,227,205,1);
    }
     .bg-killer{
        background: url(../../assets/bg-img/killer.jpeg) no-repeat;
        background-size:auto 250px;
        background-color:rgba(238,6,87,1);
        background-position: 20px;
    }
     .bg-she{
        background: url(../../assets/bg-img/she.jpeg) no-repeat;
        background-size:auto 250px;
        background-color:rgba(194,204,173,1);
    }
    .bg-date{
        background: url(../../assets/bg-img/date.jpeg) no-repeat;
        background-size:auto 250px;
        background-color:rgba(9,78,103,1);
    }
    .game-list li{
        height: 250px;
        width:100%;
        margin:4px 0;
    }
    .game-list a{
        color:#ffffff;
        text-decoration: none;
    }
    .game-list span{
        margin-left:8px;
    }
    .font-black{
        color: #000000;
    }
    .font-white{
        color:#ffffff;
    }
</style>
 <script type='text/ecmascript6'>
    import banner from './banner.vue'
    import carouselAd from './carousel.vue'
    import userinfo from './userinfo.vue'

    export default{
        name:'game',
        components:{
            carouselAd,
            banner,
            userinfo
        },
        data(){
            return{
                title:'Game'
            }
        },
        methods:{
            goWolfKill(){
                this.$router.push('/gowolf');
            },
            setTitle(){
                this.$store.commit('updateTitle',this.title);
            }
        },
        mounted(){
            this.setTitle();
        }
        
    }
 </script>