import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import configureStore from './redux/store';

import { DrawerStack } from './Routes';
import CodePush from 'react-native-code-push';

const { store, persistor } = configureStore;

class App extends Component {
    render() {

        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <DrawerStack />
                </PersistGate>
            </Provider>
        );
    }
}

export default CodePush(App);