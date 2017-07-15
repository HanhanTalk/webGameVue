<template>
   <a class="back-btn" v-on:click="back"><span class="fa fa-angle-left"></span>返回</a>
</template>
<style>
    .back-btn{
        position: absolute;
        top:10%;
        font-size:20px;
        text-decoration: none;
        filter:invert(10%);
        z-index: 1000;
    }
    .back-btn span{
        margin-right:5px;
    }
</style>
<script type="text/ecmascript6">
export default {
  name:'backBtn',
  methods: {
      back() {
          this.$router.back()
      }
  }
}
</script>


