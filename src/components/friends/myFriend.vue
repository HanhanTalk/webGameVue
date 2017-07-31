<template>
    <div class="page-list animated slideInRight">
        <ul>
            <li v-for="user in userlist" :key="user.id">
                <div class="floatL"><img :src="user.portrait"></div>
                <div class="page-list-item">
                    <div class="page-list-user txt">{{user.nick}}</div>
                    <span class="friend-state state-online">{{user.state}}</span>
                </div>
            </li>
        </ul>
    </div>

</template>
      
<script type="text/ecmascript6">
export default {
      name:'myFriend',
      data(){
          return {
              userlist:[
                  {
                      nick:'Hansir',
                      portrait:'./src/assets/userpic/user-02.jpg',
                      state:'在线',
                      comment:['今天好热啊'],

                  }
              ]
          }
      }
 }
</script>
      
<style>
    .friend-state{
        width:100px;
        height:40px;
        text-align: center;
        line-height: 40px;
        border-radius: 6px;
        color:#ffffff;
        font-size:26px;
        display: inline-block;
    } 
    .state-online{
        background:rgba(40,202,66,1);
    }
    .state-offline{
        background:#b6b6b6;
    }
    .state-ingame{
        background:rgba(207,71,47,1);
    }
</style>