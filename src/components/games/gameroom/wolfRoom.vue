<template>
  <div class="page-warp">
    <div class="room-warp">
      <!--游戏提示 -->
      <div class="game-sys-tips">
        <h1>
          <span class="fa fa-sun-o"></span>
        </h1>
        <p></p>
        <span class="time"></span>
      </div>
      <!--身份信息-->
      <div class="game-msg-head">
        <p class="font-middle">你的身份：村民</p>
      </div>
      <!--玩家列表-->
      <div class="wolfroom-userlist">
        <ul class="fLeft">
          <li v-for="(item,index) in playerlist_1" :key="item.id">
            <img :src="item.portrait">
            <span>{{index+1}}</span>
            <div class="pic-mask wrap">
            </div>
          </li>
        </ul>
        <ul class="fRight">
          <li v-for="(item,index) in playerlist_2" :key="item.id" v-if="item">
            <!-- <img src="../../../assets/userpic/anonym.jpg"> -->
            <div v-if="item.uid">
              <img :src="item.portrait">
              <span>{{index+8}}</span>
              <div class="pic-mask wrap death">
              </div>
            </div>
            <div v-if="item == 'nobody'">
               <img src="../../../assets/userpic/anonym.jpg">
            </div>  
          </li>
        </ul>
      </div>
      <!--游戏中途选项-->
      <!--狼人操作栏-->
      <div class="page-warp page-mask">
         <div class="page-small-box " v-if="false">
            <div class="page-small-box-head">
              <img src="../../../assets/game-img/wolfkill.jpeg">
               <h1>请选择你要杀掉的玩家,嘿嘿～</h1>
            </div>
            <div class="page-small-box-content">
                <ul>
                  <li class="small-box-userpic" :class="{'small-box-fix':false}" v-for="item in 6" :key="item.id">
                    <img src="../../../assets/userpic/anonym.jpg">
                  </li>
                </ul>
            </div>
         </div>
        <!--女巫操作栏 -->
           <div class="page-small-box" v-if="false">
              <div class="page-small-box-head">
                <img src="../../../assets/game-img/lvwu.jpeg">
                <!-- <h1>你是否要救他？</h1> -->
                 <h1>你要对谁使用毒药吗？</h1> 
              </div>
              <div class="page-small-box-content">
                   <!-- <div class="small-box-item">
                      <img class="small-deach-play" src="../../../assets/userpic/anonym.jpg">
                      <span>1号玩家</span>
                   </div>   
                    <div class="box-btn-group">
                          <button type="button" class="btn btn-col3">救</button>
                          <button type="button" class="btn btn-col4">不救</button>
                    </div> -->
                   <ul>
                    <li class="small-box-userpic" v-for="item in 7" :key="item.id">
                      <img src="../../../assets/userpic/anonym.jpg">
                    </li>
                  </ul> 
              </div>
           </div>
           <div class="page-small-box" v-if="true">
              <div class="page-small-box-head">
                  <img src="../../../assets/game-img/yuyan.jpeg">
                  <h1>你要查看谁的身份？</h1>
              </div>
              <div class="page-small-box-content">
                  <ul>
                    <li class="small-box-userpic" v-for="item in 7" :key="item.id">
                      <img src="../../../assets/userpic/anonym.jpg">
                    </li>
                  </ul> 
              </div>
           </div>


      </div>
      <textInput @answerEvent="receiveInfo"></textInput>
    </div>
  </div>
</template>
 <script type="text/ecmascript6">
