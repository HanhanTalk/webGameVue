<template>
  <div class="test animated fadeIn">
    
  </div>
</template>
<style>
    button{
      width:100px;
      height:50px;
      background:#ffffff;
    }
</style>
 <script type="text/javascript6">
export default {
  name:'rank',
  data(){
    return{
      title:'游戏排行榜'
    }
  },
  mounted(){
    this.setTitle();
  },
  methods:{
    setTitle(){
       this.$store.commit('updateTitle',this.title);
    }
  }
}
</script>