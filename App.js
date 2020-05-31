import React from 'react';
import GigTrackerNavigator from './navigation/GigTrackerNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import eventsReducer from './store/reducers/events'
import userReducer from './store/reducers/user';

const rootReducer = combineReducers({
  events: eventsReducer,
  user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store} >
      <GigTrackerNavigator />
    </Provider>
  );
};