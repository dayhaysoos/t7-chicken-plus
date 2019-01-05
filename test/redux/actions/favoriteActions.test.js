import * as favoriteActions from '../../../src/redux/actions/favoriteActions';

describe('Favorite actions', () => {
    it('creates an action for toggling a character star', () => {
        const label = 'fengwei';

        const expectedActions = {
            type: 'favorite:TOGGLE_CHARACTER_STAR',
            payload: label
        };

        expect(favoriteActions.toggleCharacterStar('fengwei')).toEqual(expectedActions);
    });

    it('creates an action for toggling a character move star', () => {
        const moveId = 'akuma_1';

        const expectedActions = {
            type: 'favorite:TOGGLE_MOVE_STAR',
            payload: moveId
        };

        expect(favoriteActions.toggleMoveStar(moveId)).toEqual(expectedActions);
    });
});