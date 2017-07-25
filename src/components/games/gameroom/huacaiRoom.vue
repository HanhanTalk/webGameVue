<template>
    <div class="game-page">
        <!-- <h1 class="txt">{{$route.params.id}}</h1> -->
        <div id="gameCanvas" class="canvas-ex"></div>
        <div class="canvas-ctrl">
            <div class="canvas-ctrl-first">
                <ul>
                    <li v-for="n in 5" :key="n.id">
                         <span class="fa fa-circle"></span>
                    </li>
                </ul>
                <!-- <ul>
                    <li v-for="n in 6" :key="n.id">
                       
                    </li>
                </ul> -->
            </div>
            <div class="canvas-ctrl-last">
                <div class="float-left">
                    <ul>
                        <li><img class="col-btn img-circle" src="../../../assets/sepan.jpeg"></li>
                        <li><span class="fa fa-paint-brush"></span></li>
                    </ul>
                </div>
                <div class="float-right">
                    <ul>
                        <li><span class="fa fa-mail-reply"></span></li>
                        <li><span class="fa fa-mail-forward"></span></li>
                        <li><span class="fa fa-trash"></span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="player-list-six">
            <ul>
                <li v-for="item in userlist" :key="item.id">
                    <img class="img-circle" :src="item.portrait">
                    <span class="player-score">
                        {{item.score}}
                    </span>
                    <span class="fa fa-pencil current-mask img-circle"></span>
                    <!-- <span class="bingo-mask">
                        
                    </span> -->
                    <img class="bingo-mask" src="../../../assets/bingo_meitu_1.png">
                </li>
            </ul>
            <div class="answer-mask"></div>
        </div>
        <textInput></textInput>
    </div>
</template>
<script type="text/ecmascript6">
import textInput  from '../../public/input.vue'
export default {
    name:'huacai',
    components:{ textInput },
    data(){
        return{
            userlist:[
                {
                    uid:1,
                    portrait:'./src/assets/userpic/user-01.jpg',
                    score:0
                },
                {
                    uid:2,
                    portrait:'./src/assets/userpic/user-02.jpg',
                    score:0
                },
                {
                    uid:3,
                    portrait:'./src/assets/userpic/user-03.jpg',
                    score:0
                },
                {
                    uid:4,
                    portrait:'./src/assets/userpic/user-04.jpg',
                    score:0
                },
                {
                    uid:5,
                    portrait:'./src/assets/userpic/user-05.jpg',
                    score:0
                },
                {
                    uid:6,
                    portrait:'./src/assets/userpic/user-06.jpg',
                    score:0
                }
            ]
        }
    }
}
</script>
<style>
    .game-page{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 120px;
        background: #ffffff;
    }
    .canvas-ex{
        height: 750px;
    }
    .canvas-ctrl{

    }
    .col-btn{
        width:50px;
        height:50px;
        margin:25px 0;
    }
    .size-btn{
        width:4px;
        height:4px;
        border:none;
        background:#000000;
        
    }
    .canvas-ctrl-first li{
        margin:0 45px;
    }
    .canvas-ctrl-last,.canvas-ctrl-first{
        height: 100px;
        padding: 0 40px;
        font-size:40px;
        background:#dddddd;
        line-height: 100px;
    }
    .canvas-ctrl-last li{
        margin:0 20px;
        height:100px;
        display: block;
        float: left;
    }

    .player-list-six{
        background:#dddddd;
        border-top:1px solid #b6b6b6;
    }
    .player-list-six ul{
        width:660px;
        padding:20px 0 40px 0;
        margin: 0 auto;
    }
    .player-list-six li{
        height: 120px;
        text-align: center;
        width: 100px;
        margin:5px;
        position: relative;
    }
    .player-list-six li img{
        width:100px;
        height:100px;
    }
    .img-circle{
        border-radius: 50%;
    }
    .player-score{
        font-size:28px;
    }
    .current-mask{
        width:40px;
        height:40px;
        line-height: 40px;
        text-align: center;
        background:#ff9800;
        color:#ffffff;
        font-size:30px;
        position: absolute;
        top:0;
        right:4px;
    }
    .bingo-mask{
        width:100px !important;
        height:70px !important;
        opacity: 0.8;
        position: absolute;
        left: 0;
        bottom:10px;
    }
    .answer-mask{
        
    }
    .float-left{
        float:left;
    }
    .float-right{
        float:right;
    }

</style>

