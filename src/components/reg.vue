
<template>
    <div class="reg" id="reg">
        <div class="input-head">
            <h1>用户注册</h1>
        </div>
        <div class="input-user">
            <div class="left">
                <div class="input-user-box">
                    <span class="fa fa-user"></span>
                    <input type="text" placeholder="请输入你的账号" class="input" v-model="accout">
                </div>
                <div class="input-user-box">
                    <span class="fa fa-lock"></span>
                    <input type="password" placeholder="请输入1-6位密码" class="input" v-model="password">
                </div>
            </div>
            <div class="right">
                <button type="button" class="input-btn btn-blue" v-on:click="regBtn"><span class="fa fa-hand-pointer-o"></span></button>
            </div>
            <a href="javascript:;" class="input-link" v-on:click="regLink">已有账号，立即登录</a>
        </div>
    </div>
</template>
<style>
    .reg{
       padding-top: 400px;
    }
    .btn-blue{
        background: #2196F3;
    }
    .input-head h1{
        font-size:48px;
        color:#ffffff;
        margin-left:15%;
    }
    .input-user{
    width: 80%;
    height: 400px;
    position: relative;
    margin: 0 auto;
    }
    .left{
    position: absolute;
    left: 0;
    top: 0;
    }
    .right{
    position: absolute;
    right:0;
    top:0;
    }
    .input{
    border-radius: 0 8px 8px 0;
    border: none;
    height: 80px;
    width: 330px;
    box-sizing: border-box;
    padding-left: 20px;
    font-size: 40px;
    }
    .input-btn{
    width:120px;
    height: 200px;
    border: none;
    border-radius: 8px;
    color: #ffffff;
    margin-top: 40px;
    font-size:40px;
    }
    .btn-red{
        background:#F44336;
    }
    .input-link{
    font-size: 36px;
    position: absolute;
    bottom: 50px;
    right: 0;
    }
    .input-user-box{
        height:80px;
        margin:40px auto;
    }
    .input-user-box span{
        width: 80px;
        height: 80px;
        display: block;
        float: left;
        border-radius: 8px 0 0 8px;
        color: #ffffff;
        font-size: 40px;
        text-align: center;
        line-height: 80px;
        background: #cccccc;
    }
</style>
<script type = "text/ecmascript6">
    import api from '../api/api'
    export default {
        name:'reg',
        data(){
          return{
            accout:'',
            password:'',
          }  
        },
        methods:{
            regBtn(){
              if (!this.accout || !this.password) {
                  return alert("请输入用户名和密码");
              }
              api.signUp({
                  name: this.accout,
                  password: this.password
              }).then((response) => {
                  if (response) {
                      alert("注册成功");
                      this.regLink();
                  }
              })
            },
            regLink(){
              this.$router.push('/login');
            }
        }
    }
</script>