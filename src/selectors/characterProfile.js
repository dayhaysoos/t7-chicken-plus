import createSelector from 'selectorator';
import * as filters from '../utils/filterFuncs';

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