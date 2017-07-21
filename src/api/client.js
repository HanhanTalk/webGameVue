import store from '../store/index'
//模拟其他玩家数据
const arr = [
  {    
        uid:'10001',
        accout:'deadpool',
        password:'123456',
        nick:'死侍',
        ulevel:'18',
        gold:'1000',
        flower:'2',
        portrait:'./src/assets/userpic/user-01.jpg'
    },
    {    
        uid:'10002',
        accout:'thor',
        password:'123456',
        nick:'雷神',
        ulevel:'2',
        gold:'1000',
        flower:'2',
        portrait:'./src/assets/userpic/user-02.jpg'
    },
   {    
        uid:'10004',
        accout:'batman',
        password:'123456',
        nick:'蝙蝠侠',
        ulevel:'16',
        gold:'1000',
        flower:'2',
        portrait:'./src/assets/userpic/user-04.jpg'
    },
  {    
        uid:'10005',
        accout:'ironman',
        password:'123456',
        nick:'钢铁侠',
        ulevel:'20',
        gold:'1000',
        flower:'2',
        portrait:'./src/assets/userpic/user-05.jpg'
    },
   {    
        uid:'10006',
        accout:'spiderman',
        password:'123456',
        nick:'蜘蛛侠',
        ulevel:'15',
        gold:'1000',
        flower:'2',
        portrait:'./src/assets/userpic/user-06.jpg'
    },
     {    
        uid:'10007',
        accout:'Rookie',
        password:'123456',
        nick:'Rookie',
        ulevel:'15',
        gold:'1000',
        flower:'2',
        portrait:'./src/assets/userpic/user-07.jpg'
    },
     {   
        uid:'10008',
        accout:'Hansir',
        password:'123456',
        nick:'Hansir',
        ulevel:'15',
        gold:'1000',
        flower:'2',
        portrait:'./src/assets/userpic/user-08.jpg'
    }
]
const client = {
    arr8:[],
    playerNum:'',
    data(){
        return {
            store
        }
    },
    //获取所选游戏模式的人数
    peopleNum:function(num){
        //新建一个空数组，模拟数据合并数组用
        let newArr = [];
        this.arr8 = arr.concat(newArr);

            //将当前用户数据传给obj，push到一个数组里
         let obj = {
             uid:store.state.userInfo.uid,
             nick:store.state.userInfo.nick,
             portrait:store.state.userInfo.portrait
         };
    //游戏人数为8人
        if(num == 8){
             if(this.arr8.length < 9){
                this.arr8.push(obj);
             }
        }
    //游戏人数为10人
        if(num == 10){
            
        }
    //游戏人数为12人
        if(num ==12){

        }
    }
};

export default client