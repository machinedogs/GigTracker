import React, { useState } from 'react';
import GigTrackerNavigator from './navigation/GigTrackerNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import eventsReducer from './store/reducers/events'
import userReducer from './store/reducers/user';

const rootReducer = combineReducers({
  events: eventsReducer,
  user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'jack-silver': require('./assets/fonts/Jacksilver.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store} >
      <GigTrackerNavigator />
    </Provider>
  );
};