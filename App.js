import React, { useState } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import eventsReducer from './store/reducers/events'
import userReducer from './store/reducers/user';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  events: eventsReducer,
  user: userReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));
//Look into, andriod issue where you get warnings when communicating with firebase/api
YellowBox.ignoreWarnings(['Setting a timer']);
// Get error for having a dropdown picker (iOS) in create event screen
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const fetchFonts = async() => {
  await Font.loadAsync({
    'jack-silver': require('./assets/fonts/Jacksilver.ttf'),
    'dumbledor': require('./assets/fonts/dumbledor.3-cut-up.ttf'),
    'Helvetica-Bold': require('./assets/fonts/Helvetica-Bold-Font.ttf'),
    'Helvetica': require('./assets/fonts/Helvetica.ttf'),
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
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
      <AppNavigator />
    </Provider>
  );
};