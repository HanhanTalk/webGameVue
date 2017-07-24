<template>
  <div class="foot">
    <!-- <ul>
        <li class="action" @click="play"><span class="fa fa-gamepad"></span><p class="foot-btn">玩游戏</p></li>
        <li @click="friend"><span class="fa fa-comments-o"></span><p>交朋友</p></li>
        <li @click="self"><span class="fa fa-user-o"></span><p>个人</p></li>
        <li @click="rank"><span class="fa fa-list-ol"></span><p>排行榜</p></li>
        <li @click="find"><span class="fa fa-smile-o"></span><p>发现</p></li> 
    </ul> -->
    <ul class="foot-btn-list">
        <li :class="{'active':activeNode == index + 1}" v-for="(item,index) in list" :key="item.id" @click="onClick(item)">
            <span class="fa"></span>
            <p>{{item}}</p>
        </li>
    </ul>
  </div>
</template>
<style>
    .foot{
        position: fixed;
        bottom: 0;
        width:100%;
        height:120px;
        background:rgba(47,59,73,1);
    }
    .foot ul{
        width: 600px;
        height:120px;
        margin:0 auto;
        box-sizing: border-box;
    }
    .foot li{
        width:120px;
        height: 120px;
        text-align: center;
        margin:0;
        padding:10px 0;
        color:#ffffff;
    }
    .foot li span{
        font-size:50px;
    }
    .foot li p{
        font-size:26px ;
    }
    .foot-btn-list li:nth-child(1)>span::before {
        content: '\f11b';
    }
    .foot-btn-list li:nth-child(2)>span::before{
        content: "\f0e6";
    }
    .foot-btn-list li:nth-child(3)>span::before{
        content: "\f2c0";
    }
    .foot-btn-list li:nth-child(4)>span::before{
        content: "\f0cb";
    }
    .foot-btn-list li:nth-child(5)>span::before{
        content: "\f118";
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
        theclick:'',
        list:[],
        activeNode:''
     }
  },
  created:function(){
    this.activeNode = 1;
    this.list=['玩游戏','交朋友','个人','排行榜','发现'];

  },
  methods:{
     onClick(e){
        switch (e) {
            case '玩游戏':
                this.activeNode = 1;
                this.$router.push('/home/game');
                break;
            case '交朋友':
                this.activeNode = 2;
                this.$router.push('/home/friend');
                break;
            case '个人':
                this.$router.push('/home/self');
                this.activeNode = 3;
                break;
            case '排行榜':
                this.$router.push('/home/rank');
                this.activeNode = 4;
                break;
            default:
                this.$router.push('/home/find');
                this.activeNode = 5;
        }
    },
    //   play(){
    //       this.$router.push('/home');
    //   },
    //   friend(){
    //       this.$router.push('/friend');
    //   },
    //   self(){
    //       this.$router.push('/self');
    //   },
    //   rank(){
    //       this.$router.push('/rank');
    //   },
    //   find(){
    //       this.$router.push('/find');
    //   }
  },
//   computed:{
//       classObj:function(){
//           return{
//               'fa-gamepad': index == 1,

//           }
//       }
//   }

}

</script>

