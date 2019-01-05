import { handleActions } from 'redux-actions';
import { ACTION_TYPES } from '../actions/characterActions';

import { characterMoves } from '../../constants/characterMoves';

export const INITIAL_STATE = {
    isLoadingCharacterData: false,
    allCharacterData: [],
    characterData: [],
    characterDataError: [],
    selectedCharacterMoves: {},
    moveData: [],
    currentAttack: null,
};

const getCharacterDataPending = (state) => ({
    ...state,
    isLoadingCharacterData: true
});

const getCharacterDataFail = (state, { payload: characterDataError }) => ({
    ...state,
    isLoadingCharacterData: false,
    characterDataError,
    characterData: Object.values(characterMoves)
});

const getCharacterDataSuccess = (state, { payload: characterData }) => ({
    ...state,
    isLoadingCharacterData: false,
    ...characterData
});

/**
 * @function updateMoveData
 * @describe updates currentAttack with move id and updates moveData with selected attack
 * @param {Object} state 
 * @param {String} param1 character move id
 * @returns {Object} updated state
 */
const updateMoveData = (state, { payload: id }) => ({
    ...state,
    currentAttack: id,
    moveData: state.selectedCharacterMoves[id]
});

const updateSelectedCharacterMoves = (state, { payload: moveList }) => ({
    ...state,
    selectedCharacterMoves: moveList
});

const incrementMoveIndex = (state) => {
    const currentAttackNumber = parseInt(state.currentAttack.split('_')[1]);
    const currentAttackCharacter = state.currentAttack.split('_')[0];
    return {
        ...state,
        currentAttack: `${currentAttackCharacter}_${currentAttackNumber + 1}`,
        moveData: state.selectedCharacterMoves[`${currentAttackCharacter}_${currentAttackNumber + 1}`]
    };
};

const decrementMoveIndex = (state) => {
    const currentAttackNumber = parseInt(state.currentAttack.split('_')[1]);
    const currentAttackCharacter = state.currentAttack.split('_')[0];

    return {
        ...state,
        currentAttack: `${currentAttackCharacter}_${currentAttackNumber - 1}`,
        moveData: state.selectedCharacterMoves[`${currentAttackCharacter}_${currentAttackNumber - 1}`]
    };
};

const characterDataReducer = handleActions(
    {
        [ACTION_TYPES.GET_CHARACTER_DATA_PENDING]: getCharacterDataPending,
        [ACTION_TYPES.GET_CHARACTER_DATA_FAIL]: getCharacterDataFail,
        [ACTION_TYPES.GET_CHARACTER_DATA_SUCCESS]: getCharacterDataSuccess,
        [ACTION_TYPES.UPDATE_MOVE_DATA]: updateMoveData,
        [ACTION_TYPES.UPDATE_SELECTED_CHARACTER_MOVES]: updateSelectedCharacterMoves,
        [ACTION_TYPES.INCREMENT_MOVE_INDEX]: incrementMoveIndex,
        [ACTION_TYPES.DECREMENT_MOVE_INDEX]: decrementMoveIndex
    },
    INITIAL_STATE);

export default characterDataReducer;
