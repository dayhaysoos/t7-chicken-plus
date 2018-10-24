import createSelector from 'selectorator';

export const getCharacterNames = createSelector(['characterData'], (characterData) => characterData.map(character => ({ key: character.name })));

export const getCharacterMoveList = createSelector(['characterData'], (characterData) => characterData.map(character => ({ [character.name]: character.data })));