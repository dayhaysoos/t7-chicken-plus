import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar, SafeAreaView } from 'react-native';

import { Provider } from 'react-redux';
import configureStore from './redux/store';
import * as paidActions from './redux/actions/paidActions';

import DrawerStack from './Routes';
import CodePush from 'react-native-code-push';

import SplashScreen from 'react-native-splash-screen';

const { store, persistor } = configureStore;

class App extends Component {
  componentDidMount = async () => {
      try {
      // store.dispatch(paidActions.getPurchaseHistory());
      } catch (error) {
          console.log('error', error);
      }
      SplashScreen.hide();
  };
  render() {
      return (
          <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
              <Provider store={store}>
                  <React.Fragment>
                      <StatusBar translucent={false} barStyle="light-content" />
                      <PersistGate loading={null} persistor={persistor}>
                          <DrawerStack />
                      </PersistGate>
                  </React.Fragment>
              </Provider>
          </SafeAreaView>
      );
  }
}

let codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_START,
    installMode: CodePush.InstallMode.IMMEDIATE,
    updateDialog: true
};

export default CodePush(codePushOptions)(App);
