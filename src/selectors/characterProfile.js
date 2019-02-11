import createSelector from 'selectorator';
import * as filters from '../utils/filterFuncs';

/**
 * @function filterMoves
 * @description filter attacks against active filter array
 * @param {Array<Object>} characterMoves 
 * @param {Array<Object>} activeFilters 
 * @returns filtered attacks
 */
export const filterMoves = (characterMoves, activeFilters) => {

    if (activeFilters.length === 0) {
        return characterMoves;
    } else {
        return activeFilters.reduce((activeFilters, currentFilter) => {
            const { filterProperty, filterType } = currentFilter;
            return filters[filterProperty].filters[filterType].filterFunction(characterMoves, filterProperty);
        }, []);
    }
};

const normalizedString = (move) => move.toLowerCase().replace(/[^\w~]/gi, '');

export const searchMoves = (characterMoves, input) => {
    input = normalizedString(input);

    return characterMoves.filter(move => normalizedString(move.notation).includes(input));
};