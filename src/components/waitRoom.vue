<template>
  <div class="wait-room">
      <loading></loading>
      <div class="wait-user-list" :class="classObj">
        <ul>
          <li v-for="item in userlist" :key="item.id" :class="{'ready': (item.uid == $store.state.userInfo.uid) && onReady}">
            <img :src="item.portrait">
          </li>
        </ul>
      </div>
      <button id="btn" type="button" class="ready-btn" @click="readyClick" :class="[onReady ? 'onreadyCol': 'readyCol' ]">{{btnText}}</button>
  </div>
</template>
<style>
  .wait-room{
    position: relative;
    width: 100%;
    height:100%;
    background:rgba(46,42,44,1);
  }
  .wait-user-list{
    position: absolute;
    top: 50%;
    left:50%;
  }
  .user-list-xsmall{
    width: 175px;
    margin-left:-88px;
  }
  .user-list-small{
    width:232px;
    margin-left:-116px; 
  }
  .user-list-middle{
    width: 290px;
    margin-left:-145px;
  }
  .user-list-big{
    width:348px;
    margin-left:-174px;
  }
 
  .wait-user-list li{
    width: 50px;
    height: 50px;
    margin:0;
    display: block;
    float:left;
    border:4px solid transparent;
  }
  .wait-user-list img{
    width:100%;
    height:100%;
  }
  .ready{
    border:4px solid green !important;
  }
  .ready-btn{
    width: 150px;
    height: 40px;
    font-size: 22px;
    color: #ffffff;
    position: absolute;
    bottom: 80px;
    left: 50%;
    margin-left: -75px;
    border-radius: 5px;
    border:none;
    outline: none;
    /* background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(44,160,202)), color-stop(1, rgb(62,184,229)) ); */
  }
  .readyCol{
      background-color: #3bb3e0;
      -webkit-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #156785;
      -moz-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #156785;
      -o-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #156785;
      box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #156785;
  }
  .onreadyCol{
    background-color: rgba(246,114,117,1);
     -webkit-box-shadow: inset 0px 1px 0px rgba(206,52,68,1), 0px 5px 0px 0px rgb(165, 82, 91);
      -moz-box-shadow: inset 0px 1px 0px rgba(206,52,68,1), 0px 5px 0px 0px rgb(165, 82, 91);
      -o-box-shadow: inset 0px 1px 0px rgba(206,52,68,1), 0px 5px 0px 0px rgb(165, 82, 91);
      box-shadow: inset 0px 1px 0px rgba(206,52,68,1), 0px 5px 0px 0px rgb(165, 82, 91);

  }
  .ready-btn:active{
    bottom:78px;
    box-shadow: 0 0 0 transparent;
  }
</style>
 <script type="text/ecmascript6">
 import loading from './loading.vue'
 import client from '../api/client'
export default {
  name:'waitRoom',
  data(){
    return{
      btnText:'准备',
      onReady:false,
      userlist:[],
      client
    }
  },
  components:{loading},
   mounted:function(){
      this.userlist = client.arr8;
    },
  methods:{
    readyClick(){
      //遍历userlist，找到当前用户
      var _this = this;
        this.btnText = '已准备';
        this.onReady = true;
        document.getElementById('btn').disabled = true;
        setTimeout(function(){
             _this.$router.push('/wolfRoom');
        },3000)
    }
  },
  computed:{
    classObj:function(){
      return{
        'user-list-xsmall':this.userlist.length == 6,
        'user-list-small':this.userlist.length == 8,
        'user-list-middle':this.userlist.length == 10,
        'user-list-big':this.userlist.length == 12
      }
    }
  }
}
</script>

