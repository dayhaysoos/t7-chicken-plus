import { handleActions } from 'redux-actions';
import { ACTION_TYPES } from '../actions/characterActions';

import { initialData } from '../../utils/initialData';


export const INITIAL_STATE = {
    isLoadingCharacterData: false,
    allCharacterData: [],
    characterData: [],
    characterDataError: []
};

const getCharacterDataPending = (state) => ({
    ...state,
    isLoadingCharacterData: true
});

const getCharacterDataFail = (state, { payload: characterDataError }) => ({
    ...state,
    isLoadingCharacterData: false,
    characterDataError,
    characterData: Object.values(initialData)
});

const getCharacterDataSuccess = (state, { payload: characterData }) => ({
    ...state,
    isLoadingCharacterData: false,
    ...characterData
});

const characterDataReducer = handleActions(
    {
        [ACTION_TYPES.GET_CHARACTER_DATA_PENDING]: getCharacterDataPending,
        [ACTION_TYPES.GET_CHARACTER_DATA_FAIL]: getCharacterDataFail,
        [ACTION_TYPES.GET_CHARACTER_DATA_SUCCESS]: getCharacterDataSuccess

    },
    INITIAL_STATE);

export default characterDataReducer;