<template>
    <div class="page-list">
        <ul>
            <li>
                <div class="floatL"><img src="../games/game-info-img/001.jpeg"></div>
                <div class="page-color-line floatL"></div>
                <div class="page-list-item">
                    <div class="page-list-user">Hansir</div>
                    <span class="friend-state state-offline">离线</span>
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
              friendList:[
                  {
                      username:'Hansir',
                      comment:['今天好热啊']
                  }
              ]
          }
      }
 }
</script>
      
<style>
    .friend-state{
        display: inline-block;
        width:50px;
        height:20px;
        text-align: center;
        line-height: 20px;
        border-radius: 4px;
        color:#ffffff;
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