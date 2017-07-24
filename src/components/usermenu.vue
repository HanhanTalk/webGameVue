<template>
    <div class="side">
        <div class="user-menu-shade" v-if="!isHidden" v-on:click="shadeClick">
        </div>
        <div class="user-menu txt" v-bind:class="{ hidden : isHidden}">
            <div class="user-menu-head">Game</div>
            <div class="menu-userinfo">
                <img :src="$store.state.userInfo.portrait">
                <div class="niki">{{$store.state.userInfo.nick}}</div>
                <div class ="user-item-info">
                     <div class="user-gold circle"></div><span>金币:{{$store.state.userInfo.gold}}</span>
                     <div class="user-flower"></div><span>鲜花:{{$store.state.userInfo.flower}}</span>
                </div>
            </div>
            <div class="user-menu-list">
                <ul>
                    <li @click="friend"><span class="fa fa-comments-o"></span>交朋友<span class="fa fa-angle-right float-right"></span></li>
                    <li @click="play"><span class="fa fa-gamepad"></span>玩游戏<span class="fa fa-angle-right float-right"></span></li>
                    <li @click="feedback"><span class="fa fa-commenting-o"></span>意见反馈<span class="fa fa-angle-right float-right"></span></li>
                    <li @click="sign"><span class="user-gold circle"></span>签到领金币<span class="fa fa-angle-right float-right"></span></li>
                    <li @click="about"><span class="fa fa-rocket"></span>关于Game<span class="fa fa-angle-right float-right"></span></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style>
    .user-menu-shade{
        height:100%;
        width:100%;
        background:#000000;
        opacity: 0.6;
        z-index:10001;
        position: fixed;
        top:0;
        left:0;
    }
    .user-menu{
        height:100%;
        width:70%;
        background:rgba(46,72,86,1);
        color:#cccccc;
         z-index:10002;
        position:fixed;
        left:0;
        top:0;
        transition: left 1s;
        -moz-transition: left 1s;
        -webkit-transition: left 1s;
        -o-transition: left 1s;

    }
    .hidden{
        left:-100%;
    }
    .user-menu-head{
    font-size:60px;
    text-align: center;
    color: #ffffff;
    border-bottom: 2px solid rgba(62, 91, 105, 1);
    }
    .menu-userinfo{
        margin-top:60px; 
        text-align: center;
    }
    .menu-userinfo img{
        height:240px;
        width: 240px;
        border-radius: 10px;
    }
    .user-menu-list{
        position: absolute;
        bottom: 5px;
        width:100%;
    }
    .user-menu-list li{
        display: block;
        width:100%;
        height:100px;
        background:rgba(62,91,105,1);
        margin:4px 0; 
        box-sizing: border-box;
        padding:24px 30px;
        
    }
    .user-menu-list span{
        margin-right:10px;
    }
    .user-gold{
        width:40px;
        height:40px;
        display: inline-block;
        background-image: url('../assets/gold.jpg');
        background-size:40px 40px;
        /* background-position:top left; */
    }
    .user-item-info{
        width:50%;
        margin: 0 auto;
        padding: 20px 0;
        position: relative;
    }
    .user-item-info span{
         position: relative;
         top:-6px;
         left:10px;
    }
    .circle{
        border-radius: 50%;
    }
    .float-right{
        float:right;

    }
</style>
<script type='text/ecmascript6'>
export default {
  name:'userMenu',
  props:['isHidden'],
  data(){
    return {
        isHide:true
    }
  },
  methods:{
      shadeClick(){
        this.$emit('transferEvent',this.isHide);
      },
      friend(){
          this.shadeClick();
          this.$router.push('/friend');

      },
      play(){
        this.shadeClick();
        this.$router.push('/home');
      },
      feedback(){
        this.shadeClick();
        this.$router.push('/feedback');
      },
      sign(){
        this.shadeClick();  
        this.$router.push('/sign');
      },
      about(){
        this.shadeClick();  
        this.$router.push('/about');
      }

  }
}
</script>


