import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { Config } from '../config';
import NavigationService from '../navigation_service';


export function fetchPosts() {
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

export function addPost(title, content, uri) {
  return async (dispatch, getState) => {
    var uriParts = uri.split('.');
    var fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append('image', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    var currentUser = await getState().currentUser;
    formData.append('title', title);
    formData.append('user_id', currentUser.id);
    formData.append('user_name', currentUser.username);
    formData.append('heart', 0);
    formData.append('content', content);

    const post = await axios.post(`${Config.server}/posts`,
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json'
        }
      }
    );

    dispatch({type: 'ADDED_POST', payload: post.data});
    ToastAndroid.show('글이 등록되었습니다.', ToastAndroid.SHORT);
    NavigationService.navigate('Profile');
  }
}

export function like(post_id, idx, img, owner_id) {
  return async (dispatch, getState) => {
    try {
      var liker_name = await getState().currentUser.username;
      var liker_id = await getState().currentUser.id;
      
      var new_log = {
        liker_id,
        liker_name,
        owner_id,
        post_id,
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

export function fetchOthersLikeLogs() {
  return async (dispatch, getState) => {
    try {
      var id = await getState().currentUser.id;
      var response = await axios.get(`${Config.server}/posts/like/other/${id}`);
      dispatch({type: 'FETCHED_OTHER_LOGS', payload: response.data});
    } catch (err) {
      console.log(err.response || err);
    }
  }
}

export function fetchSearched(keyword) {
  return async (dispatch) => {
    try {
      var searched = await axios.get(`${Config.server}/posts/search/${keyword}`);
      console.log(searched.data);
      dispatch({type: 'FETCHED_SEARCHED', payload: searched.data});
    } catch (err) {
      console.log(err.response || err);
    }
  }
}
