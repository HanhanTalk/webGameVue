<template>
  <div class="wolfRoom wrap">
    <div class="game-msg-head">
      <p>你的身份：{{game_id}}</p>
    </div>
    <div v-if="upperShow" class="upper" :class="{'upper-top':toMove}">
        <img :src="game_img_url">
    </div>
      <ul class="fLeft">
        <li v-for="(item,index) in userlist_1" :key="item.id">
          <img :src="item.portrait">
          <span>{{index+1}}</span>
          <div class="pic-mask wrap">
          </div>
        </li>
      </ul>
      <ul class="fRight">
        <li v-for="(item,index) in userlist_2" :key="item.id">
          <img :src="item.portrait">
          <span>{{index+8}}</span>
          <div class="pic-mask wrap death">
          </div>
        </li>
      </ul>
      <div class="game-sys-tips">
        <h1><span class="fa" :class="{'fa-sun-o':onday,'fa-moon-o':!onday}"></span>{{wolf.msgObj.title}}</h1>
        <p>{{wolf.msgObj.content}}</p>
        <span class="time">{{wolf.msgObj.time}}</span>
      </div>
      <div class="btn-group">
        <button @click="inputBtn" class="text-input" type="button"><span class="fa" :class="{'fa-pencil-square-o':!onInput,'fa-microphone':onInput}"></span></button>
        <button class="microphone" type="button" ><span class="fa fa-microphone"></span>按住说话</button>
        <input :class="{'input-hide':!onInput}" type="text">
      </div>
  </div>
</template>
<style>
    .wrap{
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
    }
    .upper{
      width:200px;
      height:200px;
      position: absolute;
      top:30%;
      left:50%;
      margin-left:-100px;
      animation: myMove 2s ease 2s 1 alternate;
    }
    .game-sys-tips{
    width: 230px;
    position: absolute;
    left: 50%;
    top: 100px;
    margin-left: -115px;
    color: #dddddd;
    background: rgba(0,0,0,0.4);
    text-align: center;
    box-sizing: border-box;
    padding: 10px 20px;
    z-index: 100;
    }
    .game-sys-tips h1{
      font-size:30px;
      margin-bottom:10px;
    }
    .game-sys-tips span{
      font-size:35px;
    } 
    @keyframes myMove{
      from {
        top:30%;
        left:50%;
         width:200px;
         height:200px;
      }
      to{ top: 65px;
      left: 100%;
      width:30px;
      height:30px;}
    }
    .upper-top{
      top: 65px;
      left: 100%;
      width:30px;
      height:30px;
    }
    .upper img{
      width:100%;
      height:100%;
    }
    .wolfRoom{
      padding:50px 0;
      width:100%;
      box-sizing: border-box;
      background:url(../assets/game-bg/langrensha-bg.jpeg);
    }
    .wolfRoom ul{
      margin:30px 5px 0 5px;
    }
    .wolfRoom li{
      width:60px;
      height:60px;
      margin-bottom: 5px;
      text-align: center;
      display: block;
      color:#ffffff;
      border:2px solid #727272;
      border-radius: 10px;
      position: relative;
    }
    .wolfRoom li span{
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(58,185,130,1);
    width: 25px;
    border-radius: 5px 5px 5px 0;
    }
    .wolfRoom li img{
      width:60px;
      height:60px;
      border-radius: 10px;
    }
    .fLeft{
      float:left;
    }
    .fRight{
      float:right;
    }
    .game-msg-head{
      position: absolute;
      top:60px;
      height:40px;
      width:100%;
      background:rgba(0,0,0,.6);
      color:#cccccc;
      box-sizing: border-box;
      padding:0 80px;
      line-height: 40px;
    }
    .pic-mask{
      top:-2px;
      left:-2px;
      z-index:100;
      border-radius: 10px;
    }
   .wolfRoom .speak{
     box-shadow: 0 0 10px #F44336 inset;
     border:2px solid #F44336;
    }
   .wolfRoom .death{
      border:2px solid #727272;
      background:url(../assets/game-bg/death_meitu_1.jpg) no-repeat;
      background-size:100%;
      opacity: 0.6;
   }
   .btn-group{
     position: absolute;
     left:50%;
     bottom:20px;
     width:276px;
     margin-left:-138px;

   }
   .btn-group button{
      border: none;
      border-radius: 10px;
      color:#ffffff;
      font-size:18px;
      outline: none;
      background:linear-gradient(top,rgba(29,202,242,1),rgba(28,117,243,1));
      background:-webkit-linear-gradient(top,rgba(29,202,242,1),rgba(28,117,243,1));
      background:-o-linear-gradient(top,rgba(29,202,242,1),rgba(28,117,243,1));
      background:-moz-linear-gradient(top,rgba(29,202,242,1),rgba(28,117,243,1));
   }
   .btn-group input{
     position: absolute;
     top:0;
     right:0;
     width:215px;
     height:35px;
     border-radius: 10px;
     outline: none;
     font-size:1em;
     transition: width 1s;
   }
   .input-hide{
     width:0 !important;
     opacity: 0;
   }
   .text-input{
     width:50px;
     height:40px;
   }
   .microphone{
     width:220px;
     height:40px;
   }
   .microphone span{
     margin-right:5px;
   }
</style>
 <script type="text/ecmascript6">
 import client from '../api/client'
 import wolf from '../api/game/wolf'
export default {
  name:'wolfRoom',
  data(){
    return{
      client,
      wolf,
      game_id:'',
      userlist_1:[],
      userlist_2:[],
      game_img_url:'',
      upperShow:false,
      toMove:false,
      onInput:false,
      onday:true
    }
  },
  methods:{
    getGame_id(){
      var _this = this;
       this.game_id = '预言家';
       this.game_img_url = '../src/components/games/game-info-img/001.jpeg';
       this.upperShow = true;
      setTimeout(function(){
        _this.toMove = true;
      },2009);
    },
    inputBtn(){
      if(this.onInput){
        this.onInput = false;
      } else{
        this.onInput = true;
      }
    }
  },
  mounted:function(){
    var _this = this;
    var userlist = client.arr8;
    this.userlist_1 = userlist.slice(0,7);
    this.userlist_2 = userlist.slice(7,userlist.length);
    setTimeout(function(){
        _this.getGame_id();
    },1000);
  this.wolf.countDown();
  },
}
</script>


