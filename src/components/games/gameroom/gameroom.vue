<template>
    <div>
        <myhead @transferEvent="setHide"></myhead>
        <userMenu :isHidden="isHide" @transferEvent="setHide"></userMenu>
         <router-view></router-view>
    </div>
</template>
 <script type="text/ecmascript6">
    import myhead from '../../head.vue'
    import userMenu from '../../usermenu.vue'
export default {
    name:'gameroom',
    components:{
        myhead,
        userMenu
    },
     data(){
      return{
          isHide:true
      }
  },
  methods:{
      setHide(e){
      this.isHide = e;
    }
  }
}
</script>
<style>

</style>


