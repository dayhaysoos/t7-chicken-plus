import createSelector from 'selectorator';

export const getCharacterNames = createSelector(['characterData'], (characterData) => {
    console.log('characterData', characterData);
    return characterData.map(character => ({ key: character.name }));
});

export const getCharacterMoveList = createSelector(['characterData'], (characterData) => {
    console.log('characterData');
    return characterData.map(character => ({ [character.name]: character.data }));
});