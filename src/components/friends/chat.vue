<template>
    <div class="page-list">
        <ul>
            <li @click="toChat" v-for="user in userlist" :key="user.id">
                <div class="floatL"><img :src="user.portrait"></div>
                <div class="page-list-item">
                    <div class="page-list-user txt">{{user.nick}}</div>
                    <div class="page-list-msg txt-2"><p><span class="unread">[{{user.comment.length}}条]</span>{{user.comment[0]}}</p></div>
                    <div class="msg-time txt-2">{{user.time}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
      
<script type="text/ecmascript6">
export default {
      name:'chat',
      data(){
        return{
            userlist:[{
                      nick:'Hansir',
                      portrait:'./src/assets/userpic/user-02.jpg',
                      state:'在线',
                      comment:['今天好热啊'],
                      time:'12:50'
                  }]
        }
      },
      methods:{
          toChat(){
            this.$router.push('chatRoom');
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
        height:180px;
    }
    .page-list img{
        width: 160px;
        height: 160px;
        margin: 10px;
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
        top:20px;
        right:30px;
        color:#727272;
    }
    .page-color-line{
        height: 80px;
        width: 8px;
    }
    .page-list-user{
        margin-bottom: 54px;
    }
    .page-list-msg{
        color:#727272;
    }
    .page-list-msg p{
        height: 40px;
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

