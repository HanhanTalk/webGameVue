
<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>


<script type='text/ecmascript6'>
import index from './components/index.vue'
import login from './components/login.vue'
import reg from './components/reg.vue'
export default {
  name:'App',
  
}
</script>

<style>
body{
  margin: 0;
  padding:0;
  overflow:hidden; 
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
  background:#2c3e50;
}
.btn-box{
  padding:58% 0;
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
}
h1, h2 {
  font-weight: normal;
  margin: 0;
}
.title{
  color:#ffffff;
  margin-bottom: 40px;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
p{
  margin:0;
  padding:0;
}
</style>
