import characterReducer from '../../../src/redux/reducers';
import * as characterActions from '../../../src/redux/actions/characterActions';

describe('Character Reducers', () => {
    it('returns the initial state', () => {
        const INITIAL_STATE = characterReducer(undefined, {}).characterData;

        const state = {
            isLoadingCharacterData: false,
            allCharacterData: [],
            characterData: [],
            characterDataError: [],
            selectedCharacterMoves: {},
            moveData: [],
            currentAttack: null,
        };

        expect(INITIAL_STATE).toEqual(state);

    });
    it('updates the moveId and moveData states correctly', () => {

        const moveId = 'some_move';

        const INITIAL_STATE = characterReducer(
            {
                characterData: {
                    selectedCharacterMoves: {
                        some_move: 'an attack'
                    }
                }
            },
            characterActions.updateMoveData('some_move')
        ).characterData;

        const state = {
            selectedCharacterMoves: {
                some_move: 'an attack'
            }
        };

        expect(INITIAL_STATE).toEqual({
            ...INITIAL_STATE,
            currentAttack: moveId,
            moveData: state.selectedCharacterMoves[moveId]
        });
    });
});
