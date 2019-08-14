import React from 'react';
import HomeScreen from './containers/HomeScreen';
import About from './containers/About';
import Support from './containers/Support';
import Sponsors from './containers/Sponsors';
import CharacterSelect from './containers/CharacterSelect';
import CharacterProfile from './containers/CharacterProfile';
import CharacterMove from './containers/CharacterMove';
import RemoveAds from './containers/RemoveAds';
import WhatsNew from './containers/WhatsNew';
import Receipt from './containers/Receipt';
import AdRemoval from './containers/AdRemoval';
import ApplePayment from './containers/ApplePayment';
import AndroidPayment from './containers/AndroidPayment';
import RightMenu from './components/RightMenu';
import SponsorScreen from './containers/SponsorScreen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';



import { createStackNavigator, createDrawerNavigator, createAppContainer, DrawerActions } from 'react-navigation';

const BackButton = () => (
    <FontAwesomeIcon size={32} color='#FF412C' icon={'chevron-left'} />
);

const RightDrawer = createDrawerNavigator({
    CharacterProfile: CharacterProfile,
}, {
        contentComponent: ({activeItemKey}) => <RightMenu activeItemKey={activeItemKey}/>,
        drawerPosition: 'right',
        getCustomActionCreators: (_route, key) => ({
            openRightDrawer: () => DrawerActions.openDrawer({ key }),
            closeRightDrawer: () => DrawerActions.closeDrawer({ key }),
            toggleRightDrawer: () => DrawerActions.toggleDrawer({ key }),
        }),
    }
);

const RightDrawerLegend = createDrawerNavigator({
    CharacterMove: CharacterMove,
}, {
        contentComponent: ({activeItemKey}) => <RightMenu activeItemKey={activeItemKey}/>,
        drawerPosition: 'right',
        getCustomActionCreators: (_route, key) => ({
            openRightDrawer: () => DrawerActions.openDrawer({ key }),
            closeRightDrawer: () => DrawerActions.closeDrawer({ key }),
            toggleRightDrawer: () => DrawerActions.toggleDrawer({ key }),
        }),
    }
);

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: '#19181C',
        borderBottomWidth: 0
    },
    headerBackImage: <BackButton />,
    headerBackTitle: null
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
    SponsorScreen: {
        screen: SponsorScreen,
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
        screen: RightDrawer,
        navigationOptions: defaultNavOptions
    },
    CharacterMove: {
        screen: RightDrawerLegend,
        navigationOptions: defaultNavOptions
    },
    WhatsNew: {
        screen: WhatsNew,
        navigationOptions: defaultNavOptions
    },
    Receipt: {
        screen: Receipt,
        navigationOptions: defaultNavOptions
    },
    AdRemoval: {
        screen: AdRemoval,
        navigationsOptions: defaultNavOptions
    },
    ApplePayment: {
        screen: ApplePayment,
        navigationsOptions: defaultNavOptions
    },
    AndroidPayment: {
        screen: AndroidPayment,
        navigationsOptions: defaultNavOptions
    },
    initialRouteName: 'Home'
});

const DrawerStack = createDrawerNavigator({
    Home: RootStack,
}, {
        contentComponent: HomeScreen,
        drawerPosition: 'left',
        getCustomActionCreators: (_route, key) => ({
            openLeftDrawer: () => DrawerActions.openDrawer({ key }),
            closeLeftDrawer: () => DrawerActions.closeDrawer({ key }),
            toggleLeftDrawer: () => DrawerActions.toggleDrawer({ key }),
        }),
    });

export default createAppContainer(DrawerStack);
