import characterReducer from '../../../src/redux/reducers';
import * as characterActions from '../../../src/redux/actions/characterActions';

const INITIAL_STATE = characterReducer(undefined, {}).characterData;

describe('Character Reducers', () => {
    it('returns the initial state', () => {

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

        const state = {
            selectedCharacterMoves: {
                some_move: 'an attack'
            }
        };

        const result = characterReducer(
            {
                characterData: {
                    ...INITIAL_STATE,
                    selectedCharacterMoves: {
                        some_move: 'an attack'
                    }
                }
            },
            characterActions.updateMoveData('some_move')
        ).characterData;

        expect(result).toEqual({
            ...INITIAL_STATE,
            currentAttack: moveId,
            selectedCharacterMoves: {
                some_move: 'an attack',
            },
            moveData: state.selectedCharacterMoves[moveId]
        });
    });

    it('updates the selectedCharacterMovelist state with the movelist of selected character', () => {

        const updateSelectedCharacterMovesAction = characterActions.updateSelectedCharacterMoves;

        const state = {
            characterData: {
                akuma: {
                    movelist: [{
                        speed: 'speed',
                        notation: 'notation'
                    }]
                }
            }
        };

        const selectedCharacterMoves = [{
            speed: 'speed',
            notation: 'notation',
        }];

        const result = characterReducer({}, updateSelectedCharacterMovesAction(selectedCharacterMoves)).characterData;

        expect(result).toEqual({
            ...INITIAL_STATE,
            selectedCharacterMoves
        });
    });

    it('properly incremements move attack', () => {
        const state = {
            ...INITIAL_STATE,
            currentAttack: 'akuma_22',
            selectedCharacterMoves: {
                akuma: {
                    akuma_23: 'test'
                }
            }
        };

        const incrementMoveIndex = characterActions.incrementMoveIndex;
        const result = characterReducer({ characterData: state }, incrementMoveIndex()).characterData;

        const currentAttackNumber = parseInt(state.currentAttack.split('_')[1]);
        const currentAttackCharacter = state.currentAttack.split('_')[0];

        expect(result).toEqual({
            ...INITIAL_STATE,
            currentAttack: `${currentAttackCharacter}_${currentAttackNumber + 1}`,
            moveData: state.selectedCharacterMoves[`${currentAttackCharacter}_${currentAttackNumber + 1}`],
            selectedCharacterMoves: {
                akuma: {
                    akuma_23: 'test'
                }
            }
        });
    });

    it('properly decrements move attack', () => {
        const state = {
            ...INITIAL_STATE,
            currentAttack: 'akuma_22',
            selectedCharacterMoves: {
                akuma: {
                    akuma_21: 'test'
                }
            }
        };

        const decrementMoveIndex = characterActions.decrementMoveIndex;
        const result = characterReducer({ characterData: state }, decrementMoveIndex()).characterData;

        const currentAttackNumber = parseInt(state.currentAttack.split('_')[1]);
        const currentAttackCharacter = state.currentAttack.split('_')[0];

        expect(result).toEqual({
            ...INITIAL_STATE,
            currentAttack: `${currentAttackCharacter}_${currentAttackNumber - 1}`,
            moveData: state.selectedCharacterMoves[`${currentAttackCharacter}_${currentAttackNumber - 1}`],
            selectedCharacterMoves: {
                akuma: {
                    akuma_21: 'test'
                }
            }
        });
    });
});