import wolf from '../../../api/game/wolf'
import textInput from '../../public/input.vue'
export default {
  name: 'wolfRoom',
  components:{ textInput },
  data() {
    return {
      playerlist:[],
      playerlist_1:[],
      playerlist_2:[],
      flowStatus:0
    }
  },
  mounted(){
    this.getPlayerData();
    this.setPlayGroup();
  },
  methods: {
    getPlayerData(){
      //模拟用户数据
    this.playerlist=[
      {    
        uid:'10001',
        nick:'死侍',
        portrait:'./src/assets/userpic/user-01.jpg',
        idCard:'',
        survival:true
    },
    {    
        uid:'10002',
        nick:'雷神',
        portrait:'./src/assets/userpic/user-02.jpg',
        idCard:'',
        survival:true
    },
    {    
        uid:'10003',
        nick:'超人',
        portrait:'./src/assets/userpic/user-03.jpg',
        idCard:'',
        survival:true
    },
   {    
        uid:'10004',
        nick:'蝙蝠侠',
        portrait:'./src/assets/userpic/user-04.jpg',
        idCard:'',
        survival:true
    },
  {    
        uid:'10005',
        nick:'钢铁侠',
        portrait:'./src/assets/userpic/user-05.jpg',
        idCard:'',
        survival:true
    },
   {    
        uid:'10006',
        nick:'蜘蛛侠',
        portrait:'./src/assets/userpic/user-06.jpg',
        idCard:'',
        survival:true
    },
     {    
        uid:'10007',
        nick:'Rookie',
        portrait:'./src/assets/userpic/user-07.jpg',
        idCard:'',
        survival:true
    },
     {   
        uid:'10008',
        nick:'Hansir',
        portrait:'./src/assets/userpic/user-08.jpg',
        idCard:'',
        survival:true
    }]
    },
    //给用户分组
    setPlayGroup(){
      let len = this.playerlist.length;
      let subArr = [];
      for(var i = 0;i< 14-len;i++){
          subArr[i]= "nobody";
      }
      let Arr = this.playerlist.concat(subArr);

      this.playerlist_1 = Arr.slice(0,7);
      this.playerlist_2 = Arr.slice(7,14);
     },

    receiveInfo(info) {
      //info 为input组件输入内容
    },
    //游戏流程控制
    gameFlowCtrl(){

    },
    //游戏流程
    gameFlowStatus(_status){
        switch(_status){
          //天黑时 狼人操作
          case 0:{
           
          }
          //天黑时 女巫操作
          case 1:{

          }
          //天黑时 预言家操作
          case 2:{

          }
        }
        
    },
    //游戏开始 分发身份牌
    gameStart(){
      //判断有几个玩家
      var len = this.playerlist.length;
      switch (len){
        case 8:{
          //3神+3平+2狼

        }
        case 10:{
          //3神+4平+3狼
        }
        default:{
          //暂时不用12人
        }
      }

    },
    //天黑时 ：
    //1 狼人操作：选择要杀掉的玩家
    gameFlowStatus_wolf(){

    },
    //2 女巫操作：救人／不救 ，毒人／不毒
    gameFlowStatus_witch(){

    },
    //3 预言家操作：选择要查看玩家
    gameFlowStatus_prophesy(){

    }
    //清算结果
    //天亮时：
    //1（判断天数）前两天死掉的人有遗言

    //2 从死亡玩家下一位玩家开始发言，每个人有1分半发言时间，可以跳过
    //3 玩家投票

    



  }
}
</script>
<style>
.room-warp {
  right: 0;
  left: 0;
  top: 120px;
  bottom: 0;
  position: absolute;
  background: url(../../../assets/game-bg/langrensha-bg.jpeg) no-repeat;
  background-size: 100%;
}
.page-mask {
    background: rgba(0, 0, 0, .4);
    z-index: 1000;
}
.page-middle-box {
    width: 600px;
    height: 700px;
    position: absolute;
    top: 200px;
    left: 50%;
    background: #ffffff;
    margin-left: -300px;
    border-radius: 20px;
    text-align: center;
}
.page-small-box {
    width: 600px;
    height: 600px;
    position: absolute;
    left: 50%;
    margin-left: -300px;
    top: 200px;
    background: #ffffff;
    border-radius: 20px;
}
.small-box-userpic{
  width: 72px;
  height:72px;
}
.small-box-userpic img{
  width: 100%;
  height:100%;
}
.page-small-box-head{
  height:340px;
  margin-bottom: 4px;
  position: relative;
}
.page-small-box-head h1{
  position: absolute;
  bottom: 20px;
  display: block;
  width: 100%;
  text-align: center;
  font-size:40px;
  color:#F44336;
}
.page-small-box-head img{
  width:100%;
  height: 100%;
  opacity: 0.8;
  border-radius: 20px 20px 0 0;
}
.page-small-box-content{
  width: 400px;
  margin: 0 auto;
}
.page-small-box-foot{
  height:200px;
}
.small-box-userpic{
  margin:20px 10px;
}
.small-box-fix{
  border:4px solid #F44336;
}
.upper {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 30%;
  left: 50%;
  margin-left: -100px;
  animation: myMove 2s ease 2s 1 alternate;
}

