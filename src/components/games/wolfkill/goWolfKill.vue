<template>
  <div class="page-warp wolfroom">
     <div class="chooselist fixed-box">
         <div class = "game-info font-middle">
             <p>萌新玩家可以先查看规则<a href="javascript:;" @click="gameInfo">了解狼人杀</a></p>
        </div>
         <div v-for="item in data" :key="item.id" class="list-item" @click="goRoom(item)">
             <div class="list-caption">
                 <h1 class="font-big">{{item.title}}</h1>
                 <b class="font-middle">PvP</b>
                 <p class="font-small">—— {{item.remark}} ——</p>
             </div>
         </div>
     </div>
  </div>
</template>
 <style scoped>
    .wolfroom{
        background: rgba(70,74,165,1);
    }
    .chooselist{
        position: relative;
        /* overflow: hidden; */
    }
    .game-info{
        width: 90%;
        height: 60px;
        background: rgba(0,0,0,0.3);
        margin: 15px auto;
        margin-bottom: 100px;
        border-radius: 30px;
        text-align: center;
        line-height: 60px;
        color: #ffffff;
    }
    .list-item{
        height:300px;
        width:100%;
        margin-bottom:5px; 
    }
    .list-caption{
        float: right;
        text-align: center;
        height:300px;
        width:300px;
        box-sizing: border-box;
        padding: 70px 0;
    }
    .chooselist div:nth-child(2){
        background:url('../../../assets/game-img/basic.jpeg') no-repeat;
        background-size:300px auto; 
        background-color:#ffffff;
        color:#2b2b2b;
    }
    .chooselist div:nth-child(3){
        background:url('../../../assets/game-img/normal.jpeg') no-repeat;
        background-size:100%;
        color:#ffffff;
    }
    .chooselist div:nth-child(4){
        background:url('../../../assets/game-img/master.jpeg') no-repeat;
        background-size:100%;
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
                    // 先跳转到狼人杀房间
                    // TODO 这里房间号应该是服务器返回
                    this.$router.push({name: 'wolfRoom', params:{id: 123}});
                    //client.peopleNum(8)
                    break;
                case 10:
                    client.peopleNum(10)
                    break;
                default:
                    client.peopleNum(12)
            }
            this.$router.push({name:'wolfRoom',params:{ id:123}});
        }
    }
}
</script>


