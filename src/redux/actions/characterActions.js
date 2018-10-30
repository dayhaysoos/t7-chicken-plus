import { createAction } from 'redux-actions';

import createConstants from 'namespace-constants';

import * as characterApi from '../apis/characterApi';

export const ACTION_TYPES = createConstants('character:character', [
    'GET_CHARACTER_DATA_PENDING',
    'GET_CHARACTER_DATA_FAIL',
    'GET_CHARACTER_DATA_SUCCESS'
]);

export const getCharacterDataPending = createAction(ACTION_TYPES.GET_CHARACTER_DATA_PENDING);
export const getCharacterDataFail = createAction(ACTION_TYPES.GET_CHARACTER_DATA_FAIL);
export const getCharacterDataSuccess = createAction(ACTION_TYPES.GET_CHARACTER_DATA_SUCCESS);

export const getCharacterData = () => async dispatch => {
    dispatch(getCharacterDataPending());

    try {
        const data = await characterApi.getFrameData();

        dispatch(getCharacterDataSuccess(data));
    }
    catch (error) {
        dispatch(getCharacterDataFail(error));
    }
};