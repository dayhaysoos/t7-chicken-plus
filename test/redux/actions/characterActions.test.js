import * as characterActions from '../../../src/redux/actions/characterActions';


describe('characterActions', () => {
    it('creates an action to increment the move index', () => {
        const expectedAction = {
            type: 'character:INCREMENT_MOVE_INDEX',
        };

        expect(characterActions.incrementMoveIndex()).toEqual(expectedAction);
    });

    it('creates an action to decrement the move index', () => {
        const expectedAction = {
            type: 'character:DECREMENT_MOVE_INDEX',
        };

        expect(characterActions.decrementMoveIndex()).toEqual(expectedAction);
    });

    it('creates an action for updating the selected characters move state', () => {
        const moveList = [
            {
                notation: 'notation',
                speed: 'speed'
            }
        ];

        const expectedAction = {
            type: 'character:UPDATE_SELECTED_CHARACTER_MOVES',
            payload: moveList
        };

        expect(characterActions.updateSelectedCharacterMoves(moveList)).toEqual(expectedAction);
    });

    it('creates action for updating the selected character attack', () => {
        const moveData = {
            notation: 'notation',
            speed: 'speed',
            on_hit: 'on_hit'
        };

        const expectedAction = {
            type: 'character:UPDATE_MOVE_DATA',
            payload: moveData
        };

        expect(characterActions.updateMoveData(moveData)).toEqual(expectedAction);
    });
});
