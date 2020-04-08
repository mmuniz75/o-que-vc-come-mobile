import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigator from './Navigator';
import { enableScreens} from 'react-native-screens'

enableScreens();

const fetchFonts = () =>  {
  console.log('loading font');
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
    <Navigator />
  );
}

