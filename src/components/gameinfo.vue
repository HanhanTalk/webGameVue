<template>
        <div>
            <div class="game-intro-head">
            </div> 
            <div class="game-intro-item" v-for="(item,index) in introduce" :key="item.id">
                    <div class="game-intro-text" :class="{'game-intro-right':index%2===0,'game-intro-left':index%2 !== 0}">
                    <h2>{{item.title}}</h2>
                    <p><b>{{item.status}}</b>--{{item.content}}</p>
                </div>
                <img :class="{'game-intro-left':index%2===0,'game-intro-right':index%2 !== 0}" :src="item.imgurl">
            </div> 
        </div>
</template>
<style scoped>
    body {
        overflow-y: scroll;
    }
    /* .game-intro{
        width: 100%;
        background:#202020;
        overflow-y: scroll;
    } */
     .game-intro-head{
        width:100%;
        height:370px;
        padding:15px 0; 
        background:url('./games/game-info-img/intro.jpg') no-repeat;
        background-size:100% auto; 
    } 
    .game-intro-head h1{
        color:antiquewhite;
        text-shadow: 2px 0px 10px wheat;
    }
    .game-intro-item{
        height:220px;
        position: relative;
        background:rgba(25,17,15,1);
        border-bottom:2px solid #cccccc; 
    }
    .game-intro-item img{
        width:150px;
        height:150px;
        position: absolute;
        top:-20%;
        border-radius: 4px 0;
    }
    .game-intro-text{
        width:50%;
        padding: 5px;
        position: absolute;
        top:10px;
    }
    .game-intro-text h2{
        font-size:18px;
        color:rgba(255,219,126,1);
        text-shadow:0px 0px 2px rgba(255,230,0,1);
    }
    .game-intro-text p{
        color:antiquewhite;
    }
    .game-intro-left{
        left:3%;
    }
    .game-intro-right{
        right:3%;
    }
</style>

<script type="text/ecmascript6">
export default {
  name:'gameinfo',
  mounted: () => {
    console.log('gameinfo')
  },
  data(){
      return{
          introduce:[
              {
                  status:'预言家',
                  imgurl:'./src/components/games/game-info-img/001.jpeg',
                  title:'契约签订的那一刻,就注定了我的孤独。',
                  content:'每天晚上可以查看一位玩家的身份是好人还是狼人。'
              },
              {
                  status:'女巫',
                  imgurl:'./src/components/games/game-info-img/002.jpeg',
                  title:'没错，是曼陀罗的味道！',
                  content:'女巫拥有两瓶药，解药可以救活一名当晚被杀害的玩家，毒药可以毒杀一名玩家，一晚只能使用一瓶药。'
              },
              {
                  status:'猎人',
                  imgurl:'./src/components/games/game-info-img/003.jpeg',
                  title:'猎枪的准星已经锁定了你的头颅！',
                  content:'当且仅当猎人被狼人杀害或被投票放逐时，猎人可以亮出自己的身份牌并指定枪杀一名玩家。'
              },
              {
                  status:'白痴',
                  imgurl:'./src/components/games/game-info-img/004.jpeg',
                  title:'这个世界，有趣的灵魂太少了，哈哈哈哈',
                  content:'白痴若是被投票出局，可以翻开自己的身份牌，免疫此次放逐，之后可以正常发言'
              },
              {
                  status:'狼人',
                  imgurl:'./src/components/games/game-info-img/005.jpeg',
                  title:'把所有的苦难，返还给你们',
                  content:'每天夜里可以杀死一个人'
              },
              {
                 status:'村民',
                 imgurl:'./src/components/games/game-info-img/006.jpeg',
                 title:'天黑我就闭眼睡，天亮再说投死谁',
                 content:'没有特殊能力，吃瓜群众'
              },
              {
                 status:'守卫',
                 imgurl:'./src/components/games/game-info-img/007.jpeg',
                 title:'凡村中一人身亡，便为我的责任',
                 content:'每晚可以守护一个人，但不能连续两晚守护同一个人，被守卫的人当晚不会被狼人杀害，如果守卫的角色同时吃到女巫解药，则该角色死亡'
              },
              {
                 status:'丘比特',
                 imgurl:'./src/components/games/game-info-img/008.jpeg',
                 title:'生命诚可贵，爱情价更高！',
                 content:'丘比特在第一天晚上指定任意两个人使他们成为情侣，当两个相爱的人其中一个死亡，另一个人则必须殉情。情侣之间永远不能互票互杀。'
              }
          ]
      }
  }
}
</script>

