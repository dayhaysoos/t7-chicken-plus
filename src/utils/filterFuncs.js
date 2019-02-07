import {
    HIT_LEVEL_FILTER,
    CRUSH_FILTER,
} from '../constants/filters';

// hit level filters
const filterHighs = (moves) => moves.filter(move => move.hit_level.includes('h'));
const filterLows = (moves) => moves.filter(move => move.hit_level.includes('l'));
const filterMids = (moves) => moves.filter(move => move.hit_level.includes('m'));

export const hit_level = {
    // label = category you are filtering for. The Accordion Header
    label: 'Hit Level',
    // filterProperty = the actual property used for category
    filterProperty: 'hit_level',
    filters: {
        // Object with props needed to render elements
        [HIT_LEVEL_FILTER.FILTER_HIGH]: {
            //function associated with filter Type
            filterFunction: filterHighs,
            //Inner Accordion Label
            filterLabel: 'High',
            //Filter Type for mapping to this specific object
            filterType: HIT_LEVEL_FILTER.FILTER_HIGH,
        },
        [HIT_LEVEL_FILTER.FILTER_MID]: {
            filterFunction: filterMids,
            filterLabel: 'Mid',
            filterType: HIT_LEVEL_FILTER.FILTER_MID,
        },
        [HIT_LEVEL_FILTER.FILTER_LOW]: {
            filterFunction: filterLows,
            filterLabel: 'Low',
            filterType: HIT_LEVEL_FILTER.FILTER_LOW,
        },
    }
};

// crush filters
const filterHighCrush = (moves) => moves.filter(move => move.crush.includes('H'));
const filterLowCrush = (moves) => moves.filter(move => move.crush.includes('L'));
const filterAllCrush = (moves) => moves.filter(move => move.crush.includes('A'));

export const crush = {
    label: 'Crush',
    filterProperty: 'crush',
    filters: {
        [CRUSH_FILTER.FILTER_HIGH_CRUSH]: {
            filterFunction: filterHighCrush,
            filterLabel: 'High Crush',
            filterType: CRUSH_FILTER.FILTER_HIGH_CRUSH
        },
        [CRUSH_FILTER.FILTER_LOW_CRUSH]: {
            filterFunction: filterLowCrush,
            filterLabel: 'Low Crush',
            filterType: CRUSH_FILTER.FILTER_LOW_CRUSH
        },
        [CRUSH_FILTER.FILTER_ALL_CRUSH]: {
            filterFunction: filterAllCrush,
            filterLabel: 'All Crush',
            filterType: CRUSH_FILTER.FILTER_ALL_CRUSH
        }
    }
};

const filters = [
    hit_level,
    crush
];

export default filters;