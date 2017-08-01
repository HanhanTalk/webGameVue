<template>
    <div class="game-page game-page-warp animated fadeIn">
        <!--题目提示-->
        <div class="game-tips" v-if="gameStatus == 3">
            <div class="tips-triangle"></div>
            <div class="text-margin game-tips-text" v-if="currentUser.painer">
                <p>提示:{{Answer.name}}
                    <span class="tips-timer">{{time.tipsTime}}</span>
                </p>
                <button v-if="currentUser.painer" @click="gameFlowStatus_drawover" type="button" value="结束" class="position-right game-tips-text">结束</button>
            </div>
            <div class="text-margin game-tips-text" v-if="!currentUser.painer">
                <p>提示：{{Answer.length}}个字 {{Answer.type}}</span>
                    <span class="tips-timer-o">{{time.tipsTime}}</span>
                </p>
            </div>
        </div>
        <!--canvas组件 -->
        <gameCanvas id="gameCanvas" class="canvas-ex"  
            :serverDrawData="serverDrawData" 
            :paintSize="paint_Size" 
            :paintCol="paint_Col"
            :isPainer="currentUser.painer"
             ref="myCanvas">
        </gameCanvas>
        <div class="canvas-mask" v-if="!currentUser.painer">
        </div>
        <div class="canvas-ctrl" v-if="currentUser.painer">
            <div class="canvas-ctrl-first" v-if="chooseShow">
                <ul v-if="!color">
                    <li @click="choosePot(n)" v-for="(n,index) in 5" :key="n.id">
                        <span class="fa fa-circle" :class="'size_'+index"></span>
                    </li>
                </ul>
                <ul v-if="color">
                    <li @click="chooseCol(n)" v-for="(n,index) in 6" :key="n.id">
                        <span :class="'col_'+index" class="fa fa-stop"></span>
                    </li>
                </ul>
            </div>
            <div class="canvas-ctrl-last">
                <div class="float-left">
                    <ul>
                        <li @click="colClick">
                            <img class="col-btn img-circle" src="../../../assets/sepan.jpeg">
                        </li>
                        <li @click="paintClick">
                            <span class="fa fa-circle vertical-middle" :class="[paintSize,paintCol]"></span>
                        </li>
                    </ul>
                </div>
                <div class="float-right">
                    <ul>
                        <li @click="replyClick">
                            <span class="fa fa-mail-reply" :class="{'de-active':deactive_1}"></span>
                        </li>
                        <li @click="forwardClick">
                            <span class="fa fa-mail-forward" :class="{'de-active':deactive_2}"></span>
                        </li>
                        <li @click="trash">
                            <span class="fa fa-trash"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="player-list-six">
            <ul>
                <li v-for="(item,index) in $store.state.drawGuessRoom.player" :key="item.uid">
                    <img v-if="item.portrait" class="img-circle" :src="item.portrait">
                    <img v-else class="img-circle" src="../../../assets/userpic/user-11.jpg">
                    <span class="player-score">
                        {{item.score}}
                    </span>
                    <span class="fa img-circle fa-pencil current-mask" v-if="(index == currentPainer) && (gameStatus == 2 || gameStatus == 3)"></span>
                    <img class="bingo-mask  animated jackInTheBox" src="../../../assets/bingo_meitu_1.png" v-if="item.bingo">
                    <div class="add-score-mask" v-if="item.addscore">
                        <span>+15分</span>
                    </div>
                </li>
            </ul>
        </div>
        <!--系统提示-->
        <div class="game-page-warp" v-if="sysInfoShow">
            <div class="game-sys-info">
                <h1>{{sysInfo.title}}</h1>
                <p>{{sysInfo.content}}</p>
                <span class="fa fa-spinner txt rotate"></span>
            </div>
        </div>
        <!--input组件 -->
        <textInput @answerEvent="receiveInfo"></textInput>
        <!--选词-->
        <div class="game-page-mask game-page-warp animated fadeIn" v-if="currentUser.painer && ( gameStatus == 2 )">
            <div class="page-middle-box">
                <div class="choose-word-head">
                    <img src="../../../assets/game-img/huacai.jpeg">
                    <h1 class="txt">哇哦～快选择你要画的词</h1>
                    <p class="content-txt">
                        <span>{{time.chooseTime}}</span>秒后系统自动帮你做出选择</p>
                </div>
                <div class="choose-word-content">
                    <ul>
                        <li @click="playerChooseWord(word)" v-for="word in words" :key="word.id">{{word.name}}</li>
                    </ul>
                    <p class="content-txt">每有1人答对你
                        <span class="col-green">+15分</span>
                        <br>
                        <span class="col-red">6人局中</span>词被所有人猜到你得
                        <span class="col-red">0分</span>
                    </p>
                </div>
            </div>
        </div>
        <!--公布答案-->
        <div class="game-page-warp game-page-mask animated fadeIn" v-if="gameStatus == 5">
            <div class="page-big-box">
                <div class="game-box-head">
                    <div class="game-head-left">答案:{{Answer.name}}
                        <span>{{time.answerTime}}</span>
                    </div>
                </div>
                <div class="game-box-content">
                    <!--暂时随意填充一张图 -->
                    <img src="../../../assets/bg-img/ox.jpeg">
                </div>
                <div class="page-btn-groups">
                    <button type="button" class="page-btn btn-col1">送鲜花</button>
                    <button type="button" class="page-btn btn-col2">扔鸡蛋</button>
                </div>
            </div>
        </div>
        <!--回答正确窗口-->
        <div class="game-page-mask game-page-warp animated zoomIn" v-if="gameStatus == 3 && currentUser.bingo" :class="{'hide':close_answer}">
            <div class="page-big-box">
                <button @click="closeBtnClick" class="page-close-btn" type="button">
                    <span class="fa fa-close txt-2"></span>
                </button>
                <img src="../../../assets/bg-img/answer.png">
            </div>
        </div>
        <!--游戏结束-->
        <div class="game-page-warp game-page-mask animated flipInX" v-if="gameStatus == 6">
            <div class="page-xbig-box">
                <div class="page-xbig-head">
                    <h1 class="txt">游戏结果</h1>
                </div>
                <div class="page-xbig-content">
                    <ul>
                        <li v-for="(item,index) in $store.state.drawGuessRoom.player" :key="item.uid">
                            <div class="rank-tag">{{index+1}}</div>
                            <div class="rank-userinfo">
                                <div class="rank-userinfo-pic">
                                    <img src="../../../assets/userpic/anonym.jpg">
                                </div>
                                <div class="rank-userinfo-item">
                                    <p>{{item.uid}}</p>
                                    <span class="rank-score">
                                        +{{item.score}}分
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript6">
import textInput from '../../public/input.vue'
import gameCanvas from '../../public/canvas.vue'
// import animate from '../../../style/animate.css'
import api from '../../../api/api'
export default {
    name: 'huacai',
    components: { textInput, gameCanvas },
    data() {
        return {

            loopTimer: null,
            //显示
            chooseShow: false,
            sysInfoShow: true,
            close_answer: true,

            //canvas 
            color: true,
            paintSize: 'size_0', //画笔初始大小
            paintCol: 'col_0',    //画笔初始颜色
            paint_Size: 2,       //画笔大小转义后
            paint_Col: 'black',        //画笔颜色转义后
            deactive_1: true,
            deactive_2: true,

            //当前作画
            currentPainer: 0,
            currentUser: {},
            Answer: {
                name: '',
                length: 0,
                type: ''
            },
            sysInfo: {
                title: '提示',
                content: '队友正在赶来'
            },
            time: {
                chooseTime: 5,
                tipsTime: 80,
                answerTime: 5
            },
            //模拟数据 单词
            words: [
                {
                    content: '垃圾桶',
                    word: 3,
                    keyword: '生活用品'
                },
                {
                    content: '篮子',
                    word: 2,
                    keyword: '生活用品'
                },
                {
                    content: '堆雪人',
                    word: 3,
                    keyword: '娱乐方式'
                },
                {
                    content: '沙漠之鹰',
                    word: 4,
                    keyword: '武器'
                },
            ],
            //计时器
            chooseWordTime: null,
            drawTime: null,
            answerTimer: null,
            //游戏状态
            gameStatus: 0,
            //1代表游戏开始 2代表玩家选词 3代表画画阶段 4代表结束作画 5公布答案 6代表游戏结束 
            gameround: 1,
            //游戏回合
            roomData: {},
            serverDrawData: {}
        }
    },
    mounted() {
        // 先显示一次房间里的信息，然后开始轮询接口
        // TODO 如果store里没有房间信息，就提示开房不成功
        // 开房成功 就开始拉去信息
        this.startFetchRoomInfo();
    },
    methods: {
        startFetchRoomInfo() {
            var self = this;
            // 这里进行循环获得房间信息
            function _loopGetRoomInfo() {
                // 如果没有id 就不请求
                if (!self.$route.params.id) {
                    return;
                }
                api.getDrawguessRoomInfo({
                    roomId: self.$route.params.id
                }).then((response) => {
                    self.$store.commit('updateDrawGuessRoom', response);
                    self.loopTimer = setTimeout(() => {
                        _loopGetRoomInfo()
                    }, 1000);
                    // 如果当前词语已经选择好
                    if (response.drawWord) {
                        self.Answer = response.drawWord;
                    }
                    self.playerEach();
                    self.dispatchRoomStatus(response);
                    self.roomData = response;
                }).catch((err) => {
                    alert('请求出错' + err);
                    self.stopFetchRoomInfo();
                });
            }
            _loopGetRoomInfo();
        },
        stopFetchRoomInfo() {
            if (this.loopTimer) {
                clearTimeout(this.loopTimer);
            }
        },
        dispatchRoomStatus(response) {
            //模拟数据
            this.sysInfoShow = false;
            switch (response.status) {
                //0代表等待
                case 0: {
                    this.sysInfoShow = true;
                    break;
                }
                //1 进入选题阶段
                case 1: {
                    // 当前是画家的玩家在选择词语阶段关闭请求
                    if (this.currentUser.painer) {
                        this.stopFetchRoomInfo();
                    }
                    this.gameFlowStatus(1);
                    break;
                }
                case 2: {
                    this.gameFlowStatus(3);
                }
            }
        },
        gameFlowStatus(_status) {
            switch (_status) {
                case 1: {
                    //游戏状态为开始游戏
                    this.gameFlowStatus_start();
                    break;
                }
                case 2: {
                    //游戏状态为玩家选词
                    this.gameFlowStatus_chooseword();
                    break;
                }
                case 3: {
                    //游戏状态为画画阶段
                    this.gameFlowStatus_drawing();
                    break;
                }
                case 4: {
                    //游戏状态为玩家结束作画
                    this.gameFlowStatus_drawover();
                    break;
                }
                //游戏状态为公布答案
                case 5: {
                    this.gameFlowStatus_anAnswer();
                    break;
                }
                default: {
                    //游戏结束
                    this.gameFlowStatus_end();
                }
            }
        },
        //开始游戏
        gameFlowStatus_start() {
            var _this = this;
            this.gameStatus = 1;
            //初始化一些数据
            this.Answer = {
                name: '',
                length: 0,
                type: ''
            };
            this.sysInfoShow = true;
            this.sysInfo = {
                title: '提示',
                content: '游戏即将开始'
            }
            //3秒后跳到游戏选词
            if (!this.currentUser.painer) {
                return;
            }
            // 如果是当前玩家是画家才选词
            setTimeout(function () {
                _this.sysInfoShow = false;
                _this.gameFlowStatus(2);
            }, 2000);
        },
        //玩家选词
        gameFlowStatus_chooseword() {
            var self = this;
            if (!this.currentUser.painer) {
                return;
            }
            api.getDrawguessRoomWord({ roomId: self.$route.params.id })
                .then((response) => {
                    self.words = response;
                    self.time.chooseTime = 5;
                    self.gameStatus = 2;

                    // 第二种选词情况:系统选择
                    var _timer = (_time) => {
                        self.chooseWordTime = setInterval(() => {
                            if (_time == 1) {
                                clearInterval(self.chooseWordTime);
                                sysChooseWord();
                            };
                            console.log(_time);
                            _time--;
                            self.time.chooseTime = _time;
                        }, 1000);
                    };
                    _timer(5);
                    var sysChooseWord = (() => {
                        self.giveWord(self.words[parseInt(4 * Math.random())]);
                        // self.gameFlowStatus(3);
                    })
                }).catch((err) => {

                });
        },
        // 第一种选词情况：玩家选择
        playerChooseWord(word) {
            this.gameStatus = 2;
            if (word) {
                clearInterval(this.chooseWordTime);
                this.giveWord(word);
                // this.gameFlowStatus(3);
            }
        },
        giveWord(word) {
            this.Answer = word;
            // 把选好的词语发送到后端
            api.postDrawguessRoomWord({roomId: this.$route.params.id, word: this.Answer})
                .then((response) => {
                    if (this.currentUser.painer) {
                        this.startFetchRoomInfo();
                    }
                }).catch((err) => {

                });
        },
        //画画阶段
        gameFlowStatus_drawing() {
            this.gameStatus = 3;
            // this.time.tipsTime = 80;
            // //开始倒计时
            // var _timer = ((_time) => {
            //     this.drawTime = setInterval(() => {
            //         if (_time == 1) {
            //             clearInterval(this.drawTime);
            //             this.gameFlowStatus(4);
            //         }
            //         console.log(_time);
            //         _time--;
            //         this.time.tipsTime = _time;
            //     }, 1000);
            // });
            // _timer(80);
            if (!this.currentUser.painer && this.roomData.drawData) {
                this.serverDrawData = this.roomData.drawData;
                setTimeout(() => {
                    this.$refs.myCanvas.reDraw();
                }, 500);
            }
        },
        //玩家结束作画
        gameFlowStatus_drawover() {
            if (this.time.tipsTime > 50) {
                alert("作画时间没有30秒，不能结束")
            } else {
                this.gameStatus = 4;
                clearInterval(this.drawTime);
                this.gameFlowStatus(5);
                this.trash();
            }
        },

        //公布答案阶段
        gameFlowStatus_anAnswer() {
            this.gameStatus = 5;
            this.currentUser.bingo = false;
            this.time.answerTime = 5;
            var _timer = (_time) => {
                this.answerTimer = setInterval(() => {
                    if (_time == 1) {
                        clearInterval(this.answerTimer);
                        this.gameFlowStatus_judge();
                    }
                    _time--;
                    this.time.answerTime = _time;
                }, 1000);
            };
            _timer(5);
        },

        //判断是跳向下一个玩家 还是直接结束游戏
        gameFlowStatus_judge() {
            var _index, _status;
            var userlist = this.$store.state.drawGuessRoom.player;
            var _next = (_i) => {
                this.$store.state.drawGuessRoom.player[_i].painer = false;
                if (_i == userlist.length - 1) {
                    this.$store.state.drawGuessRoom.player[0].painer = true;
                } else {
                    this.$store.state.drawGuessRoom.player[_i + 1].painer = true;
                }
                this.gameFlowStatus(2);
            }
            for (var i = 0; i < userlist.length; i++) {
                if (userlist[i].painer) {
                    if (i == userlist.length - 1) {
                        if (this.gameround == 1) {
                            this.currentPainer = 0;
                            this.gameround = 2;
                            _next(i);
                            return;
                        } else {
                            this.gameFlowStatus(6);
                            return;
                        }
                    }
                    _next(i);
                    this.currentPainer = i + 1;
                    return;
                }
            }
        },

        //游戏结束
        gameFlowStatus_end() {
            this.gameStatus = 6;
            alert('游戏结束');
        },
        //系统信息
        gameSysInfo() {

        },
        //遍历玩家列表
        playerEach() {
            this.$store.state.drawGuessRoom.player.forEach(function (item, index) {
                //当前用户this.$store.state.userInfo.uid
                if (item.uid === this.$store.state.userInfo.uid) {
                    this.currentUser = item;
                }
            }.bind(this));
            if (this.$store.state.drawGuessRoom.drawPlayerUid == this.$store.state.userInfo.uid) {
                this.currentUser.painer = true;
            }
        },
        //验证玩家提交答案是否正确
        provingAnswer() {
            if (this.gameStatus == 3) {
                var _this = this;
                if (!this.currentUser.painer) {
                    if (this.currentUser.inputText == this.Answer.name) {
                        if (!this.currentUser.bingo) {
                            this.currentUser.bingo = true;
                            this.currentUser.addscore = true;
                            this.close_answer = false;
                            //加分
                        } else {
                            alert("你已提交正确答案!")
                        }
                        setTimeout(function () {
                            _this.currentUser.addscore = false;
                        }, 2000)
                    }
                }
            }
        },

        //接收input输入
        receiveInfo(info) {
            this.currentUser.inputText = info;
            this.provingAnswer();
        },
        //点击选择颜色按钮
        colClick() {
            this.chooseShow = true;
            if (!this.color) {
                this.color = true;
            }
        },
        //点击选择大小按钮
        paintClick() {
            this.chooseShow = true;
            if (this.color) {
                this.color = false;
            }
        },
        //上一步操作
        replyClick() {

        },
        //下一步操作
        forwardClick() {

        },
        //清空画布
        trash() {
            var child = this.$refs.myCanvas
            child.clearArea();
        },
        //选择大小
        choosePot(n) {
            this.paintSize = 'size_' + (n - 1);
            this.chooseShow = false;
            this.setPaintSize();

        },
        //选择颜色
        chooseCol(n) {
            this.paintCol = 'col_' + (n - 1);
            this.chooseShow = false;
            this.setPaintCol();

        },
        //画笔设置
        setPaintCol() {
            var _col = this.paintCol;
            //画笔颜色
            switch (_col) {
                case 'col_0':
                    this.paint_Col = 'black';
                    break;
                case 'col_1':
                    this.paint_Col = 'blue';
                    break;
                case 'col_2':
                    this.paint_Col = 'yellow';
                    break;
                case 'col_3':
                    this.paint_Col = 'red';
                    break;
                case 'col_4':
                    this.paint_Col = 'green';
                    break;
                default:
                    this.paint_Col = "purple";
            }
        },
        setPaintSize() {
            var _size = this.paintSize;
            //画笔大小
            switch (_size) {
                case 'size_0':
                    this.paint_Size = 2;
                    break;
                case 'size_1':
                    this.paint_Size = 15;
                    break;
                case 'size_2':
                    this.paint_Size = 30;
                    break;
                case 'size_3':
                    this.paint_Size = 45;
                default:
                    this.paint_Size = 60;
            }
        },
        closeBtnClick() {
            this.close_answer = true;
        }

    }
}
</script>
<style>
.hide {
    display: none;
}

