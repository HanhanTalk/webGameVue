<template>
    <div class="game-page">
        <div class="game-tips">
            <div class="tips-triangle"></div>
            <div class="text-margin game-tips-text">
                <div v-if="currentUser.painer"><p>提示:{{Answer.content}}<span class="tips-timer">12</span></p></div>
                <div v-if="!currentUser.painer"><p>提示：{{Answer.word}}<span class="tips-timer">12</span></p></div>
            </div>
            <button @click="painerEnd" type="button" value="结束" class="position-right game-tips-text">结束</button>
        </div>
         <gameCanvas id="gameCanvas" class="canvas-ex" :paintSize="paint_Size" :paintCol="paint_Col" ref="myCanvas">
        </gameCanvas> 
        <div class="canvas-mask"  v-if="!currentUser.painer">
        </div>
        <div class="canvas-ctrl" v-if="currentUser.painer">
            <div class="canvas-ctrl-first" v-if="chooseShow">
                <ul v-if="!color">
                    <li @click="choosePot(n)" v-for="(n,index) in 5" :key="n.id">
                         <span class="fa fa-circle" :class="'size_'+index"></span>
                    </li>
                </ul>
                <ul v-if="color">
                    <li @click="chooseCol(n)" v-for="(n,index) in 6" :key="n.id">
                       <span :class="'col_'+index" class="fa fa-stop"></span>
                    </li>
                </ul>
            </div>
            <div class="canvas-ctrl-last">
                <div class="float-left">
                    <ul>
                        <li @click="colClick"><img class="col-btn img-circle" src="../../../assets/sepan.jpeg"></li>
                        <li @click="paintClick"><span class="fa fa-circle vertical-middle" :class="[paintSize,paintCol]"></span></li>
                    </ul>
                </div>
                <div class="float-right">
                    <ul>
                        <li @click="replyClick"><span class="fa fa-mail-reply" :class="{'de-active':deactive_1}"></span></li>
                        <li @click="forwardClick"><span class="fa fa-mail-forward" :class="{'de-active':deactive_2}"></span></li>
                        <li @click="trash"><span class="fa fa-trash"></span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="player-list-six">
            <ul>
                <li v-for="(item,index) in userlist" :key="item.id">
                    <img class="img-circle" :src="item.portrait">
                    <span class="player-score">
                        {{item.score}}
                    </span>
                    <span class="fa img-circle fa-pencil current-mask" v-if="index == currentId"></span>
                    <img class="bingo-mask  animated jackInTheBox" src="../../../assets/bingo_meitu_1.png" v-if="item.bingo">
                     <div class="add-score-mask" v-if="item.addscore">
                         <span>+15分</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="game-sys-info">
            <h1>{{sysInfo.title}}</h1>
            <p>{{sysInfo.content}}</p>
            <span class="txt">{{sysInfo.time}}S</span>
        </div>
        <textInput @answerEvent = "receiveInfo"></textInput>
    </div>
