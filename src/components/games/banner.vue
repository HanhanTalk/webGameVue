<template>
  <div class="banner">
    <span class="banner-icon fa fa-volume-up"></span>
    <marquee behavior="scroll" scrollamount="5" class="banner-txt">{{bannerTxt}}</marquee>
  </div>
</template>
<style>
    .banner{
        height:80px;
        background:rgba(19,22,29,1);
        position: relative;
        box-sizing: border-box;
        padding: 20px;
        color:#ffffff;
        z-index:10;

    }
    .banner-icon{
        display: block;
        float: left;
        width:40px;
        height:40px;
        text-align: center;
        line-height: 40px;
        border-radius:20px; 
        background:rgba(65,170,28,1);
        font-size: 30px;
    }
    .banner-txt{
        width: 90%;
        font-size: 30px;
    }
</style>
<script>
export default {
  name:'banner',
  data(){
    return{
        bannerTxt:'本周五我们进行了一次版本大更新，可能会有部分手机出现问题'
    }
  }
}
</script>

