
<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>


 <script type='text/ecmascript6'>

export default {
  name:'App',
  mounted(){
    this.$store.commit('updateTitle','Game');
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
.txt{
    font-size: 40px;
}
.txt-2{
    font-size: 30px;
    color:#dddddd;
}
.fixed-box{
    padding-top:120px;
    box-sizing: border-box;
}
</style>