.game-page {
    background: #ffffff;
    overflow: hidden;
    top: 120px !important;
}

.game-page-warp {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
}

.game-tips {
    min-width: 350px;
    height: 80px;
    position: absolute;
    top: 30px;
    left: 20px;
    background: #000000;
    border-radius: 15px;
    line-height: 80px;
    padding: 0 30px;
}

.game-tips button {
    height: 80px;
    width: 120px;
    background: #2196F3;
    border: none;
    border-radius: 0 15px 15px 0;
}

.tips-timer {
    position: absolute;
    right: 160px;
}

.tips-timer-o {
    position: absolute;
    right: 60px;
    top: 0;
}

.tips-triangle {
    width: 0;
    height: 0;
    position: absolute;
    top: -40px;
    border-width: 20px;
    border-style: solid;
    border-color: transparent transparent #000000 transparent;
}

.text-margin {
    margin-right: 160px;
}

.page-btn-groups {
    margin: 25px 0;
}

.page-btn {
    width: 280px;
    height: 80px;
    border-radius: 20px;
    border: none;
    font-size: 30px;
    color: #ffffff;
    margin: 0 8px;
}

.btn-col1 {
    background: rgba(245, 113, 116, 1);
}

.btn-col2 {
    background: rgba(251, 225, 5, 1);
}

