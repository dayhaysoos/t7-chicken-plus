import { handleActions } from 'redux-actions';
import { ACTION_TYPES } from '../actions/favoriteActions';

export const INITIAL_STATE = {
    characters: {}
};

const toggleCharacterStar = (state, { payload: label }) => {
    const newState = {...state};

    if (newState.characters[label]) delete newState.characters[label];
    else newState.characters[label] = true;

    return newState;
};

const favoriteReducer = handleActions(
    {
        [ACTION_TYPES.TOGGLE_CHARACTER_STAR]: toggleCharacterStar
    },
    INITIAL_STATE
);

export default favoriteReducer;
