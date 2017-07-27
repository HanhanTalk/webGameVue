<template>
</template>
<script>
export default {
  name:'gameCanvas',
  props:['paintSize','paintCol'],
  data(){
    return{
      touchPressed:false,
      lastX:'',
      lastY:'',
      ctx:{},
      offsettop:120,
      offsetleft:0
    }
  },
  mounted(){
     this.prepareCanvas();
  },
  methods:{
      //初始化画布
  prepareCanvas(){
  //创建 canvas
      var canvasDiv = document.getElementById('gameCanvas');
      var canvas = document.createElement('canvas');
      canvas.setAttribute('width',canvasDiv.clientWidth);
      canvas.setAttribute('height',canvasDiv.clientHeight);
      canvas.setAttribute('id','mycanvas');
      canvasDiv.appendChild(canvas);
      this.ctx = canvas.getContext('2d');
        //监听touch事件
      canvas.addEventListener('touchstart',this.touchDown,false);
      canvas.addEventListener('touchmove',this.touchMove,false);
      canvas.addEventListener('touchend',this.touchUp,false);

  
},  
  //开始touch 屏幕
  touchDown(e){
     var _touch=e.changedTouches[0];
     this.touchPressed = true;
     this.Draw(_touch.pageX - this.offsetleft,_touch.pageY - this.offsettop,false);
   },
   //结束touch 屏幕
   touchUp(e){
     this.touchPressed = false;
   },
  //在屏幕上移动
    touchMove(e){
     var _touch = e.changedTouches[0];
    if(this.touchPressed){
      this.Draw(_touch.pageX - this.offsetleft,_touch.pageY - this.offsettop,true)
    };
  },
  //绘画函数
    Draw(x,y,isDown){
    if(isDown){
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.paintCol;
      this.ctx.lineWidth = this.paintSize;
      this.ctx.lineJoin = "round";
      this.ctx.moveTo(this.lastX,this.lastY);
      this.ctx.lineTo(x,y);
      this.ctx.closePath();
      this.ctx.stroke();
    }
    this.lastX = x; this.lastY = y;
  },
  //清空画布
    clearArea(){
    this.ctx.setTransform(1,0,0,1,0,0);
    this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
  
  },
 
  }
  }
</script>

