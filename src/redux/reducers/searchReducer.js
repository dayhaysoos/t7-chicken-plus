import { handleActions } from 'redux-actions';
import { ACTION_TYPES } from '../actions/searchActions';

const INITIAL_STATE = {
    profileInput: ''
};

const searchProfileMoves = (state, { payload: input }) => ({
    ...state,
    profileInput: input
});

const searchReducer = handleActions(
    {
        [ACTION_TYPES.SEARCH_PROFILE_MOVES]: searchProfileMoves,
    },
    INITIAL_STATE);

export default searchReducer;