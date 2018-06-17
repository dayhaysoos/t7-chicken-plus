import HomeScreen from './containers/HomeScreen';
import About from './containers/About';

import { createStackNavigator } from 'react-navigation';

export const RootStack = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    About: {
        screen: About
    },
    initialRouteName: 'Home'
});