<template>
<div class="fiexd">
  <div class="user-info">
    <div class="user-pic">
        <img class="user-img circle" :src="$store.state.userInfo.portrait">
    </div>
    <div class="user-item">
        <p class="user-name txt">{{$store.state.userInfo.nick}}</p>
        <div class="user-cap">
            <div class="gold circle"><span>{{$store.state.userInfo.gold}}</span></div>
            <div class="user-btn-group">
                <button class="user-btn btn-green" type="button">充值</button>
                <button class="user-btn btn-red" type="button">红包</button>
            </div>
        </div>
    </div>
  </div>
      <ul class="room-list txt-2">
        <li><span class="fa fa-home"></span>我的包间</li>
        <li><span class="fa fa-plus-circle"></span>开包间</li>
        <li><span class="fa fa-search"></span>找房间</li>
    </ul>
</div>
</template>
<style>
    .fiexd{
        position: fixed;
        top: 120px;
        width: 100%;
        z-index: 100;
    }
    .user-info{
        width: 100%;
        background:rgba(38,39,58,1);
        box-sizing: border-box;
        padding: 0 20px;
    }
    .user-item{
        width: 80%;
        height: 150px;
        margin-left: 20%;
        padding:20px 0;
        color: #ffffff;
        box-sizing: border-box;
    }
    .user-img{
        width: 100px;
        height: 100px;
    }
    .user-pic{
        height: 150px;
        box-sizing: border-box;
        padding: 25px 0;
        float: left;
    }
    .circle{
        border-radius: 50%;
    }
    .gold{
        width:40px;
        height:40px;
        float: left;
        margin-right:50px;
        background-image: url('../../assets/gold.jpg');
        background-size:40px 40px;
        background-position:top left;
    }
    .gold span{
        margin-left:45px;
        font-size: 30px;
    }
    .user-cap{
        margin-top: 13px;
        position: relative;
    }
    .user-btn-group{
        position: absolute;
        left:130px;
    }
    .user-btn{
        width:100px;
        height:40px;
        border:none;
        border-radius: 2px;
        color: #ffffff;
        font-size:26px;
        margin-right:14px; 
    }
    .btn-green{
        background:#00d490;
    }
    .btn-red{
        background:#F44336;
    }
    .room-list {
        background: rgba(45,50,68,1);
        padding:25px 0;
        width:100%;
        height:40px;
    }
    .room-list li{
        float:left;
        width:33.3%;
        text-align: center;
        margin: 0;
    }
</style>
 <script type='text/ecmascript6'>
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

