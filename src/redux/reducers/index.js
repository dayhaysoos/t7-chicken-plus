import { combineReducers } from 'redux';
import characterData from './characterReducer';
import theme from './themeReducer';
import settings from './settingsReducer';
import favorites from './favoriteReducer';

const rootReducer = combineReducers({
    characterData,
    theme,
    settings,
    favorites
});

export default rootReducer;
