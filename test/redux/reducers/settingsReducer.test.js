import settingsReducer from '../../../src/redux/reducers/settingsReducer';
import * as settingsActions from '../../../src/redux/actions/settingsActions';

const INITIAL_STATE = settingsReducer(undefined, {});

describe('Settings Reducer', () => {
    it('properly returns state', () => {
        const state = {
            listView: true
        };

        expect(state).toEqual(INITIAL_STATE);
    });

    it('properly changes listView to false', () => {

        const state = {
            listView: true
        };

        const result = settingsReducer({ ...state }, settingsActions.toggleListView());

        expect(result).toEqual({
            ...INITIAL_STATE,
            listView: false
        });
    });

    it('properly changes listView to true', () => {

        const state = {
            listView: false
        };

        const result = settingsReducer({ ...state }, settingsActions.toggleListView());

        expect(result).toEqual({
            ...INITIAL_STATE,
            listView: true
        });
    });

});