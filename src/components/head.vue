<template>
  <div class="head">
    <div class="head-bars ib"><a href="javascript:;" v-on:click="menuClick"><span class="fa fa-bars"></span></a></div>
    <div class="head-logo ib">{{$store.state.title}}</div>
    <div class="head-share ib"><span class="fa fa-share-alt"></span></div>
  </div>
</template>
<style>
    .head{
    width: 100%;
    height: 120px;
    z-index: 1000;
    position: fixed;
    top: 0;
    background: rgba(47,59,73,1);
    padding: 0 30px;
    box-sizing: border-box;
    color: #ffffff;
    font-size: 50px;
    text-align: center;
    line-height: 120px;
    }
    .head a{
        color:#ffffff;
    }
    .ib{
        display: inline-block;
    }
    .head-logo{
        text-align: center;
    }
    .head-bars{
        float:left;
    }
    .head-share{
        float:right;
    }
    .head-hidden{
        display: none;
    }
</style>
<script type='text/ecmascript6'>
import userMenu from './usermenu.vue'
export default {
  name:'myhead',
  data(){
    return {
        isHidden:false,
        headHide:false
    }
  },
  methods:{
      menuClick(){
        this.$emit('transferEvent',this.isHidden);
      }
  }
}
</script>

