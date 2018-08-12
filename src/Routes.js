import HomeScreen from './containers/HomeScreen';
import About from './containers/About';
import Support from './containers/Support';
import Sponsors from './containers/Sponsors';
import CharacterSelect from './containers/CharacterSelect';
import CharacterProfile from './containers/CharacterProfile';

import { createStackNavigator } from 'react-navigation';

export const RootStack = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    About: {
        screen: About
    },
    Sponsors: {
        screen: Sponsors
    },
    Support: {
        screen: Support
    },
    CharacterSelect: {
        screen: CharacterSelect
    },
    CharacterProfile: {
        screen: CharacterProfile
    },
    initialRouteName: 'Home'
});