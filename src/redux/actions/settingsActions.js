import { createAction } from 'redux-actions';

import createConstants from 'namespace-constants';

export const ACTION_TYPES = createConstants('settings', [
    'TOGGLE_VIEW'
]);

export const toggleListView = createAction(ACTION_TYPES.TOGGLE_VIEW);
