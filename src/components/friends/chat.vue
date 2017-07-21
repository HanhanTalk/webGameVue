<template>
    <div class="page-list">
        <ul>
            <li @click="toChat">
                <div class="floatL"><img src="../games/game-info-img/001.jpeg"></div>
                <div class="page-color-line floatL"></div>
                <div class="page-list-item" :swipeleft="onSwipeLeft">
                    <div class="page-list-user">Hansir</div>
                    <div class="page-list-msg"><p><span class="unread">[5条]</span>我很长超出部分我想进行省略啦</p></div>
                    <div class="msg-time">12:15</div>
                </div>
            </li>
        </ul>
    </div>
</template>
      
<script type="text/ecmascript6">
export default {
      name:'chat',
      methods:{
          toChat(){
            this.$router.push('/chatRoom');
          },
          onSwipeLeft(){
              alert(1);
          }
      }
 }
</script>
      
<style>
    .page-list{
        padding: 5px;
    }
    .page-list li{
        margin: 0;
        width: 100%;
        height:80px;
    }
    .page-list img{
        width: 80px;
        height: 80px;
    }
    .page-list-item{
        margin-left: 80px;
        height: 80px;
        box-sizing: border-box;
        padding: 8px 0;
        position: relative;
    }
    .msg-time{
        position: absolute;
        top:10px;
        right:15px;
        color:#727272;
    }
    .page-color-line{
        height: 80px;
        width: 8px;
    }
    .page-list-user{
        font-size:22px;
        margin-bottom: 15px;
    }
    .page-list-msg{
        color:#727272;
    }
    .page-list-msg p{
        height: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .unread{
        margin-right:4px;
    }
    .floatL{
        float:left;
    }
</style>

