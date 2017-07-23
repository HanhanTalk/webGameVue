
<template>
    <div class="reg" id="reg">
        <div class="input-head">
            <h1>用户注册</h1>
        </div>
        <div class="input-user">
            <div class="left">
                <div class="input-box">
                    <span class="fa fa-user"></span>
                    <input type="text" placeholder="用户名" class="input" v-model="accout">
                </div>
                <div class="input-box">
                    <span class="fa fa-lock"></span>
                    <input type="text" placeholder="密码" class="input" v-model="password">
                </div>
            </div>
            <div class="right">
                <button type="button" class="input-btn btn-blue" v-on:click="regBtn">注册</button>
            </div>
            <a href="javascript:;" class="input-link" v-on:click="regLink">已有账号，立即登录</a>
        </div>
    </div>
</template>
<style>
    .reg{
       padding-top: 200px;
    }
     .input-head h1{
        font-size:1.5em;
        color:#ffffff;
        margin-left:15%;
    }
    .input-user{
    width: 80%;
    height: 200px;
    position: relative;
    margin: 0 auto;
    }
    .left{
    float: left;
    }
    .right{
    float: right;
    }
    .input{
    border-radius: 0 4px 4px 0;
    border: none;
    height: 40px;
    width: 165px;
    box-sizing: border-box;
    padding-left:5px;
    font-size:1em;
    }
    .input-btn{
    width:60px;
    height: 100px;
    border: none;
    border-radius: 4px;
    color: #ffffff;
    margin-top: 22px;
    font-size:1em;
    }
    .input-link{
    position: absolute;
    bottom: 50px;
    width: 150px;
    right: 0;
    }
    .input-box{
        height:40px;
        margin:20px auto;
    }
    .input-box span{
        display: block;
        float:left;
        width: 40px;
        background:#cccccc;
        height:40px;
        border-radius: 4px 0 0 4px;
        color:#ffffff;
        font-size: 1.5em;
        text-align: center;
        line-height: 40px;
    } 
    .btn-blue{
        background: #2196F3;
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