.game-tips-text {
    color: #ffffff;
    font-size: 28px;
}

.rank-userinfo-pic {
    width: 90px;
    height: 90px;
    margin: 20px 30px 20px 0;
    float: left;
    border: 10px solid rgba(244, 67, 54, 0.3);
    border-radius: 10px;
}

.rank-userinfo-pic img {
    width: 100%;
    height: 100%;
}

.rank-userinfo-item {
    padding: 30px 0;
}

.rank-userinfo-item p {
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.position-right {
    position: absolute;
    right: 0;
    top: 0;
}

.vertical-middle {
    vertical-align: middle;
}

.canvas-ex {
    height: 870px;
}

.canvas-ctrl {
    width: 100%;
    position: absolute;
    bottom: 340px;
}

.col-btn {
    width: 50px;
    height: 50px;
    margin: 25px 0;
}

.color-btn {
    width: 20px;
    height: 20px;
    display: block;
}

.size-btn {
    width: 4px;
    height: 4px;
    border: none;
    background: #000000;
}

.game-box-content {
    height: 550px;
}

.game-page-mask {
    background: rgba(0, 0, 0, .2);
    z-index: 1000;
}

.page-big-box {
    width: 600px;
    height: 800px;
    position: absolute;
    left: 50%;
    margin-left: -300px;
    top: 200px;
    background: #ffffff;
    border-radius: 20px;
}

.page-xbig-box {
    width: 600px;
    height: 1000px;
    position: absolute;
    left: 50%;
    margin-left: -300px;
    top: 100px;
    background: url('../../../assets/bg-img/rank.jpeg') no-repeat;
    background-size: 100% 100%;
    border-radius: 20px;
}

.page-close-btn {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    background: rgba(0, 0, 0, .6);
    position: absolute;
    top: -30px;
    right: -30px;
    border: none;
}

.page-big-box img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
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

.page-middle-box img {
    width: 300px;
    height: auto;
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
}

.page-small-box img {
    width: 100%;
    height: 100%;
}

.page-small-head {
    width: 100%;
    text-align: center;
    margin: 30px 0;
}

.game-box-head {
    height: 100px;
}

.game-head-left {
    width: 330px;
    height: 80px;
    background: #000000;
    border-radius: 20px;
    margin: 15px 20px;
    color: #ffffff;
    line-height: 80px;
    box-sizing: border-box;
    padding: 0 20px;
    font-size: 30px;
    position: relative;
}

.game-head-left span {
    position: absolute;
    right: 20px;
}

.page-xbig-head {
    height: 100px;
    text-align: center;
    line-height: 100px;
}

.page-xbig-content {}

.page-xbig-content li {
    width: 100%;
    height: 150px;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.6);
}

