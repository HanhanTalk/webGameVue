<template>
  <div class="page-warp">
    <div class="room-warp">
      <!--游戏提示 -->
      <div class="game-sys-tips" v-if="flowStatus !== 0">
        <h1>
          <span class="fa" :class="[onNight ? 'fa-moon-o' : 'fa-sun-o']"></span>
          {{sysTips.title}}(第{{gameRound}}天)
        </h1>
        <p class="txt-2">{{sysTips.content}}</p>
        <div class="time">{{sysTips.time}} S</div>
      </div>
      <!--玩家投票 -->
      <div class="page-warp page-mask" v-if="flowStatus === 7">
          <div class="page-small-box">
            <div class="page-small-box-head">
              <img src="../../../assets/game-img/vote.jpeg">
              <h1>你要投给谁？</h1>
            </div>
            <div class="page-small-box-content">
              <ul>
                <li class="small-box-userpic" v-for="(item,index) in playerlist" :key="item.id" v-if="item.alive === true">
                  <span>{{item.seat}}</span>
                </li>
              </ul>
            </div>

          </div>
      </div>  
      <!--身份信息-->
      <div class="game-msg-head">
        <p class="font-middle">你的身份：{{currentObj.name}}</p>
      </div>
      <!--玩家列表-->
      <div class="wolfroom-userlist">
        <ul class="fLeft">
          <li v-for="(item,index) in playerlist_1" :key="item.id">
            <img :src="item.portrait">
            <span>{{index+1}}</span>
            <div class="pic-mask wrap">
            </div>
          </li>
        </ul>
        <ul class="fRight">
          <li v-for="(item,index) in playerlist_2" :key="item.id" v-if="item">
            <!-- <img src="../../../assets/userpic/anonym.jpg"> -->
            <div v-if="item.uid">
              <img :src="item.portrait">
              <span>{{index+8}}</span>
              <div class="pic-mask wrap death">
              </div>
            </div>
            <div v-if="item == 'nobody'">
              <img src="../../../assets/userpic/anonym.jpg">
            </div>
          </li>
        </ul>
      </div>
      <!--技能玩家操作栏-->
      <div class="page-warp page-mask" v-if="flowStatus === 1">
        <!--狼人操作栏-->
        <div class="page-small-box ">
          <div class="page-small-box-head">
            <img src="../../../assets/game-img/wolfkill.jpeg">
            <h1>嘿嘿～请选择你要杀掉的玩家</h1>
          </div>
          <div class="page-small-box-content">
            <ul>
              <li @click="Kill(item.seat)" class="small-box-userpic" :class="{'small-box-fix':false}" v-for="(item,index) in playerlist" :key="item.id" v-if="item.alive == true">
                <span>{{item.seat}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--女巫操作栏 -->
      <div class="page-warp page-mask" v-if="flowStatus === 2">
        <div class="page-small-box">
          <div class="page-small-box-head">
            <img src="../../../assets/game-img/lvwu.jpeg">
            <h1>今天晚上他死了，你要救他吗？</h1>
          </div>
          <div class="page-small-box-content">
            <div class="small-box-item">
              <span class="small-box-item-border">{{killsb[0]}}</span>
            </div>
            <div class="box-btn-group">
              <button @click="save(killsb[0])" type="button" class="btn btn-col3" v-if="witch.save">救</button>
              <button type="button" class="btn btn-col4">不救</button>
            </div>
          </div>
        </div>
      </div>
      <div class="page-warp page-mask" v-if="flowStatus === 3">
        <div class="page-small-box">
          <div class="page-small-box-head">
            <img src="../../../assets/game-img/lvwu.jpeg">
            <h1>你有一瓶毒药，你要毒死谁？</h1>
  
          </div>
          <div class="page-small-box-content">
            <ul>
              <li @click="Kill(item.seat)" class="small-box-userpic" v-for="item in playerlist" :key="item.id" v-if="item.alive == true">
                <span>{{item.seat}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--预言家操作栏 -->
      <div class="page-warp page-mask" v-if="flowStatus === 4">
        <div class="page-small-box">
          <div class="page-small-box-head">
            <img src="../../../assets/game-img/yuyan.jpeg">
            <h1 v-if="!look">你要查看谁的身份？</h1>
            <h1 v-if="look">他的身份是...</h1>
          </div>
          <div class="page-small-box-content">
            <ul v-if="!look">
              <li @click="LookIdCard(item)" class="small-box-userpic" v-for="item in playerlist" :key="item.id" v-if="item.sign == false">
                <span>{{item.seat}}</span>
              </li>
            </ul>
            <div class="small-box-item" v-if="look">
              <span class="font-small" v-if="playerIdCard !== 4">好人</span>
              <span class="font-small" v-if="playerIdCard == 4">狼人</span>

            </div>
          </div>
  
        </div>
      </div>
      <!--猎人操作栏-->
        <div class="page-warp page-mask" v-if="false">
          <div class="page-small-box">
            <div class="page-small-box-head">
              <img src="../../../assets/game-img/lieren.jpeg">
              <h1>选择你要带走的玩家</h1>
            </div>
            <div class="page-small-box-content">
              <ul>
                <li class="small-box-userpic" :class="{'small-box-fix':false}" v-for="item in 6" :key="item.id">
                  <img src="../../../assets/userpic/anonym.jpg">
                </li>
              </ul>
            </div>
          </div>
        </div>
      <!--身份牌-->
      <div class="page-warp page-mask" v-if="flowStatus === 0">
        <div class="rotate-item">
          <div class="idcardShow animated flip">
            <img :src="currentObj.url">
          </div>
        </div>
      </div>
      <div class="upper-top">
        <img :src="currentObj.url">
      </div>
      <textInput @answerEvent="receiveInfo"></textInput>
      <button type="button" @click="next" class="test">下一步</button>
    </div>
  </div>
</template>
 <script type="text/ecmascript6">
import wolf from '../../../api/game/wolf'
import textInput from '../../public/input.vue'
export default {
  name: 'wolfRoom',
  components: { textInput },
  data() {
    return {
      playerlist: [],
      playerlist_1: [],
      playerlist_2: [],
      flowStatus: 0,
      title: '狼人杀123号房间',
      currentUser: {},        //当前玩家
      gameRound: 1,           //游戏回合数
      playerIdCard:null,
      //系统提示
      sysTips: {
        title: '',
        content: '',
        time: null
      },
      //夜晚／白天
      onNight: null,
      //身份
      currentObj: {
        name: '',
        url: null
      },
      witch:{
         save: true,
         kill: true
      },
      //要死的人
      killsb: [],
      //说话玩家
      speakPlayer:null,
      look:false,
      next_speak:{}
    }
  },
  mounted() {
    this.setTitle();
    this.getPlayerData();
    this.setPlayGroup();
    this.gameFlowCtrl();
  },
  methods: {
    setTitle() {
      this.$store.commit('updateTitle', this.title);
    },
    getPlayerData() {
      //模拟用户数据
      this.playerlist = [
        {
          uid: '10001',
          seat: 1,
          nick: '死侍',
          portrait: './src/assets/userpic/user-01.jpg',
          idCard: '',
          alive: true,
          sign:false
        },
        {
          uid: '10002',
          seat: 2,
          nick: '雷神',
          portrait: './src/assets/userpic/user-02.jpg',
          idCard: '',
          alive: true,
          sign:false
        },
        {
          uid: '10003',
          seat: 3,
          nick: '超人',
          portrait: './src/assets/userpic/user-03.jpg',
          idCard: '',
          alive: true,
          sign:false
        },
        {
          uid: '10004',
          seat: 4,
          nick: '蝙蝠侠',
          portrait: './src/assets/userpic/user-04.jpg',
          idCard: '',
          alive: true,
          sign:false
        },
        {
          uid: '10005',
          seat: 5,
          nick: '钢铁侠',
          portrait: './src/assets/userpic/user-05.jpg',
          idCard: '',
          alive: true,
          sign:false
        },
        {
          uid: '10006',
          seat: 6,
          nick: '蜘蛛侠',
          portrait: './src/assets/userpic/user-06.jpg',
          idCard: '',
          alive: true,
          sign:false
        },
        {
          uid: '10007',
          seat: 7,
          nick: 'Rookie',
          portrait: './src/assets/userpic/user-07.jpg',
          idCard: '',
          alive: true,
          sign:false
        },
        {
          uid: '10008',
          seat: 8,
          nick: 'Hansir',
          portrait: './src/assets/userpic/user-08.jpg',
          idCard: '',
          alive: true,
          sign:false
        }]
    },
    //模拟下一步
    next() {
      this.flowStatus = this.flowStatus + 1;
      this.gameFlowCtrl();
        console.log(this.flowStatus);
    },
    //狼人、女巫选择要杀的人
    Kill(_i) {
      this.killsb.push(_i);
      this.playerlist[_i-1].alive = false;
      //暂时性 接收一个人的值
    },
    //女巫救人
    save(_i) {
      this.killsb.pop();
      this.playerlist[_i-1].alive = true;
      this.witch.save = false;
    },
    LookIdCard(_item){
       this.look = true;
       this.playerIdCard = (_item.idCard);
       this.playerlist[_item.seat-1].sign = true;
    },
    //获取当前玩家
    getCurrentUser() {
      this.playerlist.forEach(function (element, index) {
        //假装第一位玩家就是我们的当前玩家
        if (index == 0) {
          this.currentUser = element;
        }
      }.bind(this));
      this.getIdCard(this.currentUser.idCard);
    },
    getUserInfo(_seat) {
      this.playerlist.forEach(function (element, index) {
        if (_seat === element.seat) {
          return element
        }
      })
    },
    //给用户分组
    setPlayGroup() {
      let len = this.playerlist.length;
      let subArr = [];
      for (var i = 0; i < 14 - len; i++) {
        subArr[i] = "nobody";
      }
      let Arr = this.playerlist.concat(subArr);

      this.playerlist_1 = Arr.slice(0, 7);
      this.playerlist_2 = Arr.slice(7, 14);
    },

    receiveInfo(info) {
      //info 为input组件输入内容
    },
    //游戏流程控制
    gameFlowCtrl() {
      this.gameFlowStatus(this.flowStatus);
    },
    //游戏流程
    gameFlowStatus(_status) {
      switch (_status) {
        //游戏开始 分发身份
        case 0: {
          this.gameFlowStatus_start();
          break;
        }
        //天黑时 狼人操作
        case 1: {
          this.gameFlowStatus_wolf();
          break;
        }
        //天黑时 女巫救人
        case 2: {
          this.gameFlowStatus_witchSave();
          break;
        }
        //女巫杀人
        case 3:{
          this.gameFlowStatus_witchKill();
          break;
        }
        //天黑时 预言家操作
        case 4: {
          this.gameFlowStatus_prophesy();
          break;
        }
        //天亮
        case 5:{
          this.gameFlowStatus_nightEnd();
          break;
        }
        //玩家发言
        case 6:{
          this.gameFlowStatus_Speak();
          break;
        }
        //玩家投票
        case 7:{
          this.gameFlowStatus_vote();
          break;
        }
      }

    },
    //游戏开始 分发身份牌
    //身份：1:预言家 ,2:女巫 , 3:猎人 , 4:狼人 , 5:平民 
    gameFlowStatus_start() {
      //判断有几个玩家
      var len = this.playerlist.length;
      var setIdCard = (_arr) => {
        for (var i = 0; i < len; i++) {
          var rand = parseInt(Math.random() * len);
          var temp = _arr[rand];
          _arr[rand] = _arr[i];
          _arr[i] = temp;
        };
        for (var i = 0; i < len; i++) {
          this.playerlist[i].idCard = _arr[i];
        }
        //当前玩家获取身份
        this.getCurrentUser();
      }
      switch (len) {
        case 8: {
          //3神+3平+2狼
          var arr = [1, 2, 3, 4, 4, 5, 5, 5];
          setIdCard(arr);
          break;
        }
        case 10: {
          //3神+4平+3狼
          var arr = [1, 2, 3, 4, 4, 4, 5, 5, 5, 5];
        }
        default: {
          //暂时不用12人
        }
      }
    },
    getIdCard(idCard) {
      switch (idCard) {
        case 1: {
          this.currentObj = {
            name: '预言家',
            url: './src/assets/game-info-img/001.jpeg'
          }
          break;
        }
        case 2: {
          this.currentObj = {
            name: '女巫',
            url: './src/assets/game-info-img/002.jpeg'
          }
          break;
        }
        case 3: {
          this.currentObj = {
            name: '猎人',
            url: './src/assets/game-info-img/003.jpeg'
          }
          break;
        }
        case 4: {
          this.currentObj = {
            name: '狼人',
            url: './src/assets/game-info-img/005.jpeg'
          }
          break;
        }
        case 5: {
          this.currentObj = {
            name: '村民',
            url: './src/assets/game-info-img/006.jpeg'
          }
        }
        default: {
          //
        }
      }
    },
    //天黑时 ：
    //1 狼人操作：选择要杀掉的玩家
    gameFlowStatus_wolf() {
      //游戏提示
      this.onNight = true;
      this.sysTips = {
        title: '天黑请闭眼',
        content: '狼人请睁眼，请选择要杀的玩家',
        time: 20
      }
    },
    //2 女巫操作：救人／不救 
    gameFlowStatus_witchSave() {
      this.sysTips = {
        title: '天黑请闭眼',
        content: '女巫请睁眼，你要使用解药吗？',
        time: 20
      }
    },
    //3 女巫操作：毒／不毒
    gameFlowStatus_witchKill(){
       this.sysTips = {
        title: '天黑请闭眼',
        content: '你要使用毒药吗？',
        time: 20
      }
    }, 
    //4 预言家操作：选择要查看玩家
    gameFlowStatus_prophesy() {
      this.sysTips = {
        title: '天黑请闭眼',
        content: '预言家请睁眼,请选择你要查验的身份',
        time: 20
      }
    },
    //清算结果
    //天亮时：
    //5（判断天数）前两天死掉的人有遗言
    gameFlowStatus_nightEnd() {
      var _content = ''
      if(this.killsb.length == 0){
        _content = '昨晚是平安夜';
      } else{
         var deathPlayerNum = this.killsb.join(',');
        _content = '昨晚['+deathPlayerNum+']号玩家死亡';
      }
      this.sysTips = {
        title: '天亮了',
        content: _content,
        time: 20
      }
      var max = 0;
      for(var i=0;i<this.killsb.length;i++){
         var max = this.killsb[0];
         if(this.killsb[i] > max){
           max = this.killsb[i];
         } 
      }
      if (max === this.playerlist.length ){
            max = 0;
      }
       this.speakPlayer = max;
      //  this.gameFlowStatus_jugle()
    },
    //6 从死亡玩家下一位玩家开始发言，每个人有1分半发言时间，可以跳过
    gameFlowStatus_Speak(){
        var _arr = [];
        var _speakPlayer;
        var _index;
        this.playerlist.forEach(function(element){
          if(element.alive == true){
            _arr.push(element.seat);
          }
        });
        
        for(var i = 0 ; i<_arr.length;i++){
            if(_arr[i] > this.speakPlayer){
                _index = i;
                return;
            }else{
                _index = 0;
            }
        };
        function loop(){
            this.sysTips = {
              title:'白天',
              content:'现在由['+_index+']开始发言',
              time:20
            }
        }
        setInterval(function(){
            loop();
        },5000);
    },
    //7 玩家投票
    gameFlowStatus_vote(){
        this.sysTips ={
          title:'白天',
          content:'现在开始投票',
          time:20
        }
        //投票数据上传服务器，服务器返回投票数据
        //票数最多的玩家死亡，票数最多但持平，没有人死亡
        this.gameFlowStatus_jugle();
    },
    //游戏轮回判断
    gameFlowStatus_jugle(){
      //狼人和好人数持平时，狼人获胜
      //狼人团灭,好人获胜
      var _aliveNum = 0 ,_alivewolf = 0;
      this.playerlist.forEach(function(element){
        //存活人数
        if(element.alive){
          _aliveNum ++;
        }
        //存活狼人
        if(element.alive && element.idCard === 4){
          _alivewolf ++;
        }
      });
      if(_aliveNum === _alivewolf*2){
          //游戏结束狼人获胜
          this.gameEnd(0);
      }
      if (_alivewolf === 0){
        //游戏结束好人获胜
        this.gameEnd(1);
      }
    },
    gameEnd(_status){
        if(_status){
          alert('游戏结束，好人获胜');
        } else{
          alert('游戏结束，狼人获胜');
        }
    }
  }
}
</script>
<style>
.test {
  width: 200px;
  height: 100px;
  position: absolute;
  bottom: 0px;
  background: #ffffff;
  z-index: 2000;
}

.room-warp {
  right: 0;
  left: 0;
  top: 120px;
  bottom: 0;
  position: absolute;
  background: url(../../../assets/game-bg/langrensha-bg.jpeg) no-repeat;
  background-size: 100%;
}

.page-mask {
  background: rgba(0, 0, 0, .4);
  z-index: 1000;
}

.page-middle-box {
  width: 600px;
  height: 700px;
  position: absolute;
  top: 200px;
  left: 50%;
  background: #ffffff;
  margin-left: -300px;
  border-radius: 20px;
  text-align: center;
}

.page-small-box {
  width: 600px;
  height: 600px;
  position: absolute;
  left: 50%;
  margin-left: -300px;
  top: 200px;
  background: #ffffff;
  border-radius: 20px;
  z-index: 1000;
}

.small-box-userpic {
  width: 72px;
  height: 72px;
  border: 4px solid;
  text-align: center;
  line-height: 72px;
  font-size: 30px;
}
.small-box-userpic img {
  width: 100%;
  height: 100%;
}

.page-small-box-head {
  height: 340px;
  margin-bottom: 4px;
  position: relative;
}

.page-small-box-head h1 {
  position: absolute;
  bottom: 20px;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 40px;
  color: #F44336;
}

.page-small-box-head img {
  width: 100%;
  height: 100%;
  opacity: 0.8;
  border-radius: 20px 20px 0 0;
}

.page-small-box-content {
  width: 400px;
  margin: 0 auto;
}

.page-small-box-foot {
  height: 200px;
}

.small-box-userpic {
  margin: 20px 10px;
}

.small-box-fix {
  border: 4px solid #F44336;
}

.upper {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 30%;
  left: 50%;
  margin-left: -100px;
  animation: myMove 2s ease 2s 1 alternate;
}

.game-sys-tips {
  width: 480px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 80px;
  margin-left: -240px;
  color: #dddddd;
  background: rgba(0, 0, 0, 0.4);
  text-align: center;
  box-sizing: border-box;
  padding: 10px 20px;
  z-index: 100;
}

.game-sys-tips .time {
  position: absolute;
  bottom: 10px;
  width: 100%;
  font-size: 40px;
}

.game-sys-tips h1 {
  font-size: 50px;
  margin: 20px 0;
}

.game-sys-tips span {
  font-size: 35px;
}

.rotate-item {
  position: absolute;
  top: 200px;
  left: 50%;
  height: 450px;
  width: 450px;
  margin-left: -225px;
  animation: myMove 2s linear 2s 1 normal;
}

.idcardShow {
  width: 100%;
  height: 100%;
}

.idcardShow img {
  width: 100%;
  height: 100%;
}

@keyframes myMove {
  from {
    top: 200px;
    left: 50%;
    margin-left: -225px;
    width: 450px;
    height: 450px;
  }
  to {
    top: 20px;
    left: 550px;
    width: 50px;
    height: 50px;
    margin-left: 0;
  }
}

.upper-top {
  width: 50px;
  height: 50px;
  top: 20px;
  left: 550px;
  position: absolute;
  margin-left: 0;
}

.upper-top img {
  width: 100%;
  height: 100%;
}

.small-box-item {
  width: 100px;
  height: 140px;
  font-size: 20px;
  text-align: center;
  margin: 0 auto;
}
.small-box-item-border{
    display: block;
    width: 70px;
    height: 70px;
    border: 4px solid;
    line-height: 70px;
    font-size: 30px;
}
.upper img,
.small-box-item img {
  width: 100px;
  height: 100px;
}

.wolfroom-userlist ul {
  margin: 30px 5px 0 5px;
}

.wolfroom-userlist li {
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
  text-align: center;
  display: block;
  color: #ffffff;
  border: 4px solid #727272;
  border-radius: 20px;
  position: relative;
}

.wolfroom-userlist li span {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(58, 185, 130, 1);
  width: 50px;
  height: 50px;
  border-radius: 20px 10px 10px 0;
  line-height: 50px;
  text-align: center;
  font-size: 26px;
}

.wolfroom-userlist li img {
  width: 120px;
  height: 120px;
  border-radius: 20px;
}

.fLeft {
  float: left;
}

.fRight {
  float: right;
}

.game-msg-head {
  position: absolute;
  top: 0;
  height: 80px;
  width: 100%;
  background: rgba(0, 0, 0, .6);
  color: #cccccc;
  box-sizing: border-box;
  padding: 0 140px;
  line-height: 80px;
}

.pic-mask {
  top: -2px;
  left: -2px;
  z-index: 100;
  border-radius: 10px;
}

.wolfRoom .speak {
  box-shadow: 0 0 10px #F44336 inset;
  border: 2px solid #F44336;
}

.wolfRoom .death {
  border: 2px solid #727272;
  background: url(../../../assets/game-bg/death_meitu_1.jpg) no-repeat;
  background-size: 100%;
  opacity: 0.6;
}

.box-btn-group {
  width: 400px;
  margin: 20px 0;
}

.box-btn-group .btn {
  font-size: 40px;
  border: none;
  outline: none;
  width: 180px;
  border-radius: 10px;
  color: #ffffff;
  margin: 0 8px;
}

.box-btn-group .btn-col3 {
  background: #66bb6a;
}

.box-btn-group .btn-col4 {
  background: #F44336;
}

.btn-group {
  position: absolute;
  left: 50%;
  bottom: 20px;
  width: 276px;
  margin-left: -138px;
}

.btn-group button {
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 18px;
  outline: none;
  background: linear-gradient(top, rgba(29, 202, 242, 1), rgba(28, 117, 243, 1));
  background: -webkit-linear-gradient(top, rgba(29, 202, 242, 1), rgba(28, 117, 243, 1));
  background: -o-linear-gradient(top, rgba(29, 202, 242, 1), rgba(28, 117, 243, 1));
  background: -moz-linear-gradient(top, rgba(29, 202, 242, 1), rgba(28, 117, 243, 1));
}

.btn-group input {
  position: absolute;
  top: 0;
  right: 0;
  width: 215px;
  height: 35px;
  border-radius: 10px;
  outline: none;
  font-size: 1em;
  transition: width 1s;
}

.input-hide {
  width: 0 !important;
  opacity: 0;
}

.text-input {
  width: 50px;
  height: 40px;
}

.microphone {
  width: 220px;
  height: 40px;
}

.microphone span {
  margin-right: 5px;
}

.font-middle {
  font-size: 36px;
}
</style>


