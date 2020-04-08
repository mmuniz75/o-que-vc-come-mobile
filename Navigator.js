import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';

import Colors from './constants/Colors'
import { Platform } from 'react-native';

const Navigator = createStackNavigator({
    Main : { 
        screen : SearchScreen,
        navigationOptions : { headerTitle: 'O que você come ?'}
    },
    Register : { 
        screen : RegisterScreen,
        navigationOptions : {headerTitle: 'Cadastro'}
    },
},{
    defaultNavigationOptions : {
        headerStyle: {
            backgroundColor: Platform.OS == 'android' ? Colors.primaryColor : '',
        },
        headerTintColor: Platform.OS == 'android' ? 'white' : Colors.primaryColor
    }
})

export default createAppContainer(Navigator);