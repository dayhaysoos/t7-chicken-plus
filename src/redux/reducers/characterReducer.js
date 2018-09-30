import _ from 'lodash';

import { handleActions } from 'redux-actions';
import { ACTION_TYPES } from '../actions/characterActions';

import { initialData } from '../../utils/initialData';

export const INITIAL_STATE = {
    isLoadingCharacterData: false,
    allCharacterData: [],
    //characterData: [],
    characterData: Object.values(initialData),
    characterDataError: [],
};

const getCharacterDataPending = state => ({
    ...state,
    isLoadingCharacterData: true,
});

const getCharacterDataFail = (state, { payload: characterDataError }) => ({
    ...state,
    isLoadingCharacterData: false,
    characterDataError,
    //characterData: Object.values(initialData),
});

const getCharacterDataSuccess = (state, { payload: characterData }) => ({
    ...state,
    isLoadingCharacterData: false,
    ...characterData,
});

const toggleCharacterStar = (state, { payload: label }) => ({
    ...state,
    characterData: state.characterData.map(char => {
        if (char.label === label) return { ...char, starred: !char.starred };

        return { ...char };
    }),
});

const rehydrate = (state, { payload: { characterData: PERSISTED_CHAR_DATA } }) => ({
    ..._.merge(state, PERSISTED_CHAR_DATA),
});

const characterDataReducer = handleActions(
    {
        ['persist/REHYDRATE']: rehydrate,

        [ACTION_TYPES.GET_CHARACTER_DATA_PENDING]: getCharacterDataPending,
        [ACTION_TYPES.GET_CHARACTER_DATA_FAIL]: getCharacterDataFail,
        [ACTION_TYPES.GET_CHARACTER_DATA_SUCCESS]: getCharacterDataSuccess,

        [ACTION_TYPES.TOGGLE_CHARACTER_STAR]: toggleCharacterStar,
    },
    INITIAL_STATE
);

export default characterDataReducer;
