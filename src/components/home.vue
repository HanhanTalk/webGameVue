<template>
    <div class="page-warp">
        <myhead @transferEvent="setHide"></myhead>
        <userMenu :isHidden="isHide" @transferEvent="setHide"></userMenu>
         <router-view></router-view>
        <foot></foot>
    </div>
</template>
<style>
</style>
<script type='text/ecmascript6'>
import myhead from './head.vue'
import userMenu from './usermenu.vue'
import foot from './foot.vue'
export default {
  name:'home',
  components:{ 
      foot,
      myhead,
      userMenu
  },
  data(){
      return{
          isHide:true
      }
  },
  mounted(){
    this.$router.push({name:'game'});
  },
  methods:{
      setHide(e){
      this.isHide = e;
    }
  }
}

</script>

