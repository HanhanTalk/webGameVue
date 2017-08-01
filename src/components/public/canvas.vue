<template>
  
</template>
<script>
import api from '../../api/api';
export default {
  name: 'gameCanvas',
  props: ['paintSize', 'paintCol', 'serverDrawData', 'isPainer'],
  data() {
    return {
      touchPressed: false,
      lastX: '',
      lastY: '',
      ctx: {},
      offsettop: 120,
      offsetleft: 0,
      drawData: [],
      drawOption: {},
      totalDrawData: []
    }
  },
  mounted() {
    this.prepareCanvas();
  },
  methods: {
    //初始化画布
    prepareCanvas() {
      //创建 canvas
      var canvasDiv = document.getElementById('gameCanvas');
      var canvas = document.createElement('canvas');
      canvas.setAttribute('width', canvasDiv.clientWidth);
      canvas.setAttribute('height', canvasDiv.clientHeight);
      canvas.setAttribute('id', 'mycanvas');
      canvasDiv.appendChild(canvas);
      this.ctx = canvas.getContext('2d');
      //监听touch事件
      canvas.addEventListener('touchstart', this.touchDown, false);
      canvas.addEventListener('touchmove', this.touchMove, false);
      canvas.addEventListener('touchend', this.touchUp, false);
    },
    //开始touch 屏幕
    touchDown(e) {
      var _touch = e.changedTouches[0];
      this.touchPressed = true;
      this.drawData.push({
        x: _touch.pageX - this.offsetleft,
        y: _touch.pageY - this.offsettop
      });
      this.Draw(_touch.pageX - this.offsetleft, _touch.pageY - this.offsettop, false);
    },
    //结束touch 屏幕
    touchUp(e) {
      this.touchPressed = false;
      this.totalDrawData.push({
        option: this.drawOption,
        data: this.drawData
      });
      this.drawData = [];
      this.uploadDrawData();
    },
    //在屏幕上移动
    touchMove(e) {
      var _touch = e.changedTouches[0];
      if (this.touchPressed) {
        this.drawData.push({
          x: _touch.pageX - this.offsetleft,
          y: _touch.pageY - this.offsettop
        });
        this.drawOption = {
          paintCol: this.paintCol,
          paintSize: this.paintSize
        };
        this.Draw(_touch.pageX - this.offsetleft, _touch.pageY - this.offsettop, true)
      };
    },
    //绘画函数
    Draw(x, y, isDown) {
      if (isDown) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.paintCol;
        this.ctx.lineWidth = this.paintSize;
        this.ctx.lineJoin = "round";
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        this.ctx.closePath();
        this.ctx.stroke();
      }
      this.lastX = x; this.lastY = y;
    },
    // 绘出服务器传递回来的数据
    reDraw() {
      if (this.serverDrawData && this.serverDrawData.length === 0) {
        this.clearArea();
      }
      if (!this.serverDrawData || !this.serverDrawData.length) {
        return;
      }
      this.clearArea();
      this.serverDrawData.forEach((item, index) => {
        this.paintCol = item.option.paintCol;
        this.paintSize = item.option.paintSize;
        this.Draw(item.data[0].x, item.data[0].y, false);
        for (var i = 1; i < item.data.length; i++) {
          this.Draw(item.data[i].x, item.data[i].y, true);
        }
      });
    },
    //清空画布
    clearArea() {
      this.totalDrawData = [];
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      if (this.isPainer) {
        this.uploadDrawData();
      }
    },
    uploadDrawData() {
      api.postDrawguessRoomData({
        roomId: this.$route.params.id,
        drawData: this.totalDrawData
      }).then((response) => {

      }).catch((err) => {
        alert(err);
      });
    }
  }
}
</script>

