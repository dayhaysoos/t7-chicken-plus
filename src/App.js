import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar, SafeAreaView } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { 
    faStar,
    faChevronLeft,
    faBars,
    faBook,
    faFilter,
    faArrowLeft,
    faArrowRight,
    faTh,
    faList,
    faSearch,
    faPlay,
    faBookOpen,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';

import {
    faStar as farFaStar
} from '@fortawesome/free-regular-svg-icons';


import { Provider } from 'react-redux';
import configureStore from './redux/store';
import * as paidActions from './redux/actions/paidActions';

import DrawerStack from './Routes';

import SplashScreen from 'react-native-splash-screen';
import { useScreens } from 'react-native-screens';

useScreens();

library.add(
    fab,
    faStar,
    faChevronLeft,
    faBars,
    faBook,
    faFilter,
    faArrowLeft,
    faArrowRight,
    faTh,
    faList,
    faSearch,
    faPlay,
    faBookOpen,
    farFaStar,
    faVideo
);

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


export default App;
