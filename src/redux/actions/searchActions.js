import { createAction } from 'redux-actions';
import createConstants from 'namespace-constants';

export const ACTION_TYPES = createConstants('search', [
    'SEARCH_PROFILE_MOVES',
    'RESET_SEARCH_BAR',
]);

export const searchProfileMoves = createAction([ACTION_TYPES.SEARCH_PROFILE_MOVES]);

export const resetSearchBar = createAction([ACTION_TYPES.RESET_SEARCH_BAR]);