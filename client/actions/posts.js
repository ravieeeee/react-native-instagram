import axios from 'axios';
import { ToastAndroid } from 'react-native';
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
    // TODO: Loading
    // ToastAndroid.show('글이 등록되었습니다.', ToastAndroid.SHORT);
    Promise.all([
      getState().currentUser,
      axios.get('https://picsum.photos/400/200/?random')
    ]).then(([currentUser, response]) => {
      var new_post = {
        title,
        user_id: currentUser.id,
        user_name: currentUser.username,
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

export function like(post_id, idx, img, owner_id) {
  return async (dispatch, getState) => {
    try {
      var like_name = await getState().currentUser.username;
      var new_log = {
        like_name,
        owner_id,
        img
      };
      
      await axios.put(`${Config.server}/posts/like/${post_id}`,
      new_log, {
        headers: { 'Content-Type': 'application/json' }
      });

      const changed_item = await axios.get(`${Config.server}/posts/${post_id}`);
      dispatch({type: 'INCREMENT_LIKE', idx, changed_item: changed_item.data });
    } catch (err) {
      console.log(err.response || err);
      alert('error');
    }
  }
}

export function fetchLikeLogs() {
  return async (dispatch, getState) => {
    try {
      var id = await getState().currentUser.id;
      var response = await axios.get(`${Config.server}/posts/like/${id}`);
      dispatch({type: 'FETCHED_LOGS', payload: response.data});
    } catch (err) {
      console.log(err.response || err);
    }
  }
}