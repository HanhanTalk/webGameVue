<template>
    <div class="box">
        <!-- <myhead></myhead> -->
        <userinfo></userinfo>
        <game></game>
        <foot></foot>
    </div>
</template>
<style>
   .box{
       position: relative;
   }
</style>
<script type='text/ecmascript6'>
import userinfo from './userinfo.vue'
import game from './games/game.vue'
import foot from './foot.vue'
export default {
  name:'home',

  components:{ 
      userinfo,
      game,
      foot
  }
}

</script>

