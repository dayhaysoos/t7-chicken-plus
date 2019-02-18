import { ACTION_TYPES } from '../actions/settingsActions';

import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
    listView: true
};


// const toggleListView = (state) => ({
//     ...state,
//     listView: !state.listView
// });

const toggleListView = (state) => ({
    ...state,
    listView: !state.listView
});

const settingsReducer = handleActions(
    {
        [ACTION_TYPES.TOGGLE_VIEW]: toggleListView
    },
    INITIAL_STATE);

export default settingsReducer;