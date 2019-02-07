import { createAction } from 'redux-actions';

import createConstants from 'namespace-constants';

export const ACTION_TYPES = createConstants('filter', [
    'APPLY_FILTER',
    'RESET_FILTERS',
    'REMOVE_FILTER',
]);

export const applyFilter = createAction(ACTION_TYPES.APPLY_FILTER);

export const resetFilters = createAction(ACTION_TYPES.RESET_FILTERS);

export const removeFilter = createAction(ACTION_TYPES.REMOVE_FILTER);
