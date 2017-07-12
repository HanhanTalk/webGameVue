<template>
   <div class="btn-box">
      <h1 class="title">Game</h1>
      <button type="button" class="btn btn-circle color" v-on:click="toLogin">
        账号安全登录
      </button>
      <button type="button" class="btn btn-circle bg" v-on:click="toReg">
        没有账号？立即注册
      </button>
    </div>
</template>
<script type="text/ecmascript6">
export default {
  name:'index',
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


