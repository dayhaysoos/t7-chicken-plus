import { handleActions } from 'redux-actions';
import { ACTION_TYPES } from '../actions/paymentActions';

export const INITIAL_STATE = {
    hasUserPaid: false,
}

const hasUserPaid = (state) => {
    return {
        ...state,
        hasUserPaid: true
    }
}

const paymentReducer = handleActions(
    {
        [ACTION_TYPES.HAS_USER_PAID]: hasUserPaid
    },
    INITIAL_STATE);

export default paymentReducer;