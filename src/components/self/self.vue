<template>
  <div class="page fixed-box">
      <div class="self-info">
          <img :src="$store.state.userInfo.portrait">
          <div class="self-info-middle">
            <p class="txt">{{$store.state.userInfo.nick}}</p>
            <span class="txt">{{$store.state.userInfo.accout}}</span>
            <div class="self-level"><p class="txt">LV{{$store.state.userInfo.ulevel}}<span>136/230</span></p></div>
          </div>
          <div class="qr-code"><a href="javascript:;"><span class="fa fa-qrcode"></span></a></div>
      </div>
      <hr>
      <div class="res txt">
         <ul>
             <li><img src="../../assets/gold.jpeg" alt="gold"><span>{{$store.state.userInfo.gold}}</span></li>
             <li><img src="../../assets/hua.jpg"><span>{{$store.state.userInfo.flower}}</span></li>
             <li><img src="../../assets/10.png" alt="diamond"><span>0</span></li>
        </ul>
      </div>
      <div class="self-choose-list">
        <ul>
            <li v-for="item in textlist" :key="item.id" :class="{'li-boder':item.title === '关注Game公众号'}">
                {{item.title}}
                <span class="self-list-prompt" >{{item.prompt}}<span class="fa fa-angle-right"></span></span>
            </li>
             <li @click="loginOut" class="self-li-last li-boder">退出手机登录</li> 
        </ul>
      </div>
  </div>
</template>
  <style>
    hr{
        border: 1px solid #dddddd;
    }
     .page{
        width:100%;
        height:100%;
        background: #f3f3f3;
        position: relative;
        margin-bottom: 75px;
     }
     .self-info{
        position: relative;
        margin:0 15px;
     }
     .self-info img{
        width: 160px;
        height: 160px;
        float: left;
        margin: 20px 0;
        border: 1px solid #727272;
     }
     .self-info-middle{
        height: 200px;
        box-sizing: border-box;
        padding: 14px 180px;
     }
     .self-info-middle p{
         margin-bottom:10px;
     }
     .self-info-middle>span{
         color:#727272;
     }
     .self-level{
        margin-top: 10px;
     }
     .self-level span{
         margin-left:15px;
     }

     .qr-code{
         height:60px;
         font-size:60px;
         position: absolute;
         top:50%;
         right:20px;
         margin-top:-30px;
     }
     .res{
        height:80px;
        line-height: 80px;
        border-bottom: 8px solid #dddddd;
     }
     .res li{
         margin:0 10px;
     }
     .res img{
        width:40px;
        height:auto;
        border-radius: 10px;
     }
     .res span{
         position:relative;
         left:5px;
         top:-3px;
     }
    .self-choose-list li{
        height: 80px;
        margin: 0;
        display: block;
        box-sizing: border-box;
        padding: 0 20px;
        line-height: 80px;
        border-bottom: 1px solid #cccccc;
        position: relative;
        font-size:34px;
    }
    .self-li-last{
        height: 84px !important;
        text-align: center;
        background:#f3f3f3;
    }
    .li-boder{
         border-top:8px solid #dddddd;
    }
    .self-list-prompt{
        position: absolute;
        right:20px;
        color:rgba(5,210,137,1);
    }
    .self-list-prompt span{
        margin-left:20px;
        color:#727272;
    }
    .qr-code-window{

    }
  </style>
 <script type="text/javascript6">
  import api from '../../api/api'
    export default {
    name:'self',
    data(){
        return{
            textlist:[
            {
                title:'去商店'

            },
            {
                title:'每日任务',
                prompt:'大波金币奖励'
            },
            {
                title:'领福包'
            },
            {
                title:'我的礼物',
            },
            {
                title:'关注Game公众号',
                prompt:'+500金币'
            },
            {
                title:'去评价Game'
            },
            {
                title:'发表 #Game说说#',
                prompt:'+800金币'
            },
            {
                title:'游戏规则',
                prompt:'新手必读'
            },
            {
                title:'功能更新日志'
            },
            {
                title:'绑定手机登录'
            }
            ],
            title:'个人主页'
        }
    },
    mounted(){
        this.setTitle();
    },
    methods:{
        loginOut(){
            //退出登录
            api.signOut().then((response) =>{
                if(response)
                  alert('退出成功');
                  this.clearUserInfo();
                  this.$router.push('/login');

            })
        },
        clearUserInfo(){
                var currentUser = {
                    uid:null,
                    accout:null,
                     password:null,
                     nick:null,
                     ulevel:null,
                    gold:null,
                    flower:null,
                    portrait:null
                }
                this.$store.commit('updateUserInfo',currentUser);
            },
        setTitle(){
            this.$store.commit('updateTitle',this.title);
        }
    }
}
</script>