.game-sys-tips {
  width: 480px;
  position: absolute;
  left: 50%;
  top: 80px;
  margin-left: -240px;
  color: #dddddd;
  background: rgba(0, 0, 0, 0.4);
  text-align: center;
  box-sizing: border-box;
  padding: 10px 20px;
  z-index: 100;
}

.game-sys-tips h1 {
  font-size: 40px;
  margin-bottom: 10px;
}

.game-sys-tips span {
  font-size: 35px;
}

@keyframes myMove {
  from {
    top: 30%;
    left: 50%;
    width: 200px;
    height: 200px;
  }
  to {
    top: 65px;
    left: 100%;
    width: 30px;
    height: 30px;
  }
}

.upper-top {
  top: 65px;
  left: 100%;
  width: 30px;
  height: 30px;
}
.small-box-item{
  width: 100px;
  height:140px;
  font-size:20px;
  text-align: center;
  margin: 0 auto;
}
.upper img,.small-box-item img {
  width: 100px;
  height: 100px;
}

.wolfroom-userlist ul {
  margin: 30px 5px 0 5px;
}

.wolfroom-userlist li {
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
  text-align: center;
  display: block;
  color: #ffffff;
  border: 4px solid #727272;
  border-radius: 20px;
  position: relative;
}

.wolfroom-userlist li span {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(58, 185, 130, 1);
  width: 50px;
  height: 50px;
  border-radius: 20px 10px 10px 0;
  line-height: 50px;
  text-align: center;
  font-size: 26px;
}

.wolfroom-userlist li img {
  width: 120px;
  height: 120px;
  border-radius: 20px;
}

.fLeft {
  float: left;
}

.fRight {
  float: right;
}

.game-msg-head {
  position: absolute;
  top: 0;
  height: 80px;
  width: 100%;
  background: rgba(0, 0, 0, .6);
  color: #cccccc;
  box-sizing: border-box;
  padding: 0 140px;
  line-height: 80px;
}

.pic-mask {
  top: -2px;
  left: -2px;
  z-index: 100;
  border-radius: 10px;
}

.wolfRoom .speak {
  box-shadow: 0 0 10px #F44336 inset;
  border: 2px solid #F44336;
}

.wolfRoom .death {
  border: 2px solid #727272;
  background: url(../../../assets/game-bg/death_meitu_1.jpg) no-repeat;
  background-size: 100%;
  opacity: 0.6;
}
.box-btn-group{
  width:400px;
  margin:20px 0; 
}
.box-btn-group .btn{
   font-size:40px; 
   border:none;
   outline: none;
   width:180px;
   border-radius: 10px;
   color:#ffffff;
   margin: 0 8px;
}
.box-btn-group .btn-col3{
  background:#66bb6a;
}
.box-btn-group .btn-col4{
  background:#F44336;
}
.btn-group {
  position: absolute;
  left: 50%;
  bottom: 20px;
  width: 276px;
  margin-left: -138px;
}

.btn-group button {
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 18px;
  outline: none;
  background: linear-gradient(top, rgba(29, 202, 242, 1), rgba(28, 117, 243, 1));
  background: -webkit-linear-gradient(top, rgba(29, 202, 242, 1), rgba(28, 117, 243, 1));
  background: -o-linear-gradient(top, rgba(29, 202, 242, 1), rgba(28, 117, 243, 1));
  background: -moz-linear-gradient(top, rgba(29, 202, 242, 1), rgba(28, 117, 243, 1));
}

.btn-group input {
  position: absolute;
  top: 0;
  right: 0;
  width: 215px;
  height: 35px;
  border-radius: 10px;
  outline: none;
  font-size: 1em;
  transition: width 1s;
}

.input-hide {
  width: 0 !important;
  opacity: 0;
}

.text-input {
  width: 50px;
  height: 40px;
}

.microphone {
  width: 220px;
  height: 40px;
}

.microphone span {
  margin-right: 5px;
}

.font-middle {
  font-size: 36px;
}
</style>


