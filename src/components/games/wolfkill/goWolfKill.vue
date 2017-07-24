<template>
  <div class="wolfroom">
     <div class="chooselist fixed-box">
         <div class = "game-info">
             <p>萌新玩家可以先查看规则<a href="javascript:;" @click="gameInfo">了解狼人杀</a></p>
        </div>
         <div v-for="item in data" :key="item.id" class="list-item" @click="goRoom(item)">
             <div class="list-caption">
                 <h1>{{item.title}}</h1>
                 <b>PvP</b>
                 <p>—— {{item.remark}} ——</p>
             </div>
         </div>
          <!-- <div class="list-item">
             <div class="list-caption">
                 <h1>12人局</h1>
                 <b>PvP</b>
                 <p>——标准对决——</p>
             </div>
         </div>
         <div class="list-item">
             <div class="list-caption">
                 <h1>大师赛</h1>
                 <b>PvP</b>
                 <p>——高手竞技——</p>
             </div>
         </div>  -->
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
        /* overflow: hidden; */
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
        float: right;
        padding: 30px;
        text-align: center;
    }
    /* .bg-basic{
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
    } */
    .chooselist div:nth-child(2){
        background:url('../../../assets/game-img/basic.jpeg') no-repeat;
        background-size:150px auto; 
        background-color:#ffffff;
        color:#2b2b2b;
    }
    .chooselist div:nth-child(3){
        background:url('../../../assets/game-img/normal.jpeg') no-repeat;
        background-size:100% 100%;
        color:#ffffff;
    }
    .chooselist div:nth-child(4){
        background:url('../../../assets/game-img/master.jpeg') no-repeat;
        background-size:100% 100%;
        color:#cccccc;
     }
  </style>
 <script type="text/ecmascript6">
//  import backBtn from './backbtn.vue'
 import client from '../../../api/client'
export default {
    name:'gowolf',
    data(){
        return{
            data:[
                {title:'8人局',remark:'萌新试炼',people:8},
                {title:'10人局',remark:'标准对决',people:10},
                {title:'大师赛',remark:'高手竞技',people:12}
            ],
            client
        }
    },
    methods:{
        gameInfo(){
            this.$router.push({path: '/gowolf/gameinfo'});
        },
        goRoom(e){
            switch(e.people){
                case 8:
                    client.peopleNum(8)
                    break;
                case 10:
                    client.peopleNum(10)
                    break;
                default:
                    client.peopleNum(12)
            }
            this.$router.push({path:'/waitRoom'})
        }
    }
}
</script>


