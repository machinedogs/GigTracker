import React from 'react';
import GigTrackerNavigator from './navigation/GigTrackerNavigator';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import eventsReducer from './store/reducers/events'
import userEventsReducer from './store/reducers/userEvents';

const rootReducer = combineReducers({
  events: eventsReducer,
  userEvents: userEventsReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store} >
      <GigTrackerNavigator />
    </Provider>
  );
};