</template>
<script type="text/ecmascript6">
import textInput  from '../../public/input.vue'
import gameCanvas from '../../public/canvas.vue'
import animate from '../../../style/animate.css'
export default {
    name:'huacai',
    components:{ textInput,gameCanvas },
    data(){
        return{
            userlist:[
                {
                    uid:1,
                    portrait:'./src/assets/userpic/user-01.jpg',
                    score:0,
                    painer:true,
                    inputText:'',
                    bingo:false,
                    addscore:false,
                },
                {
                    uid:2,
                    portrait:'./src/assets/userpic/user-02.jpg',
                    score:0,
                    painer:false,
                    inputText:'',
                    bingo:false,
                    addscore:false,
                },
                {
                    uid:3,
                    portrait:'./src/assets/userpic/user-03.jpg',
                    score:0,
                    painer:false,
                    inputText:'',
                    bingo:false,
                    addscore:false,
                },
                {
                    uid:4,
                    portrait:'./src/assets/userpic/user-04.jpg',
                    score:0,
                    painer:false,
                    inputText:'',
                    bingo:false,
                    addscore:false,
                },
                {
                    uid:5,
                    portrait:'./src/assets/userpic/user-05.jpg',
                    score:0,
                    painer:false,
                    inputText:'',
                    bingo:false,
                    addscore:false,
                },
                {
                    uid:6,
                    portrait:'./src/assets/userpic/user-06.jpg',
                    score:0,
                    painer:false,
                    inputText:'',
                    bingo:false,
                    addscore:false,
                }
            ],
            chooseShow:false,
            color:true,
            paintSize:'size_0', //画笔初始大小
            paintCol:'col_0',    //画笔初始颜色
            paint_Size:2,       //画笔大小转义后
            paint_Col:'black',        //画笔颜色转义后
            deactive_1:true,
            deactive_2:true,
            currentId:0,
            currentUser:{},
            Answer:{},
            sysInfo:{}
        }
    },
    mounted(){
        this.playerEach();
        this.getAnswer();
        this.gamePlay();
    },
    methods:{
        //拿到Answer数据
        getAnswer(){
            //模拟数据
          this.Answer = {
            content:'垃圾桶',
            word:3,
            keyword:'生活用品'
          };
        },
        //游戏流程
        gamePlay(){
            var _this = this;
            this.sysInfo={
                title:'游戏开始',
                content:'由1号玩家开始选词',
                time:5
            };
            this.timeOut(this.sysInfo.time);
            
            
        },
        //计时函数
        timeOut(_time){
            var _this = this;

             setTimeout(function(){
                if(_time ==0){
                    return;
                    }
                    _time --;
                    _this.sysInfo.time = _time;
                    _this.timeOut(_time);
           },1000)
           },
           //结束作画按钮
           painerEnd(){
              
           },
        //遍历玩家列表
        playerEach(){ 
            this.userlist.forEach(function(item){
                //当前用户this.$store.state.userInfo.uid
                if(item.uid  == 1 ){
                    this.currentUser = item;
                }
            }.bind(this));
        },
        //接收input输入
        receiveInfo(info){
            this.currentUser.inputText = info;
            this.provingAnswer();
        },
        //点击选择颜色按钮
        colClick(){
            this.chooseShow = true;
            if(!this.color){
                this.color = true;
            }
        },
        //点击选择大小按钮
        paintClick(){
            this.chooseShow = true;
            if(this.color){
                this.color = false;
            }
        },
        //上一步操作
        replyClick(){

        },
        //下一步操作
        forwardClick(){

        },
        
        //清空画布
        trash(){
            var child = this.$refs.myCanvas
            child.clearArea();
        },
        //选择大小
        choosePot(n){
            this.paintSize = 'size_' + (n-1); 
            this.chooseShow = false;
            this.setPaintSize();

        },
        //选择颜色
        chooseCol(n){
            this.paintCol = 'col_' + (n-1);
            this.chooseShow = false;
            this.setPaintCol();

        },
         //画笔设置
        setPaintCol(){
            var _col = this.paintCol;
                 //画笔颜色
                switch (_col){
                    case 'col_0':
                        this.paint_Col = 'black';
                        break;
                    case 'col_1':
                        this.paint_Col = 'blue';
                        break;
                    case 'col_2':
                        this.paint_Col = 'yellow';
                        break;
                    case 'col_3':
                        this.paint_Col = 'red';
                        break;
                    case 'col_4':
                        this.paint_Col = 'green';
                        break;
                    default:
                         this.paint_Col = "purple";
                }
        },
        setPaintSize(){
            var _size = this.paintSize;
            //画笔大小
                switch(_size) {
                    case 'size_0':
                        this.paint_Size = 2;
                        break;
                    case 'size_1':
                        this.paint_Size = 15;
                        break;
                    case 'size_2':
                        this.paint_Size = 30;
                        break;
                    case 'size_3':
                        this.paint_Size = 45;
                    default:
                        this.paint_Size = 60;
         }
      },
      //验证玩家提交答案是否正确
      provingAnswer(){
          var _this =this;
        if (this.currentUser.inputText == this.Answer.content){
            alert("恭喜回答正确！");
            this.currentUser.bingo = true;
            this.currentUser.addscore = true;
            setTimeout(function(){
                _this.currentUser.addscore = false;
            },2000)
        }
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
        overflow: hidden;
    }
    .game-tips{
        min-width: 350px;
        height: 80px;
        position: absolute;
        top: 30px;
        left: 20px;
        background: #000000;
        border-radius: 15px;
        line-height: 80px;
        padding: 0 30px;
    }
    .game-tips button{
        height:80px;
        width:120px;
        background:#2196F3;
        border:none;
        border-radius: 0 15px 15px 0;
    }
    .tips-timer{
        position: absolute;
        right:160px;
    }
    .tips-triangle{
        width:0;
        height:0;
        position: absolute;
        top: -40px;
        border-width: 20px;
        border-style: solid;
        border-color:transparent transparent #000000 transparent;
    }
    .text-margin{
        margin-right: 160px;
    }
    .game-tips-text{
        color: #ffffff;
        font-size: 28px;
    }
    .position-right{
        position: absolute;
        right:0;
        top:0;
    }
    .vertical-middle{
        vertical-align: middle;
    }
    .canvas-ex{
        height: 870px;
    }
    .canvas-ctrl{
        width: 100%;
        position: absolute;
        bottom: 340px;
    }
    .col-btn{
        width:50px;
        height:50px;
        margin:25px 0;
    }
    .color-btn{
        width:20px;
        height:20px;
        display: block;

    }
    .size-btn{
        width:4px;
        height:4px;
        border:none;
        background:#000000;
        
    }
    .canvas-ctrl-first li{
        margin:0 38px;
    }
    .canvas-ctrl-first{
        border: 1px dotted #b6b6b6;
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
        position: absolute;
        bottom: 140px;
        width: 100%;
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
    .de-active{
        color:#b6b6b6;
    }
    .canvas-mask{
        height: 870px;
        position: absolute;
        top: 0;
        width: 100%;
        z-index:100;
    }
    .add-score-mask{
        min-width: 100%;
        height:40px;
        position: absolute;
        border-radius: 10px;
        background:#ffffff;
        line-height: 40px;
         animation: 'score-mask-show' 2s infinite;
        -webkit-animation: 'score-mask-show' 2s infinite;
        -o-animation: 'score-mask-show' 2s infinite;
        -moz-animation: 'score-mask-show' 2s infinite;
    }
    /* .animateUp{
         animation: 'score-mask-show' 2s infinite;
        -webkit-animation: 'score-mask-show' 2s infinite;
        -o-animation: 'score-mask-show' 2s infinite;
        -moz-animation: 'score-mask-show' 2s infinite;
    } */
    @keyframes score-mask-show{
        0% { top:-20px;opacity:0 }
        50% {top:-50px; opacity: 1}
        100%{top:-50px;opacity: 0}
    }
    @-webkit-keyframes score-mask-show{
         0% { top:-20px;opacity:0 }
        50% {top:-50px; opacity: 1 }
        100%{top:-50px;opacity: 0}
    }
    @-o-keyframes score-mask-show{
        0% { top:-20px;opacity:0 }
        50% {top:-50px; opacity: 1 }
        100%{top:-50px;opacity: 0}
    }
    @-moz-keyframes score-mask-show{
        0% { top:-20px;opacity:0 }
        50% {top:-50px; opacity: 1 }
        100%{top:-50px;opacity: 0}
    }
    .add-score-mask span {
        font-size:20px;
    }
    .float-left{
        float:left;
    }
    .float-right{
        float:right;
    }
    .size_0{
        font-size:2px;
    }
    .size_1{
        font-size:15px;
    }
    .size_2{
        font-size: 30px;
    }
    .size_3{
        font-size:45px;
    }
    .size_4{
        font-size:60px;
    }
    .col_0{
        color:black;
    }
    .col_1{
        color:blue;
    }
    .col_2{
        color:yellow;
    }
    .col_3{
        color:red;
    }
    .col_4{
        color:green;
    }
    .col_5{
        color:purple;
    }
    .game-sys-info{
        width:400px;
        height:300px;
        position: absolute;
        left: 50%;
        top:30%;
        margin-left:-200px;
        background: rgba(0,0,0,.2);
        border-radius: 20px;
        text-align: center;
        box-sizing: border-box;
        padding: 20px;
    }
    .game-sys-info h1{
        font-size:50px;
        margin-bottom: 20px;
    }
    .game-sys-info p{
        font-size:30px;
        margin-bottom: 40px;
    }
</style>

