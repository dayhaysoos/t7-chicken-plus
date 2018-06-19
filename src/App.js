import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './redux/store';

import { RootStack } from './Routes';
import CodePush from 'react-native-code-push';


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootStack />
            </Provider>
        );
    }
}

export default CodePush(App);