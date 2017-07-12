<template>
<div class="fiexd">
  <div class="user-info">
    <div class="user-pic left">
        <img class="user-img circle" src="../assets/logo.png">
    </div>
    <div class="user-item">
        <p class="user-name">{{$store.state.userInfo.nick}}</p>
        <div class="user-cap">
            <div class="gold circle"><span>{{$store.state.userInfo.gold}}</span></div>
            <button class="user-btn btn-green" type="button">充值</button>
            <button class="user-btn btn-red" type="button">红包</button>
        </div>
    </div>
  </div>
    <div class="room">
        <div class="room-sub"><a href="javascirpt:;"><span class="fa fa-home"></span>我的包间</a></div>
        <div class="room-sub"><a href="javascirpt:;"><span class="fa fa-plus-circle"></span>开包间</a></div>
        <div class="room-sub"><a href="javascirpt:;"><span class="fa fa-search"></span>找房间</a></div>
    </div>
  </div>
</template>
<style>
    .fiexd{
        position: fixed;
        top: 0;
        width: 100%;
    }
    .user-info{
        width: 100%;
        background:rgba(38,39,58,1);
        box-sizing: border-box;
        padding: 0 10px;
    }
    .user-item{
        width: 80%;
        height: 80px;
        margin-left: 20%;
        padding:10px 0;
        color: #ffffff;
        box-sizing: border-box;
    }
    .user-img{
        width:50px;
        height:50px;
    }
    .user-pic{
        height: 80px;
        box-sizing: border-box;
        padding: 15px 0;
    }
    .circle{
        border-radius: 50%;
    }
    .gold{
        width:20px;
        height:20px;
        float: left;
        margin-right:50px;
        background-image: url('../assets/gold.jpg');
        background-size:20px 20px;
        background-position:top left;
    }
    .gold span{
        margin-left:25px;
    }
    .user-cap{
        margin-top: 13px;
    }
    .user-btn{
        width:50px;
        border:none;
        border-radius: 2px;
        color: #ffffff;
    
    }
    .btn-green{
        background:#00d490;
    }
    .room {
        background: rgba(45,50,68,1);
        padding:15px 0;
        width:100%;
        height:22px;
    }
    .room-sub{
        float:left;
        width:33.3%;
        text-align: center;
    }
    .room a{
        color:#cccccc;
        text-decoration: none;
    }
</style>
 <script type='ecmascript6'>
    export default {
        name:'userinfo',
        data(){
          return{
            
          }
        },  
        methods:{
            
        }
    }
</script>

