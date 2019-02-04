import {
    HIT_LEVEL_FILTER
} from '../constants/filters';

const filterHighs = (moves) => moves.filter(move => move.hit_level.includes('h'));
const filterLows = (moves) => moves.filter(move => move.hit_level.includes('l'));
const filterMids = (moves) => moves.filter(move => move.hit_level.includes('m'));

export const hit_level = {
    label: 'Hit Level',
    filterProperty: 'hit_level',
    filters: {
        [HIT_LEVEL_FILTER.FILTER_HIGH]: {
            filterFunction: filterHighs,
            filterLabel: 'High',
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

const filters = [
    hit_level,
];

export default filters;