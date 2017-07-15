<template>
  <div class="wolfroom">
     <div class="chooselist">
         <div class = "game-info">
             <p>萌新玩家可以先查看规则<a href="javascript:;" @click="gameInfo">了解狼人杀</a></p>
        </div>
         <div class="list-item bg-basic">
             <div class="list-caption">
                 <h1>6人局</h1>
                 <b>PvP</b>
                 <p>——萌新试炼——</p>
             </div>
         </div>
         <div class="list-item bg-normal">
             <div class="list-caption">
                 <h1>12人局</h1>
                 <b>PvP</b>
                 <p>——标准对决——</p>
             </div>
         </div>
         <div class="list-item bg-master">
             <div class="list-caption">
                 <h1>大师赛</h1>
                 <b>PvP</b>
                 <p>——高手竞技——</p>
             </div>
         </div>
     </div>
     
  </div>
</template>
 <style scoped>
    .wolfroom{
        padding:0 10px;
        height: 100%;
        overflow: hidden;
        background: rgba(70,74,165,1);
    }
    .chooselist{
        position: relative;
        overflow: hidden;
        padding-top: 10px;
    }
    .game-info{
        width: 90%;
        height:40px;
        background: rgba(0,0,0,0.3);
        margin: 15px auto;   
        border-radius: 20px; 
        text-align: center;
        line-height: 40px;
        color:#ffffff;
    }
    .list-item{
        height:150px;
        width:100%;
        margin-bottom:2px; 
    }
    .list-caption{
        width: 40%;
        float: right;
        padding: 30px;
        text-align: center;
    }
    .bg-basic{
        background:url('./games/game-img/basic.jpeg') no-repeat;
        background-size:150px auto; 
        background-color:#ffffff;
        color:#2b2b2b;
    }
    .bg-normal{
        background:url('./games/game-img/normal.jpeg') no-repeat;
        background-size:100% 100%;
        color:#ffffff;
    }
    .bg-master{
         background:url('./games/game-img/master.jpeg') no-repeat;
        background-size:100% 100%;
        color:#cccccc;
    }
  </style>
 <script type="text/ecmascript6">
 import backBtn from './backbtn.vue'
export default {
    name:'gowolf',
    methods:{
        gameInfo(){
            this.$router.push({path: '/gowolf/gameinfo'});
        }
    }
}
</script>


