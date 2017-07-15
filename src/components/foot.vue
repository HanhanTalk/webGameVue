<template>
  <div class="foot">
    <ul>
        <li><a href="javascript:;" @click="play"><span class="fa fa-gamepad"></span><p class="foot-btn">玩游戏</p></a></li>
        <li><a href="javascript:;" @click="friend"><span class="fa fa-comments-o"></span><p>交朋友</p></a></li>
        <li><a href="javascript:;" @click="self"><span class="fa fa-user-o"></span><p>个人</p></a></li>
        <li><a href="javascript:;" @click="rank"><span class="fa fa-list-ol"></span><p>排行榜</p></a></li>
        <li><a href="javascript:;" @click="find"><span class="fa fa-smile-o"></span><p>发现</p></a></li> 
    </ul>
  </div>
</template>
<style>
    .foot{
        position: fixed;
        bottom: 0;
        width:100%;
        height:60px;
        background:rgba(47,59,73,1);
    }
    .foot ul{
        width: 330px;
        height:60px;
        margin:0 auto;
        box-sizing: border-box;
    }
    .foot li{
        width:60px;
        height: 60px;
        text-align: center;
        margin:0;
        padding:5px 0;
    }
    .foot li a{
        text-decoration: none;
        color:#ffffff;
        font-size:1em;
    }
    .foot li span{
        font-size:1.8em;
    }
    .foot li p{
        font-size:0.5em ;
    }
    .action{
        background:rgba(54,83,97,1);
    }
</style>
<script type='text/ecmascript6'>
export default {
  name:'foot',
  data(){
     return {
        theclick:''
     }
  },
  methods:{
      play(){
          this.$router.push('/home');
      },
      friend(){
          this.$router.push('/friend');
      },
      self(){
          this.$router.push('/self');
      },
      rank(){
          this.$router.push('/rank');
      },
      find(){
          this.$router.push('/find');
      }

  }
}

</script>