.rank-tag {
    width: 90px;
    height: 90px;
    background: url('../../../assets/bg-img/rating.svg');
    text-align: center;
    line-height: 90px;
    font-size: 32px;
    margin: 30px 20px;
    float: left;
    color: #ffffff;
}

.rank-userinfo {
    height: 90px;
    font-size: 30px;
    vertical-align: middle;
}

.choose-word-head {
    margin-bottom: 40px;
}

.choose-word-content {
    width: 480px;
    margin: 0 auto;
}

.choose-word-content ul {
    padding: 20px 0;
}

.choose-word-content li {
    width: 200px;
    height: 80px;
    border-radius: 40px;
    border: 4px solid #000000;
    margin: 10px;
    line-height: 80px;
    font-size: 30px;
}

.canvas-ctrl-first li {
    margin: 0 38px;
}

.canvas-ctrl-first {
    border: 1px dotted #b6b6b6;
}

.canvas-ctrl-last,
.canvas-ctrl-first {
    height: 100px;
    padding: 0 40px;
    font-size: 40px;
    background: #dddddd;
    line-height: 100px;
}

.canvas-ctrl-last li {
    margin: 0 20px;
    height: 100px;
    display: block;
    float: left;
}

.player-list-six {
    background: #dddddd;
    border-top: 1px solid #b6b6b6;
    position: absolute;
    bottom: 140px;
    width: 100%;
}

