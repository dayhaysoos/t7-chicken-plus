import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import configureStore from './redux/store';

import { DrawerStack } from './Routes';
import CodePush from 'react-native-code-push';

import SplashScreen from 'react-native-splash-screen';

const { store, persistor } = configureStore;

class App extends Component {

    componentDidMount = () => {
        // SplashScreen.hide();
    }
    render() {
        return (
            <Provider store={store}>
                <React.Fragment>
                    <StatusBar translucent={false} barStyle="light-content" />
                    <PersistGate loading={null} persistor={persistor}>
                        <DrawerStack />
                    </PersistGate>
                </React.Fragment>
            </Provider>
        );
    }
}

export default CodePush(App);
