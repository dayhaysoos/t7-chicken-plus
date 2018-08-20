import { createAction } from 'redux-actions';

import createConstants from 'namespace-constants';

export const ACTION_TYPES = createConstants('settings', [
    'TOGGLE_MOVELIST_VIEW'
]);

export const toggleMovelistView = createAction(ACTION_TYPES.TOGGLE_MOVELIST_VIEW);