.player-list-six ul {
    width: 660px;
    padding: 20px 0 40px 0;
    margin: 0 auto;
}

.player-list-six li {
    height: 120px;
    text-align: center;
    width: 100px;
    margin: 5px;
    position: relative;
}

.player-list-six li img {
    width: 100px;
    height: 100px;
}

.img-circle {
    border-radius: 50%;
}

.player-score {
    font-size: 28px;
}

.current-mask {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #ff9800;
    color: #ffffff;
    font-size: 30px;
    position: absolute;
    top: 0;
    right: 4px;
}

.bingo-mask {
    width: 100px !important;
    height: 70px !important;
    opacity: 0.8;
    position: absolute;
    left: 0;
    bottom: 10px;
}

.de-active {
    color: #b6b6b6;
}

.canvas-mask {
    height: 870px;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 100;
}

.add-score-mask {
    min-width: 100%;
    height: 40px;
    position: absolute;
    border-radius: 10px;
    background: #ffffff;
    line-height: 40px;
    animation: 'score-mask-show' 2s infinite;
    -webkit-animation: 'score-mask-show' 2s infinite;
    -o-animation: 'score-mask-show' 2s infinite;
    -moz-animation: 'score-mask-show' 2s infinite;
}






/* .animateUp{
         animation: 'score-mask-show' 2s infinite;
        -webkit-animation: 'score-mask-show' 2s infinite;
        -o-animation: 'score-mask-show' 2s infinite;
        -moz-animation: 'score-mask-show' 2s infinite;
    } */

