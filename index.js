import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';

import App from './src/App';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(
    [
        'Warning: isMounted(...) is deprecated',
        'Require cycles are allowed'
    ]
);
AppRegistry.registerComponent('t7chickenplus', () => App);
