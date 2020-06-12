import React from 'react';
import GigTrackerNavigator from './navigation/GigTrackerNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import eventsReducer from './store/reducers/events'
import userReducer from './store/reducers/user';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  events: eventsReducer,
  user: userReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export default function App() {
  return (
    <Provider store={store} >
      <GigTrackerNavigator />
    </Provider>
  );
};