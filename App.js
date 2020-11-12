import React, { useState } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { enableScreens} from 'react-native-screens'
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
import { AppLoading } from 'expo';

import Navigator from './Navigator';
import Reducer from './store/reducers'

enableScreens();

const store = createStore(Reducer, applyMiddleware(ReduxThunk));

const fetchFonts = () =>  {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (<AppLoading
            startAsync={fetchFonts} 
            onFinish={() => setFontLoaded(true)} 
           />);
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
    
  );
}

