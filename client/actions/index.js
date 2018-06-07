import axios from 'axios';
import qs from 'qs';
import { AsyncStorage, ToastAndroid } from 'react-native';
import { Config } from '../config';
import NavigationService from '../navigation_service';


export function signin(username, password) {
  return async dispatch => {
    try {
      // 주의!: OAuth2Server는 x-www-form-urlencoded 만 받는다.
      const response = await axios.post(`${Config.server}/api/oauth/token`,
        qs.stringify({
          username: username,
          password: password,
          client_secret: Config.clientSecret,
          client_id: Config.clientId,
          grant_type: 'password'
        }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

      console.log("RESULT", response.data);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      console.log(`Bearer ${response.data.access_token}`);
      await AsyncStorage.setItem('accessToken', response.data.access_token);
      await AsyncStorage.setItem('cur_user', username);
      NavigationService.navigate('App');
    } catch (err) {
      console.log(err.response || err);
      alert('Invalid ID or Password');
    }
  };
}

export function signUp(username, password) {
  return async dispatch => {
    try {
      const response = await axios.post(`${Config.server}/api/users`,
        {
          username: username,
          password: password,
        }, {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      ToastAndroid.show('가입 완료. 로그인하세요', ToastAndroid.SHORT);
      NavigationService.navigate('Auth');
    } catch (err) {
      console.log(err.response || err);
      alert('ID exists.');
    }
  }
}

export function signout() {
  return async dispatch => {
    delete axios.defaults.headers.common['Authorization'];
    await AsyncStorage.clear();
    NavigationService.navigate('Auth');
  };
}

export function fetchUsers() {
  return async dispatch => {
    console.log(axios.defaults.headers.common);
    axios.get(`${Config.server}/api/users`).then( response => {
      dispatch({type: 'FETCHED_USERS', payload: response.data});
    }).catch(err => {
      console.log(err.response);
      if (err.response.status == 401) {
        dispatch(signout());
      } else {
        alert('Network Error');
      }
    });
  };
}

export function fetchPosts() {
  return dispatch => {
    axios.get(`${Config.server}/posts`).then(response => {
      dispatch({type: 'FETCHED_POSTS', payload: response.data});
    }).catch(err => {
      console.log(err.response);
      if (err.response.status == 401) {
        dispatch(signout());
      } else {
        alert('Network Error');
      }
    });
  }
}

export function addPost(title, content) {
  return async dispatch => {
    const name = await AsyncStorage.getItem('cur_user');
    console.log('dispatch는', dispatch);
    
    try {
      axios.get('https://source.unsplash.com/random').then(async response => {
        console.log(response.request.responseURL);
        var new_post = {
          title,
          name,
          image: response.request.responseURL,
          heart: 0,
          content,
        };
        await axios.post(`${Config.server}/posts`,
          new_post, {
            headers: { 'Content-Type': 'application/json' }
          }).then(r => {
            console.log('새 포스트', new_post);
            console.log('dispatch는', dispatch);
            dispatch({type: 'ADDED_POST', payload: new_post});
          }).catch(err => {
            console.log('!!1',err);
          });
      }).catch(err => {
        console.log(err.response);
      });

      ToastAndroid.show('글이 등록되었습니다.', ToastAndroid.SHORT);
    } catch (err) {
      console.log(err.response || err);
      alert('add err');
    }
  }
}
