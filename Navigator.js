import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';

const Navigator = createStackNavigator({
    Main : SearchScreen,
    Register : RegisterScreen,
})

export default createAppContainer(Navigator);