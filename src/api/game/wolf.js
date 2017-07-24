const msgObj={
    time:50,
    title:'天亮了',
    content:'昨晚[5]号玩家死亡，请[6]号玩家发言'
}
function countDown(){
    if(msgObj.time == 0){
        
        return
    }
    setTimeout(function(){
        msgObj.time --;
        countDown();
    },1000);
}

export default{
    name:'wolf',
    msgObj,
    countDown
}