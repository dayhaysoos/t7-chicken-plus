import React from 'react';
import { Text } from 'react-native';
import HomeScreen from './containers/HomeScreen';
import About from './containers/About';
import Support from './containers/Support';
import Sponsors from './containers/Sponsors';
import CharacterSelect from './containers/CharacterSelect';
import CharacterProfile from './containers/CharacterProfile';
import CharacterMove from './containers/CharacterMove';

import FontAwesome, { Icons } from 'react-native-fontawesome';


import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

const BackButton = () => (
    <Text style={{ color: 'red', fontSize: 18, marginLeft: 15 }}>
        <FontAwesome>{Icons.chevronLeft}</FontAwesome>
    </Text>
);

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: '#19181C',
    },
    headerBackImage: <BackButton />
};

export const RootStack = createStackNavigator({
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

export const DrawerStack = createDrawerNavigator({
    Home: RootStack,
}, {
    contentComponent: HomeScreen
}
);
