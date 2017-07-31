<template>
  <div class="animated fadeIn">
      <div class="page fixed-box ">
          <div class="page-nav">
              <div class="nav-left">
                  <a href="javascript:;" @click="friendAdd"><span class="fa fa-user-plus"></span></a>
              </div>
              <div class="nav-btns">
                <button type="button" class="nav-btn" :class="{'active':isActive}" @click="chat">聊天</button>
                <button type="button" class="nav-btn" :class="{'active':!isActive}" @click="myFriend">好友</button>
              </div>
              <div class="nav-right">
                <a href="javascript:;" @click="createChat"><span class="fa fa-commenting-o"></span></a>
              </div>
          </div>
          <router-view></router-view>
      </div>
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
       height: 100px;
       background:url('../../assets/bg-img/nav.jpg') no-repeat;
       background-size:100%;
       box-sizing: border-box;
       padding:0 20px;
       position: relative;
     }
     .page-nav a{
       color:#727272;
     }
     .page-nav span{
       font-size:50px;
     }
     .nav-left{
        float:left;
     }
     .nav-left,.nav-right{
        width: 100px;
       text-align: center;
       line-height: 100px;
     }
     .nav-btns{
        width: 300px;
        height: 100px;
        padding: 20px 0;
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        margin-left: -150px;
     }
     .nav-btns button:nth-child(1){
       border-radius: 4px 0 0 4px;
     } 
     .nav-btns button:nth-child(2){
       border-radius: 0 4px 4px 0;
     }

     .nav-btn{
      height: 60px;
      width: 150px;
      float: left;
      border: 1px solid #dddddd;
      margin: 0;
      background: transparent;
      font-size:30px;
      outline: none;
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
export default {
  name:'friend',
  data(){
    return{
      isActive:true,
      title:'我的好友'
    }
  },
  methods:{
    friendAdd(){
        this.$router.push('/home/friend/friendAdd');
    },
    chat(){
        this.isActive = true;
        this.$router.push('/home/friend/chat');
        this.setTitle();
        
    },
    createChat(){
        this.$router.push('/home/friend/createChat');
    },
    myFriend(){
        this.isActive = false;
        this.$router.push('/home/friend/myFriend');
    },
    setTitle(){
       this.$store.commit('updateTitle',this.title)
    }
  },
  mounted:function(){
    this.chat();
  }
}
</script>

