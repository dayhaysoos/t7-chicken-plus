import { createAction } from 'redux-actions';

import createConstants from 'namespace-constants';

import * as characterApi from '../apis/characterApi';

export const ACTION_TYPES = createConstants('character', [
    'GET_CHARACTER_DATA_PENDING',
    'GET_CHARACTER_DATA_FAIL',
    'GET_CHARACTER_DATA_SUCCESS',
    'UPDATE_MOVE_DATA',
    'UPDATE_SELECTED_CHARACTER_MOVES',
    'INCREMENT_MOVE_INDEX',
    'DECREMENT_MOVE_INDEX',
]);

export const getCharacterDataPending = createAction(ACTION_TYPES.GET_CHARACTER_DATA_PENDING);
export const getCharacterDataFail = createAction(ACTION_TYPES.GET_CHARACTER_DATA_FAIL);
export const getCharacterDataSuccess = createAction(ACTION_TYPES.GET_CHARACTER_DATA_SUCCESS);

/**
 * @function getCharacterData
 * @description fetch character data, default to local if failed
 * @returns {Object} action
 */
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

/**
 * @function updateMoveData
 * @description updates move data state for specific character
 * @returns {Object} action
 */
export const updateMoveData = createAction(ACTION_TYPES.UPDATE_MOVE_DATA);

/**
 * 
 */
export const updateSelectedCharacterMoves = createAction(ACTION_TYPES.UPDATE_SELECTED_CHARACTER_MOVES);

export const incrementMoveIndex = createAction(ACTION_TYPES.INCREMENT_MOVE_INDEX);

export const decrementMoveIndex = createAction(ACTION_TYPES.DECREMENT_MOVE_INDEX);

