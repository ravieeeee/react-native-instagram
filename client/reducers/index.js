import { combineReducers } from 'redux';

function users(state = [], action) {
  switch (action.type) {
    case 'FETCHED_USERS':
      return action.payload;
    default:
      return state;
  }
}

function currentUser(state = {}, action) {
  switch (action.type) {
    case 'FETCHED_CUR_USER':
      return action.payload;
    default:
      return state;
  }
}

function posts(state = [], action) {
  switch (action.type) {
    case 'FETCHED_POSTS':
      return action.payload;
    default:
      return state;
  }
}

function myPosts(state = [], action) {
  switch (action.type) {
    case 'FETCHED_MY_POSTS':
      return action.payload;
    case 'ADDED_POST':
      return [...state, action.payload];
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  currentUser,
  users,
  posts,
  myPosts
});

export default rootReducer;