import { combineReducers } from 'redux';
import characterData from './characterReducer';
import theme from './themeReducer';
import settings from './settingsReducer';
import favorites from './favoriteReducer';
import filter from './filterReducer';

const rootReducer = combineReducers({
    characterData,
    theme,
    settings,
    favorites,
    filter
});

export default rootReducer;
