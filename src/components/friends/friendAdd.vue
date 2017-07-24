
<template>
    <div class="warp">
        <div class="page-head page-head-col head-title">
            <h1>添加好友</h1>
        </div>
        <div class="search-input">
            <span class="fa fa-search position-left icon-size"></span>
            <input class="input-text" type="text">
        </div>
        <div class="search-content">
            <ul>
                <li  v-for="item in userlist" :key="item.id">
                    <img :src="item.portrait">
                    <div class="userlist-item float-right">
                       <p>{{item.nick}}</p>
                       <span>{{item.accout}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <ul class="page-list">
            <li class="list-li"><img src="../../assets/components-img/5.png"><span class="page-list-text">附近的人</span></li>
            <li class="list-li"><img src="../../assets/components-img/15.png"><span class="page-list-text">可能认识</span></li>
        </ul>
    </div>

</template>
      
<script type="text/ecmascript6">
export default {
      name:'friendAdd',
      data(){
          return{
               userlist:[{
                    uid:'10001',
                    accout:'deadpool',
                    password:'123456',
                    nick:'死侍',
                    ulevel:'18',
                    gold:'1000',
                    flower:'2',
                    portrait:'./src/assets/userpic/user-01.jpg'
               }]
          }
      }
 }
</script>
      
<style>
    .warp{
        width: 96%;
        margin: 0 auto;
    }
    .page-head{
        height: 80px;
        margin-top:10px;
        line-height: 80px;
    }
    .head-title{
        font-size: 20px;
        color: #ffffff;
        text-align: center;
    }
    .page-head-col{
        background: rgba(50,65,95,1);
    }
    .search-content{
        min-height: 300px;
    }
    .search-content li{
        height:100px;
    }
    .search-content li img{
        width:100px;
        height:100px;
    }
    .search-input{
        width: 100%;
        height: 100px;
        margin: 20px 0;
        position: relative;
    }
    .search-input span{
        height: 90px;
        width: 90px;
        background: #ffffff;
        line-height: 90px;
    }
    .search-input input{
        height: 100px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 40px 0 100px;
    }
    .input-text{
        font-size:36px;
    }
    .position-left{
        position: absolute;
        left:5px;
        top:5px;
    }
    .icon-size{
        text-align: center;
        font-size:30px;
    }
    .list-li{
        background: #ffffff;
        margin-bottom: 20px;
        font-size: 40px;
        position: relative;
    }
    .page-list-text{
        position: absolute;
        margin-left: 40px;
        top:70px;
    }
    .float-left{
        float:right;
    }
</style>