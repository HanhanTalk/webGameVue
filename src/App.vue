
<template>
  <div class="container">
    <myhead @transferEvent="setHide"></myhead>
    <router-view></router-view>
    <userMenu :isHidden="isHide" @transferEvent="setHide"></userMenu>
  </div>
</template>


 <script type='text/ecmascript6'>
 
import myhead from './components/head.vue'
import userMenu from './components/usermenu.vue'
export default {
  name:'App',
  components:{
    myhead,
    userMenu
  },
  data(){
    return {
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
body{
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin:0;
  padding:0;
  /* overflow:hidden;  */
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container{
    width: 100%;
    height: 100%;
    /* padding-top: 60px; */
    background: #2c3e50;
    box-sizing: border-box;
}
/* .main-box{
  text-align: center;
}
.btn{
  margin:15px 0;
  border:none;
  height:50px;
  width:200px;
  color:#ffffff;
  font-size:1em;
  outline:none;
}
.btn-circle{
  border-radius:10em; 
}
.color{
  background:#42b983;
}
.bg{
  border:2px solid #ffffff;
  background:transparent;
} */
h1, h2 {
  font-weight: normal;
  margin: 0;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline-block;
  margin: 0;
}

a {
  color: #42b983;
}
p{
  margin:0;
  padding:0;
}
.fixed-box{
    padding-top:60px;
    box-sizing: border-box;
}
</style>
