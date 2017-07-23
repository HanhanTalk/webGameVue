<template>
   <div class="main-box fixed-box" >
      <img src="../assets/logo.jpeg" alt="logo">
      <h1 class="title">Game</h1>
      <button type="button" class="btn btn-circle color" v-on:click="toLogin">
        账号安全登录
      </button>
      <button type="button" class="btn btn-circle bg" v-on:click="toReg">
        没有账号？立即注册
      </button>
    </div>
</template>
<style>
.main-box{
  height: 100%;
  text-align: center;
  background: rgba(2,39,59,1);
}
.main-box img{
  width:250px;
  height:auto;
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
.title{
  color:#ffffff;
}
</style>
<script type="text/ecmascript6">
export default {
  name:'landing',
  methods:{
    toLogin(){
      this.$router.push('/login');
    },
    toReg(){
      this.$router.push('/reg');
    }
  }
}
</script>


