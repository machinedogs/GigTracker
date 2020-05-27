import React from 'react';
import GigTrackerNavigator from './navigation/GigTrackerNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import eventsReducer from './store/reducers/events'
import userEventsReducer from './store/reducers/userEvents';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
  events: eventsReducer,
  userEvents: userEventsReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store} >
      <GigTrackerNavigator />
    </Provider>
  );
};