import createSelector from 'selectorator';

export const getCharacterNames = createSelector(['characterData'], (characterData) => characterData.map(character => ({ key: character.name })));

export const getCharacterMoveList = createSelector(['characterData'], (characterData) => characterData.map(character => ({ [character.name]: character.data })));

export const getFavoriteCharacters = createSelector(
    ['characterData.characterData', 'favorites'],
    (characterData, favorites) => {

        const favLabels = Object.keys(favorites.characters);

        return characterData.map(character => {
            const newChar = {
                [character.name]: character.data,
                name: character.name,
                label: character.label,
                favorite: false,
            };

            const isFavorite = favLabels.includes(character.label);

            if (isFavorite) {
                newChar.favorite = true;
            }

            return newChar;
        });

    }
);
