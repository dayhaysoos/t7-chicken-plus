import * as settingsActions from '../../../src/redux/actions/settingsActions';

describe('Settings', () => {
    it('creates action for toggling different view modes', () => {
        const listView = true;

        const expectedAction = {
            type: 'settings:TOGGLE_VIEW',
            payload: listView,
        };

        expect(settingsActions.toggleListView(listView)).toEqual(expectedAction);
    });
});