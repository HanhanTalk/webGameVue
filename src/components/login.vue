<template>
    <div class="login" id="login">
        <div class="input-head">
            <h1>用户登录</h1>
        </div>
        <div class="input-user">
            <div class="left">
                <div class="input-box">
                    <span class="fa fa-user"></span>
                    <input type="text" class="input"  v-model="accout">
                </div>
                <div class="input-box">
                    <span class="fa fa-lock"></span>
                    <input type="password" class="input" v-model="password">
                </div>
            </div>
            <div class="right">
                <button type="button" class="input-btn btn-red" @click="loginBtn"><span class="fa fa-unlock"></span></button>
            </div>
            <a href="javascript:;" class="input-link">忘记了密码？</a>
        </div>
        <!-- <loading v-if="isLoging"></loading> -->
    </div>
</template>
<style>
    .login{
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
    margin-top: 20px;
    font-size:1em;
    }
    .btn-red{
        background:#F44336;
    }
    .input-link{
    position: absolute;
    bottom: 50px;
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
</style>
<script type = "text/ecmascript6">
    import userinfoData from '../data/userinfo'
    import '../script/sha1.min.js'
    import axios from 'axios'
    // import loading from './loading.vue'
    //引入mapGtters
    // import { mapGetters } from 'vuex'
    var userinfo = userinfoData;
    export default {
        name:'login',
        data(){
            return{
                accout:'',
                password:'',
                userinfo
            }

        },
        methods:{
            loginBtn(){
                //判断是否输入
                if(this.username != '' && this.password != ''){
                   this.loginIn(); 
                } else{
                    alert("用户名或密码不能为空！");
                }
            },
            loginIn(){
                //本地数据测试代码段
                var _this = this;
                var _element = {};
                var _ele = document.getElementsByTagName('input');
                let hasUser = false;

             for(var i = 0;i<_this.userinfo.length;i++){
                    if(_this.userinfo[i].accout === _this.accout){
                        if(_this.userinfo[i].password === _this.password){
                            _element = userinfo[i];
                            _this.getUserInfo(_element);
                            alert('登录成功！');
                            this.$router.push('./home/game/');
                            hasUser = true;
                            break;
                        } else {
                                _ele[1].value ='';
                                alert('密码错误');
                        }
                        hasUser = true;
                    }
                }
                if(!hasUser){
                    alert('用户名不存在');
                }
                _ele[0].value = '';
                _ele[1].value = '';

            //     //将密码进行hash加密
            //         let password_sha = hex_sha1(hex_sha1( this.password ));
            //     //需要向后端发送的登录参数
            //         let loginParam = {
            //             accout:this.accout,
            //             password_sha
            //         }
            //     //请求后端
            //   axios.get()



             },
            //获取登录用户的数据
            getUserInfo(element){
                var currentUser = element;
                this.$store.commit('updateUserInfo',currentUser);
            
            },
            

        }
    }
</script>

