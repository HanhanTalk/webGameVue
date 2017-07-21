<template>
  <div class="page">
      <div class="self-info">
          <img src="../assets/user.jpeg">
          <div class="self-info-middle">
            <p>{{$store.state.userInfo.nick}}</p>
            <span>{{$store.state.userInfo.accout}}</span>
            <div class="self-level"><p>LV{{$store.state.userInfo.ulevel}}<span>136/230</span></p></div>
          </div>
          <div class="qr-code"><a href="javascript:;"><span class="fa fa-qrcode"></span></a></div>
      </div>
      <hr>
      <div class="res">
         <ul>
             <li><img src="../assets/gold.jpeg" alt="gold"><span>{{$store.state.userInfo.gold}}</span></li>
             <li><img src="../assets/hua.jpg"><span>1</span></li>
             <li><img src="../assets/10.png" alt="diamond"><span>0</span></li>
        </ul>
      </div>
      <div class="self-choose-list">
        <ul>
            <li v-for="item in textlist" :key="item.id" :class="{'li-boder':item.title === '关注Game公众号'}">
                {{item.title}}
                <span class="self-list-prompt">{{item.prompt}}<span class="fa fa-angle-right"></span></span>
            </li>
             <li class="self-li-last li-boder"><a href="javascript:;" @click="toLoginOut"></a>退出手机登录</li> 
        </ul>
      </div>
      <foot></foot>
  </div>
</template>
  <style>
    hr{
        border: 1px solid #dddddd;
    }
     .page{
        width:100%;
        height:100%;
        padding-bottom: 100px;
        background: #f3f3f3;
        position: relative;
     }
     .self-info{
        position: relative;
        margin:0 15px;
     }
     .self-info img{
        width: 80px;
        height: 80px;
        float: left;
        margin: 10px 0;
        border:1px solid #727272;
     }
     .self-info-middle{
        height: 100px;
        box-sizing: border-box;
        padding: 8px 90px;
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
         height:30px;
         font-size:30px;
         position: absolute;
         top:50%;
         right:20px;
         margin-top:-15px;
     }
     .res{
        border-bottom: 4px solid #dddddd;
     }
     .res img{
        width:20px;
        height:auto;
        border-radius: 10px;
     }
     .res span{
         position:relative;
         left:5px;
         top:-3px;
     }
    .self-choose-list{
        
    }
    .self-choose-list li{
        height: 40px;
        margin: 0;
        display: block;
        box-sizing: border-box;
        padding: 0 10px;
        line-height: 40px;
        border-bottom: 1px solid #cccccc;
        position: relative;
    }
    .self-li-last{
        height: 44px;
        text-align: center;
    }
    .li-boder{
         border-top:4px solid #dddddd;
    }
    .self-list-prompt{
        position: absolute;
        right:10px;
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
  import foot from './foot.vue'
    export default {
    name:'self',
    components:{ foot },
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
            ]
        }
    },
    methods:{
        toLoginOut(){
            //删除cookie并跳到登录页

        }
    }
}
</script>