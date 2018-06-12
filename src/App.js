import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Provider } from 'react-redux';
import store from './redux/store';

import HomeScreen from './containers/HomeScreen';

import { createStackNavigator } from 'react-navigation';

import { ThemeProvider } from 'styled-components';

import { defaultTheme } from './themes/defaultTheme';



class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
            </View>
        );
    }
}


const RootStack = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Details: {
        screen: DetailsScreen
    },
    initialRouteName: 'Home',
});

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootStack theme={defaultTheme} />
            </Provider>
        );
    }
}