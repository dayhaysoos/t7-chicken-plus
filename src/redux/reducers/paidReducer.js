import { handleActions } from 'redux-actions';
import { ACTION_TYPES } from '../actions/paidActions';

export const INITIAL_STATE  = {
    purchaseHistory: {},
    isLoadingPurchaseHistory: false,
    purchaseHistoryError: {},
    hasPaid: false,
};


export const getPurchaseHistorySuccess = (state, {payload: purchaseHistory}) => ({
    purchaseHistory,
    hasPaid: purchaseHistory.length !== 0,
    isLoadingPurchaseHistory: false,
});

export const getPurchaseHistoryPending = (state, {payload: purchaseHistory}) => ({
    purchaseHistory,
    isLoadingPurchaseHistory: true,
});

export const getPurchaseHistoryFail = (state, {payload: error}) => ({
    purchaseHistoryError: error,
    isLoadingPurchaseHistory: false,
});

const paidReducer = handleActions(
    {
        [ACTION_TYPES.GET_PURCHASE_HISTORY_PENDING]: getPurchaseHistoryPending,
        [ACTION_TYPES.GET_PURCHASE_HISTORY_FAIL]: getPurchaseHistoryFail,
        [ACTION_TYPES.GET_PURCHASE_HISTORY_SUCCESS]: getPurchaseHistorySuccess,
    },
    INITIAL_STATE);

export default paidReducer;