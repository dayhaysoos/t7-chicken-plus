import { combineReducers } from 'redux';
import characterDataReducer from './characterReducer';
import theme from './themeReducer';
import settings from './settingsReducer';

const rootReducer = combineReducers({
    characterData: characterDataReducer,
    theme,
    settings
});

export default rootReducer;