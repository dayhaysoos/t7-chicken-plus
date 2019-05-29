import { createAction } from 'redux-actions';

import createConstants from 'namespace-constants';

import RNIap from 'react-native-iap';

export const ACTION_TYPES = createConstants([
    'GET_PURCHASE_HISTORY_PENDING',
    'GET_PURCHASE_HISTORY_FAIL',
    'GET_PURCHASE_HISTORY_SUCCESS',
]);

export const getPurchaseHistoryPending = createAction(ACTION_TYPES.GET_PURCHASE_HISTORY_PENDING);
export const getPurchaseHistoryFail = createAction(ACTION_TYPES.GET_PURCHASE_HISTORY_FAIL);
export const getPurchaseHistorySuccess = createAction(ACTION_TYPES.GET_PURCHASE_HISTORY_SUCCESS);

export const getPurchaseHistory = () => async (dispatch) => {
    dispatch(getPurchaseHistoryPending());

    try {
        const purchaseHistory = await RNIap.getPurchaseHistory();
        dispatch(getPurchaseHistorySuccess(purchaseHistory));
    }
    catch(error) {
        dispatch(getPurchaseHistoryFail(error));
    }
};