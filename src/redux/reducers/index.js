import { combineReducers } from 'redux';

import characterDataReducer from './characterReducer';
import theme from './themeReducer';

const rootReducer = combineReducers({
    characterData: characterDataReducer,
    theme
});

export default rootReducer;