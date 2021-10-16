/**
 * @format
 */

import React, {useEffect} from 'react';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';
import configureStore from './Store/store';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
const {store, persistor} = configureStore();

messaging().setBackgroundMessageHandler(async remoteMessage => {

console.log("setBackgroundMessageHandler",remoteMessage.notification)


   
});






const Root = () => (





  
  

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>



);

AppRegistry.registerComponent(appName, () => Root);
