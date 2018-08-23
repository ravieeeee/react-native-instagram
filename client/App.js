import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import './config/ReactotronConfig'
const composeStoreWithMiddleware = applyMiddleware(thunk)(createStore);

import NavigationService from './navigation_service';
import AppNavigator from './navigator';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={composeStoreWithMiddleware(reducers)}>
        <AppNavigator ref={navigationRef => {
          NavigationService.setTopLevelNavigator(navigationRef);
        }} />
      </Provider>
    );
  }
}
