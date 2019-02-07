import { handleActions } from 'redux-actions';
import { ACTION_TYPES } from '../actions/filterActions';

export const INITIAL_STATE = {
    activeFilters: [],
};

/**
 * @function applyFilter
 * @description apply filter type to activeFilters array
 * @param {Object} state 
 * @param {String} filter filter type
 */
const applyFilter = (state, { payload: filter }) => ({
    ...state,
    activeFilters: [...state.activeFilters, filter]
});

/**
 * @function removeFilter
 * @description remove applied filter
 * @param {Object} state 
 * @param {Object} filter filter to be removed 
 */
const removeFilter = (state, { payload: filter }) => ({
    ...state,
    activeFilters: state.activeFilters.filter(activeFilter => activeFilter.filterType !== filter.filterType)
});

/**
 * @function resetFilters
 * @description 
 * @param {Object} state 
 */
const resetFilters = (state) => ({
    ...state,
    activeFilters: []
});
const filterReducer = handleActions(
    {
        [ACTION_TYPES.APPLY_FILTER]: applyFilter,
        [ACTION_TYPES.REMOVE_FILTER]: removeFilter,
        [ACTION_TYPES.RESET_FILTERS]: resetFilters
    },
    INITIAL_STATE
);

export default filterReducer;