@keyframes score-mask-show {
    0% {
        top: -20px;
        opacity: 0
    }
    50% {
        top: -50px;
        opacity: 1
    }
    100% {
        top: -50px;
        opacity: 0
    }
}

@-webkit-keyframes score-mask-show {
    0% {
        top: -20px;
        opacity: 0
    }
    50% {
        top: -50px;
        opacity: 1
    }
    100% {
        top: -50px;
        opacity: 0
    }
}

@-o-keyframes score-mask-show {
    0% {
        top: -20px;
        opacity: 0
    }
    50% {
        top: -50px;
        opacity: 1
    }
    100% {
        top: -50px;
        opacity: 0
    }
}

@-moz-keyframes score-mask-show {
    0% {
        top: -20px;
        opacity: 0
    }
    50% {
        top: -50px;
        opacity: 1
    }
    100% {
        top: -50px;
        opacity: 0
    }
}

.add-score-mask span {
    font-size: 20px;
}

.float-left {
    float: left;
}

.float-right {
    float: right;
}

.size_0 {
    font-size: 2px;
}

.size_1 {
    font-size: 15px;
}

.size_2 {
    font-size: 30px;
}

.size_3 {
    font-size: 45px;
}

.size_4 {
    font-size: 60px;
}

.col_0 {
    color: black;
}

.col_1 {
    color: blue;
}

.col_2 {
    color: yellow;
}

.col_3 {
    color: red;
}

.col_4 {
    color: green;
}

.col_5 {
    color: purple;
}

.game-sys-info {
    width: 400px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 30%;
    margin-left: -200px;
    background: rgba(0, 0, 0, .2);
    border-radius: 20px;
    text-align: center;
    box-sizing: border-box;
    padding: 20px;
}

.game-sys-info h1 {
    font-size: 50px;
    margin-bottom: 20px;
}

.game-sys-info p {
    font-size: 30px;
    margin-bottom: 40px;
}

.col-green {
    color: rgba(0, 180, 114, 1);
}

.col-red {
    color: rgba(222, 82, 69, 1);
}
</style>

