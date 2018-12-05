import createSelector from 'selectorator';

export const getCharacterNames = createSelector(['characterData'], (characterData) => characterData.map(character => ({ key: character.displayName })));

export const getCharacterMoveList = createSelector(['characterData'], (characterData) => characterData.map(character => ({ [character.label]: character.moveList })));

export const getFavoriteCharacters = createSelector(
    ['characterData.characterData', 'favorites'],
    (characterData, favorites) => {

        const favLabels = Object.keys(favorites.characters);

        return characterData.map(character => {
            const newChar = {
                //[character.name]: character.data,
                moveList: character.movelist,
                name: character.displayName,
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

const getStarredMoveIDsForALabel = createSelector(['moves', 'label'],
    (moves, label) => {
        console.log('here');
        return moves[label];
    }
);

export const getFavoriteMoves = createSelector(
    [getStarredMoveIDsForALabel, 'moveList'],
    (starredIDs, moveList) => {
        console.log('here - - - -');
        const ids = Object.keys(starredIDs);

        return moveList.map(move => {
            const newMove = {...move, favorite: false};

            if(ids.includes(move.id)) {
                newMove.favorite = true;
            }
            return newMove;
        });
    }
);
