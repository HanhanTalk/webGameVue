<template>
    <div class="carousel">
        <div class="carousel-ctrl">
            <ol>
                <li v-for="(ctrl,index) in 5" :key="ctrl.id"><a class="dot" href="javascirpt:;" :class="{'active':index === isActive}"></a></li>
            </ol>
        </div>
        <div class="carousel-content" :style="{ left:location +'%'}">
            <ul>
                <li v-for="content in imgdata" :key="content.id"><a href="javascript:;">
                    <img :src="content.imageSrc">
                </a></li>
            </ul>
        </div>
    </div>

</template>
 <style>
  .carousel{
       height:200px;
         width:100%;
         position: relative;
         margin:5px 0;
         overflow: hidden;
     }
     .carousel-ctrl{
         position: absolute;
         bottom:0;
         right:20px;
         z-index:11;
     }
     .carousel-ctrl li{
        margin:0 2px;
     }
     .carousel-content{
         width: 500%;
         height: 200px;
         position: absolute;
         top: 0;
         left: 0;
         z-index:10;
         --webkit-transition:left;
         -moz-transition:left 1s;
         transition:left 1s;
     }
     .carousel-content li,.carousel-content ul{
        height: 100%;

     }
    .carousel-content li{
        display: inline;
        margin:0;
    }
     .carousel-content a{
         display: block;
         float:left;
         width:20%;
         height:100%;
     }
     .carousel-content img{
         width: 100%;
         height:100%;
     }
     .dot{
         display: inline-block;
         width:6px;
         height:6px;
         margin:0 2px;
         background: #ffffff;
         border-radius: 2px;
     }
     .active{
       background:#545454;
     } 
    </style>
<script type="text/ecmascript6">
export default {
  name:'carouselAd',  
  data(){
    return {
        imgdata:[
            {imageSrc:'./src/components/games/carousel-img/001.png'},
            {imageSrc:'./src/components/games/carousel-img/002.png'},
            {imageSrc:'./src/components/games/carousel-img/003.png'},
            {imageSrc:'./src/components/games/carousel-img/004.png'},
            {imageSrc:'./src/components/games/carousel-img/005.png'}
        ],
        location:0,
        isActive:0
    }
  },
  methods:{
      xLink(){
          
      },
      slide(){
          //滚动
        var _this = this;
        function looper(){
            if(_this.location == -4*100){
                _this.location = 0;
                _this.isActive = 0;
            }else{
                _this.location = _this.location - 100;
                _this.isActive = _this.isActive + 1;
            }
        }
        var int = setInterval(looper,5000);
        

      }
  },
  mounted: function(){
      this.slide();
  }
}
</script>
