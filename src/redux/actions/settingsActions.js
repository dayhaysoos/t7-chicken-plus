import { createAction } from 'redux-actions';

import createConstants from 'namespace-constants';

export const ACTION_TYPES = createConstants('settings', [
    'TOGGLE_VIEW'
]);

export const toggleView = createAction(ACTION_TYPES.TOGGLE_VIEW);

export const toggleListView = () => dispatch => {
    dispatch(toggleView());
};