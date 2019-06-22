import { combineReducers } from 'redux';
import characterData from './characterReducer';
import theme from './themeReducer';
import settings from './settingsReducer';
import favorites from './favoriteReducer';
import filter from './filterReducer';
import search from './searchReducer';
import paid from './paidReducer';

const rootReducer = combineReducers({
    characterData,
    theme,
    settings,
    favorites,
    filter,
    search,
    paid,
});

export default rootReducer;
