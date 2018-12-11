import { handleActions } from 'redux-actions';
import { ACTION_TYPES } from '../actions/favoriteActions';

export const INITIAL_STATE = {
    characters: {},
    moves: {
        akuma: {},
        alisa: {},
        anna: {},
        armorking: {},
        asuka: {},
        bob: {},
        bryan: {},
        deviljin: {},
        dragunov: {},
        eddy: {},
        eliza: {},
        feng: {},
        geese: {},
        gigas: {},
        heihachi: {},
        hwoarang: {},
        jack: {},
        jin: {},
        josie: {},
        katarina: {},
        kazumi: {},
        kazuya: {},
        king: {},
        kuma: {},
        lars: {},
        law: {},
        lee: {},
        lei: {},
        leo: {},
        lili: {},
        luckychloe: {},
        masterraven: {},
        marduk: {},
        miguel: {},
        nina: {},
        noctis: {},
        panda: {},
        paul: {},
        steve: {},
        xiayou: {},
        yoshimitsu: {}
    }
};

const toggleCharacterStar = (state, { payload: label }) => {

    const newState = { ...state };

    if (newState.characters[label]) delete newState.characters[label];
    else newState.characters[label] = true;

    return newState;
};

const toggleMoveStar = (state, { payload: moveID }) => {
    const label = moveID.split('_')[0];
    const newState = { ...state, moves: { ...state.moves } };

    newState.moves[label] = { ...state.moves[label] };

    if (newState.moves[label][moveID]) delete newState.moves[label][moveID];
    else newState.moves[label][moveID] = true;

    return newState;
};

const favoriteReducer = handleActions(
    {
        [ACTION_TYPES.TOGGLE_CHARACTER_STAR]: toggleCharacterStar,
        [ACTION_TYPES.TOGGLE_MOVE_STAR]: toggleMoveStar
    },
    INITIAL_STATE
);

export default favoriteReducer;
