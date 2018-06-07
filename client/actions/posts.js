import axios from 'axios';
import { AsyncStorage, ToastAndroid } from 'react-native';
import { Config } from '../config';
import NavigationService from '../navigation_service';


export function fetchPosts() {
  return async dispatch => {
    try {
      var name = await AsyncStorage.getItem('cur_user');
      var response = await axios.get(`${Config.server}/posts/others/${name}`);
      dispatch({type: 'FETCHED_POSTS', payload: response.data});
    } catch (err) {
      console.log(err.response || err);
    }
  }
}

export function fetchMyPosts() {
  return async dispatch => {
    try {
      var name = await AsyncStorage.getItem('cur_user');
      var response = await axios.get(`${Config.server}/posts/mine/${name}`);
      dispatch({type: 'FETCHED_MY_POSTS', payload: response.data});
    } catch (err) {
      console.log(err.response || err);
    }
  }
}

export function addPost(title, content) {
  return dispatch => {
    ToastAndroid.show('글이 등록되었습니다.', ToastAndroid.SHORT);
    Promise.all([
      AsyncStorage.getItem('cur_user'),
      axios.get('https://picsum.photos/400/200/?random')
    ]).then(([name, response]) => {
      console.log(response);
      var new_post = {
        title,
        name,
        image: response.request.responseURL,
        heart: 0,
        content,
      };
      return axios.post(`${Config.server}/posts`,
        new_post, {
          headers: { 'Content-Type': 'application/json' }
        });
    }).then(post => {
      dispatch({type: 'ADDED_POST', payload: post.data});
      ToastAndroid.show('글이 등록되었습니다.', ToastAndroid.SHORT);
      NavigationService.navigate('Profile');
    }).catch(err => {
      console.log(err.response || err);
    });
  }
}
