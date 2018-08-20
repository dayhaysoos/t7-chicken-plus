import { ACTION_TYPES } from '../actions/settingsActions';

import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
    listView: true
};


const toggleMovelistView = (state) => ({
    ...state,
    listView: !state.listView
});

const settingsReducer = handleActions(
    {
        [ACTION_TYPES.TOGGLE_MOVELIST_VIEW]: toggleMovelistView
    },
    INITIAL_STATE);

export default settingsReducer;