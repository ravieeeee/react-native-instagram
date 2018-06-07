import { combineReducers } from 'redux';

function users(state = [], action) {
  switch (action.type) {
    case 'FETCHED_USERS':
      return action.payload;
    default:
      return state;
  }
}

function posts(state = [], action) {
  switch (action.type) {
    case 'FETCHED_POSTS':
      return action.payload;
    case 'ADDED_POST':
      console.log('state 변화', [...state.posts, action.payload]);
      return [...state.posts, action.payload];
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  users,
  posts
});

export default rootReducer;