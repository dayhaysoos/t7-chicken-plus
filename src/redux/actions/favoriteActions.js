import { createAction } from 'redux-actions';
import createConstants from 'namespace-constants';

export const ACTION_TYPES = createConstants('favorite', [
    'TOGGLE_CHARACTER_STAR',
    'TOGGLE_MOVE_STAR'
]);

export const toggleCharacterStar = createAction(ACTION_TYPES.TOGGLE_CHARACTER_STAR);

export const toggleMoveStar = createAction(ACTION_TYPES.TOGGLE_MOVE_STAR);
