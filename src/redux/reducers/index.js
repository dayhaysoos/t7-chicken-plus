import { combineReducers } from 'redux';
import characterDataReducer from './characterReducer';
import theme from './themeReducer';
import settings from './settingsReducer';
import favorites from './favoriteReducer';

const rootReducer = combineReducers({
    characterData: characterDataReducer,
    theme,
    settings,
    favorites
});

export default rootReducer;
