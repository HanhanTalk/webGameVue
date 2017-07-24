<template>
  <div>
      find
  </div>
</template>
 <script type="text/javascript6">
export default {
  name:'find',
  data(){
    return{
      title:'好玩游戏圈'
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