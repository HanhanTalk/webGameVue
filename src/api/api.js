import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
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
   return _get('/users/info',param);
}
const joinRoom = (param) =>{
    return _post('/room/drawguess/join',param);
}

export default {
  signUp,
  signIn,
  signOut,
  info,
  joinRoom
}