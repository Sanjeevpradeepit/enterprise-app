import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import App from './App';
import { name as appName } from './app.json';

// import { handleBackground } from './src/core/notification';

// Register background message handler
// messaging().setBackgroundMessageHandler(handleBackground);

// Register the application
AppRegistry.registerComponent(appName, () => App);