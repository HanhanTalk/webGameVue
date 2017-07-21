<template>
  <div class="test">
    <button @click="test">test</button>
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
  import foot from './foot.vue'
  import client from '../api/client'
export default {
  name:'rank',
  data(){
    return{
      client
    }
  },
  components:{
      foot
  },
  methods:{
    test(){
      var msg = 'hello';
      client.test2(msg);
    }
  }
}
</script>