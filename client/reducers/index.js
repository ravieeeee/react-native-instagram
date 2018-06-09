import { combineReducers } from 'redux';


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
    case 'INCREMENT_LIKE':
      return state.map((item, index) => {
        if (index !== action.idx) {
          return item;
        }

        return {
          ...item,
          ...action.changed_item
        };
      });
    default:
      return state;
  }
}

function myPosts(state = [], action) {
  switch (action.type) {
    case 'FETCHED_MY_POSTS':
      return action.payload;
    case 'ADDED_POST':
      return [action.payload, ...state];
    default:
      return state;
  }
}

function likelogs(state = [], action) {
  switch (action.type) {
    case 'FETCHED_LOGS':
      return action.payload;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  currentUser,
  posts,
  myPosts,
  likelogs
});

export default rootReducer;