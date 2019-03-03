import { handleActions } from 'redux-actions';
import { ACTION_TYPES } from '../actions/searchActions';

const INITIAL_STATE = {
    profileInput: '',
};

const searchProfileMoves = (state, { payload: input }) => ({
    ...state,
    profileInput: input
});

const resetSearchBar = (state) => ({
    ...state,
    profileInput: '',
});

const searchReducer = handleActions(
    {
        [ACTION_TYPES.SEARCH_PROFILE_MOVES]: searchProfileMoves,
        [ACTION_TYPES.RESET_SEARCH_BAR]: resetSearchBar
    },
    INITIAL_STATE);

export default searchReducer;