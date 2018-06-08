import axios from 'axios';
import { AsyncStorage, ToastAndroid } from 'react-native';
import { Config } from '../config';
import NavigationService from '../navigation_service';


export function fetchPosts(curUser) {
  return async (dispatch, getState) => {
    try {
      var id = await getState().currentUser.id;
      var response = await axios.get(`${Config.server}/posts/others/${id}`);
      dispatch({type: 'FETCHED_POSTS', payload: response.data});
    } catch (err) {
      console.log(err.response || err);
    }
  }
}

export function fetchMyPosts() {
  return async (dispatch, getState) => {
    try {
      var id = await getState().currentUser.id;
      var response = await axios.get(`${Config.server}/posts/mine/${id}`);
      dispatch({type: 'FETCHED_MY_POSTS', payload: response.data});
    } catch (err) {
      console.log(err.response || err);
    }
  }
}

export function addPost(title, content) {
  return (dispatch, getState) => {
    ToastAndroid.show('글이 등록되었습니다.', ToastAndroid.SHORT);
    Promise.all([
      getState().currentUser.id,
      axios.get('https://picsum.photos/400/200/?random')
    ]).then(([user_id, response]) => {
      console.log();
      console.log('response : ', response.request.responseURL);
      console.log('id는', user_id);
      var new_post = {
        title,
        user_id,
        image: response.request.responseURL,
        heart: 0,
        content,
      };
      return axios.post(`${Config.server}/posts`,
        new_post, {
          headers: { 'Content-Type': 'application/json' }
        });
    // }).then(() => {
    }).then(post => {
      dispatch({type: 'ADDED_POST', payload: post.data});
      ToastAndroid.show('글이 등록되었습니다.', ToastAndroid.SHORT);
      NavigationService.navigate('Profile');
    }).catch(err => {
      console.log(err.response || err);
    });
  }
}
