import favoriteReducer from '../../../src/redux/reducers/favoriteReducer';
import * as favoriteActions from '../../../src/redux/actions/favoriteActions';

const INITIAL_STATE = favoriteReducer(undefined, {});

describe('Favorite Reducer', () => {

    it('returns the expected state', () => {
        const state = {
            characters: {},
            moves: {
                akuma: {},
                alisa: {},
                anna: {},
                armorking: {},
                asuka: {},
                bob: {},
                bryan: {},
                claudio: {},
                deviljin: {},
                dragunov: {},
                eddy: {},
                eliza: {},
                feng: {},
                geese: {},
                gigas: {},
                heihachi: {},
                hwoarang: {},
                jack: {},
                jin: {},
                josie: {},
                katarina: {},
                kazumi: {},
                kazuya: {},
                king: {},
                kuma: {},
                lars: {},
                law: {},
                lee: {},
                lei: {},
                leo: {},
                lili: {},
                luckychloe: {},
                masterraven: {},
                marduk: {},
                miguel: {},
                nina: {},
                noctis: {},
                panda: {},
                paul: {},
                shaheen: {},
                steve: {},
                xiaoyu: {},
                yoshimitsu: {}
            }
        };

        expect(INITIAL_STATE).toEqual(state);
    });
});

describe('toggleCharacterStar - adding starred character', () => {
    it('adds character name to character object in favorite reducer', () => {

        const result = favoriteReducer({ ...INITIAL_STATE }, favoriteActions.toggleCharacterStar('feng'));

        expect(result).toEqual({
            ...INITIAL_STATE,
            characters: {
                feng: true
            }
        });
    });
});

describe('toggleCharacterStar - removing starred character', () => {
    it('removes character name from character object in favorite reducer if the name is already there', () => {
        const newState = {
            ...INITIAL_STATE,
            characters: {
                feng: true
            }
        };
        const result = favoriteReducer({ ...newState }, favoriteActions.toggleCharacterStar('feng'));

        expect(result).toEqual({
            ...INITIAL_STATE,
            characters: {}
        });
    });
});

describe('toggleMoveStar - adding starred move', () => {
    it('adds character move to character name object', () => {
        const result = favoriteReducer({ ...INITIAL_STATE }, favoriteActions.toggleMoveStar('feng_1'));

        expect(result).toEqual({
            ...INITIAL_STATE,
            moves: {
                ...INITIAL_STATE.moves,
                feng: {
                    feng_1: true
                }
            }
        });
    });
});


describe('toggleMoveStar - adding starred move', () => {
    it('adds character move to character name object', () => {
        const result = favoriteReducer({ ...INITIAL_STATE }, favoriteActions.toggleMoveStar('feng_1'));

        expect(result).toEqual({
            ...INITIAL_STATE,
            moves: {
                ...INITIAL_STATE.moves,
                feng: {
                    feng_1: true
                }
            }
        });
    });

    it('removes character move from character name object', () => {
        const newState = {
            ...INITIAL_STATE,
            moves: {
                ...INITIAL_STATE.moves,
                feng: {
                    feng_1: true
                }
            }
        };
        const result = favoriteReducer({ ...newState }, favoriteActions.toggleMoveStar('feng_1'));

        expect(result).toEqual({
            ...INITIAL_STATE
        });
    });
});