import createSelector from 'selectorator';

export const getCharacterNames = createSelector(['characterData'], (characterData) => characterData.map(character => ({ key: character.displayName })));

//const indexMoveById = createSelector(['movelist'], (movelist) => movelist.map(move => ({ [move.id]: { ...move } })));

const indexMoveById = createSelector(['movelist'], (movelist) => movelist.reduce((result, move) => ({ ...result, [move.id]: move }), {}));

export const getCharacterMoveList = createSelector(['characterData'], (characterData) => characterData.map(character => {
    const movelist = indexMoveById(character);
    return {
        displayName: character.displayName,
        moveList: movelist,
        label: character.label
    };
}));


export const getFavoriteCharacters = createSelector(
    ['characterData', 'favorites'],
    (characterData, favorites) => {

        const favLabels = Object.keys(favorites.characters);

        return characterData.map(character => {
            const newChar = {
                displayName: character.displayName,
                label: character.label,
                favorite: false,
                moveList: character.moveList
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
    (moves, label) => moves[label]
);

export const getFavoriteMoves = createSelector(
    [getStarredMoveIDsForALabel, 'moveList'],
    (starredIDs, moveList) => {
        const ids = Object.keys(starredIDs);

        return Object.keys(moveList).map((move) => {
            const newMove = { ...moveList[move], favorite: false };

            console.log('starred', move);

            if (ids.includes(move)) {
                newMove.favorite = true;
            }
            return newMove;
        });
    }
);
