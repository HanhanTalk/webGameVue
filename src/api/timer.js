
const timer =(_time)=>{
    setTimeout(function(){
        if(_time ==0){
            return;
    }
          _time --;
          _this.timeOut(_time);
    },1000)
}
export default{
    timer
}