import React from 'react';
import { Text } from 'react-native';
import HomeScreen from './containers/HomeScreen';
import About from './containers/About';
import Support from './containers/Support';
import Sponsors from './containers/Sponsors';
import CharacterSelect from './containers/CharacterSelect';
import CharacterProfile from './containers/CharacterProfile';
import CharacterMove from './containers/CharacterMove';
import RemoveAds from './containers/RemoveAds';

import FontAwesome, { Icons } from 'react-native-fontawesome';


import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';

const BackButton = () => (
    <Text style={{ color: 'red', fontSize: 32, marginLeft: 15 }}>
        <FontAwesome>{Icons.chevronLeft}</FontAwesome>
    </Text>
);

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: '#19181C',
    },
    headerBackImage: <BackButton />
};

const RootStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: defaultNavOptions
    },
    About: {
        screen: About,
        navigationOptions: defaultNavOptions
    },
    Sponsors: {
        screen: Sponsors,
        navigationOptions: defaultNavOptions
    },
    Support: {
        screen: Support,
        navigationOptions: defaultNavOptions
    },
    RemoveAds: {
        screen: RemoveAds,
        navigationOptions: defaultNavOptions
    },
    CharacterSelect: {
        screen: CharacterSelect,
        navigationOptions: defaultNavOptions
    },
    CharacterProfile: {
        screen: CharacterProfile,
        navigationOptions: defaultNavOptions
    },
    CharacterMove: {
        screen: CharacterMove,
        navigationOptions: defaultNavOptions
    },
    initialRouteName: 'Home',
});

const DrawerStack = createDrawerNavigator({
    Home: RootStack,
}, {
    contentComponent: HomeScreen
}
);

export default createAppContainer(DrawerStack);
