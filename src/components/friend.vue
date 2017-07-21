<template>
  <div>
      <div class="page">
          <div class="page-nav">
              <div class="nav-left">
                  <a href="javascript:;" @click="friendAdd"><span class="fa fa-user-plus"></span></a>
              </div>
              <div class="nav-btns">
                <button type="button" class="nav-btn active" @click="chat">聊天</button>
                <button type="button" class="nav-btn" @click="myFriend">好友</button>
              </div>
              <div class="nav-right">
                <a href="javascript:;" @click="createChat"><span class="fa fa-commenting-o"></span></a>
              </div>
          </div>
          <router-view></router-view>
      </div>
      <foot></foot>
  </div>
</template>
 <style>
      .page{
        width:100%;
        height:100%;
        padding-bottom: 100px;
        background: #f3f3f3;
        position: relative;
     }
     .page-nav{
       height: 50px;
       background:url('./games/bg-img/nav.jpg') no-repeat;
       background-size:100%;
       box-sizing: border-box;
       padding:0 15px;
       position: relative;
       line-height: 50px;
     }
     .page-nav a{
       color:#727272;
     }
     .page-nav span{
       font-size:22px;
     }
     .nav-left{
        float:left;
     }
     .nav-left,.nav-right{
        width: 50px;
       text-align: center;
     }
     .nav-btns{
    width: 140px;
    height: 50px;
    padding: 10px 0;
    box-sizing: border-box;
     position: absolute;
      left: 50%;
       margin-left: -70px;
     }
     .nav-btns button:nth-child(1){
       border-radius: 4px 0 0 4px;
     } 
     .nav-btns button:nth-child(2){
       border-radius: 0 4px 4px 0;
     }

     .nav-btn{
       height:30px;
       width:70px;
       float:left;
       border: 1px solid #dddddd;
       margin: 0;
       background:transparent; 
     }

     .nav-right{
       float:right;
     }
     .nav-btns .active{
        background:#727272;
        color: #ffffff;
     }
    </style>
 <script type="text/javascript6">
 import foot from './foot.vue'
export default {
  name:'friend',
  components:{ foot },
  methods:{
    friendAdd(){
        this.$router.push('/friend/friendAdd');
    },
    chat(){
        this.$router.push('/friend/chat');
    },
    createChat(){
        this.$router.push('/friend/createChat');
    },
    myFriend(){
        this.$router.push('/friend/myFriend');
    }
  },
  mounted:function(){
    this.chat();
  }
}
</script>

