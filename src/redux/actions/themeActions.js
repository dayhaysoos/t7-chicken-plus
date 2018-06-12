import { createAction } from 'redux-actions';

import createConstants from 'namespace-constants';

export const ACTION_TYPES = createConstants('app:theme', [
    'GET_COLOR_THEME'
]);

export const getColorTheme = createAction(ACTION_TYPES.GET_COLOR_THEME);

export const dispatchGetColorTheme = (theme) => dispatch => {
    dispatch(getColorTheme(theme));
};