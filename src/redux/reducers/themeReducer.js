import { defaultTheme } from '../../themes/defaultTheme';

import { ACTION_TYPES } from '../actions/themeActions';

import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
    ...defaultTheme
};

const getColorTheme = (state, { payload: theme }) => ({
    ...state,
    theme
});

const themeReducer = handleActions(
    {
        [ACTION_TYPES.GET_COLOR_THEME]: getColorTheme
    },
    INITIAL_STATE);

export default themeReducer;