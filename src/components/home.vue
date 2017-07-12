<template>
    <div>
        <userinfo></userinfo>
        <game></game>
    </div>
</template>
<style>
    /* header{
        height:50px;
        background:rgba(35,44,56,1);
    } */
</style>
<script type='ecmascript6'>
import userinfo from './userinfo.vue'
import game from './games/game.vue'
export default {
  name:'home',

  components:{ 
      userinfo,
      game
  }
}

</script>

