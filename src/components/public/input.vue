<template>
  <div class="input-box in-bottom">
      <div class="input-ctrl-group">
        <button @click="clickInput" type="button" class="input-ctrl-btn circle retato">
            <span class="fa" :class="[manner ? 'fa-rss' : 'fa-pencil']"></span>
        </button>
        <input class="input-middle-style" type="text" v-if="manner" v-model="answerValue" placeholder="请输入你的答案">
        <button class="input-middle-style input-speak" type="button" v-if="!manner">按住说话</button>
        <button @click="clickSend" type="button" class="input-ctrl-btn circle">
            OK
        </button>
      </div>
        <!-- <div class="moreMenu" :class="{ 'moreMenu-hide':menuHide }">
            <ul>
                <li v-for="item in btnList" :key="item.id"><img :src="item.imgurl" alt="发图片"><span>{{item.name}}</span></li>
            </ul>
        </div>   -->
  </div>    
</template>
<script type="text/ecmascript6">
export default {
    name:'textInput',
    data(){
        return{
            manner:false,
            answerValue:''
            // menuHide:true,
            // btnList:[
            //     {
            //         imgurl:'./src/assets/input-img/img.png',
            //         name:'发图片'
            //     },
            //      {
            //         imgurl:'./src/assets/input-img/egg.png',
            //         name:'扔鸡蛋'
            //     },
            //      {
            //         imgurl:'./src/assets/input-img/rose.png',
            //         name:'送鲜花'
            //     },
            //      {
            //         imgurl:'./src/assets/input-img/sign_out.png',
            //         name:'退出'
            //     },
            // ]

        }
    },
    mounted(){
    },
    methods:{
        clickInput(){
            if(this.manner){
                this.manner = false;
            } else{
                this.manner = true;
            }
        },
        clickSend(){
            this.$emit('answerEvent',this.answerValue);
            this.answerValue = "";
            // if(this.menuHide){
            //     this.menuHide = false;
            // } else{
            //     this.menuHide = true;
            // }
        }
    }

}
</script>
<style>
    .input-box{
        background: #dddddd;
        width: 100%;
    }
    .in-bottom{
        position: absolute;
        bottom:0;
    }
    .input-ctrl-group{
        height: 140px;
        width: 700px;
        box-sizing: border-box;
        padding: 30px 0;
        margin: 0 auto;
    }
    .input-ctrl-group button{
        outline: none;
    }
    .input-ctrl-btn{
        width:80px;
        height:80px;
        background:#ffffff;
        border:2px solid #b6b6b6;
        font-size:38px;
        color:#b6b6b6;
    }
    .retato{
         transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
         -moz-transform: rotate(45deg);
          -o-transform: rotate(45deg);
    }
    .input-ctrl-group input{
        height: 70px;
        width: 500px;
        background:#f1f1f1;
    }
    .input-middle-style{
        border: 2px solid #b6b6b6;
        margin: 0 10px;
        position: relative;
        top: -2px;
        border-radius: 10px;
        font-size:32px;
    }
    .input-speak{
        height: 80px;
        width: 506px;
    }
    /* .moreMenu{
        height:150px;
        border-top: 2px solid #727272;
        transition: height 0.5s;
        -webkit-transition: height 0.5s;
        -o-transition: height 0.5s;
        -moz-transition: height 0.5s;
    }
    .moreMenu ul{
        width:90%;
        margin: 20px auto;
    }
    .moreMenu li{
        margin: 0 34px;
        text-align: center;
        font-size:22px;
    }
    .moreMenu img{
        width: 100px;
        height:100px;
        display: block;
    }
    .moreMenu-hide{
        height: 0px;
    } */
</style>

