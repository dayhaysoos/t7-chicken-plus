import { createAction } from 'redux-actions';
import createConstants from 'namespace-constants';

const ACTION_TYPES = createConstants('payment', [
    'HAS_USER_PAID'
])

export const hasUserPaid = createAction(ACTION_TYPES.HAS_USER_PAID)