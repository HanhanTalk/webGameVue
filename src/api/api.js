import axios from 'axios';

axios.defaults.baseURL = '/';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;


function checkStatus(response) {
    if (response.status === 200 || response.status === 304) {
        if (!response.data.status) {
          alert(response.data.desc);
          throw response.data.desc;
        }
        return response = response.data.data;
    }
    alert('服务器返回错误');
    throw '服务器返回错误';
}

const _get = (url, data) => {
  return axios({
    method: 'get',
    url: url,
    params: data,
    timeout: 3000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
  }).then(checkStatus);
}

const _post = (url, data) => {
  return axios({
    method: 'post',
    url: url,
    data: data,
    timeout: 3000
  }).then(checkStatus);
}

const makeGet = (url) => {
  return (param) => {
    return _get(url, param);
  }
}

const makePost = (url) => {
  return (param) => {
    return _post(url, param);
  }
}

const signUp = (param) => {
  return _post('/users/signup', param);
}

const signIn = (param) => {
  return _post('/users/signin', param);
}

const signOut = (param) => {
  return _post('/users/signout', param);
}
const info = (param) => {
   return _get('/users/info.json',param);
}
const joinDrawguessRoom = (param) =>{
    return _post('/room/drawguess/join',param);
}

const getDrawguessRoomInfo = (param) => {
  return _get('/room/drawguess/info', param);
}

const getDrawguessRoomWord = (param) => {
  return _get('/room/drawguess/words', param);
}

const postDrawguessRoomWord = (param) => {
  return _post('/room/drawguess/chooise/words', param);
}

const postDrawguessRoomData = (param) => {
  return _post('/room/drawguess/drawdata', param);
} 

const postDrawguessRoomAnswer = (param) => {
  return _post('/room/drawguess/answer', param);
}

// 加入或者创建一个房间
const newWolfRoom8 = makePost('/wolfroom/join/8');

// 获取房间的信息
const getWolfRoomInfo = makeGet('/wolfroom/info');

export default {
  signUp,
  signIn,
  signOut,
  info,
  joinDrawguessRoom,
  getDrawguessRoomInfo,
  getDrawguessRoomWord,
  postDrawguessRoomWord,
  postDrawguessRoomData,
  postDrawguessRoomAnswer,
  newWolfRoom8,
  getWolfRoomInfo
}