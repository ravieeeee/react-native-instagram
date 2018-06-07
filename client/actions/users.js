import axios from 'axios';
import qs from 'qs';
import { AsyncStorage } from 'react-native';
import { Config } from '../config';
import NavigationService from '../navigation_service';


export function signin(username, password) {
  return async dispatch => {
    try {
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

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      await AsyncStorage.setItem('accessToken', response.data.access_token);
      // TODO: 스토어에 저장 -> 딴데서 가져오기
      dispatch({type: 'SINGED_IN', payload: username});
      
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