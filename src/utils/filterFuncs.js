import {
    HIT_LEVEL_FILTER,
    CRUSH_FILTER,
    ON_BLOCK_FILTER,
    ON_HIT_FILTER,
    SPEED_FILTER,
    GIF_FILTER
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
const filterHighCrush = (moves) => moves.filter(move => move.crush.includes('h'));
const filterMidCrush = (moves) => moves.filter(move => move.crush.includes('m'));
const filterLowCrush = (moves) => moves.filter(move => move.crush.includes('l'));
const filterAllCrush = (moves) => moves.filter(move => move.crush.includes('a'));

export const crush = {
    label: 'Crush',
    filterProperty: 'crush',
    filters: {
        [CRUSH_FILTER.FILTER_HIGH_CRUSH]: {
            filterFunction: filterHighCrush,
            filterLabel: 'High Crush',
            filterType: CRUSH_FILTER.FILTER_HIGH_CRUSH
        },
        [CRUSH_FILTER.FILTER_MID_CRUSH]: {
            filterFunction: filterMidCrush,
            filterLabel: 'Mid Crush',
            filterType: CRUSH_FILTER.FILTER_MID_CRUSH
        },
        [CRUSH_FILTER.FILTER_LOW_CRUSH]: {
            filterFunction: filterLowCrush,
            filterLabel: 'Low Crush',
            filterType: CRUSH_FILTER.FILTER_LOW_CRUSH
        },
        // [CRUSH_FILTER.FILTER_ALL_CRUSH]: {
        //     filterFunction: filterAllCrush,
        //     filterLabel: 'All Crush',
        //     filterType: CRUSH_FILTER.FILTER_ALL_CRUSH
        // }
    }
};

// on_block filters
const filterAllPlusOnBlock = (moves) => moves.filter(move => move.on_block.includes('+'));
const filterAllNegativeOnBlock = (moves) => moves.filter(move => parseInt(move.on_block) > -10);
const filterAllPunishableOnBlock = moves => moves.filter(move => parseInt(move.on_block) <= -10);
const filterAllNeutralOnBlock = moves => moves.filter(move => parseInt(move.on_block) === 0);


export const on_block = {
    label: 'On Block',
    filterProperty: 'on_block',
    filters: {
        [ON_BLOCK_FILTER.FILTER_ALL_PLUS_ON_BLOCK]: {
            filterFunction: filterAllPlusOnBlock,
            filterLabel: 'All + On Block',
            filterType: ON_BLOCK_FILTER.FILTER_ALL_PLUS_ON_BLOCK
        },
        [ON_BLOCK_FILTER.FILTER_ALL_NEGATIVE_ON_BLOCK]: {
            filterFunction: filterAllNegativeOnBlock,
            filterLabel: 'All - On Block (Safe)',
            filterType: ON_BLOCK_FILTER.FILTER_ALL_NEGATIVE_ON_BLOCK
        },
        [ON_BLOCK_FILTER.FILTER_ALL_PUNISHABLE_ON_BLOCK]: {
            filterFunction: filterAllPunishableOnBlock,
            filterLabel: 'All Punishable On Block',
            filterType: ON_BLOCK_FILTER.FILTER_ALL_PUNISHABLE_ON_BLOCK
        },
        [ON_BLOCK_FILTER.FILTER_ALL_NEUTRAL_ON_BLOCK]: {
            filterFunction: filterAllNeutralOnBlock,
            filterLabel: 'Neutral On Block',
            filterType: ON_BLOCK_FILTER.FILTER_ALL_NEUTRAL_ON_BLOCK
        }
    }
};

// on_hit filters
const filterAllPlusOnHit = (moves) => moves.filter(move => move.on_hit.includes('+'));
const filterAllNegativeOnHit = (moves) => moves.filter(move => parseInt(move.on_hit) < 0);
const filterAllNeutralOnHit = moves => moves.filter(move => parseInt(move.on_hit) === 0);


export const on_hit = {
    label: 'On Hit',
    filterProperty: 'on_hit',
    filters: {
        [ON_HIT_FILTER.FILTER_ALL_PLUS_ON_HIT]: {
            filterFunction: filterAllPlusOnHit,
            filterLabel: 'All + On Hit',
            filterType: ON_HIT_FILTER.FILTER_ALL_PLUS_ON_HIT
        },
        [ON_HIT_FILTER.FILTER_ALL_NEGATIVE_ON_HIT]: {
            filterFunction: filterAllNegativeOnHit,
            filterLabel: 'All - On Hit (Safe)',
            filterType: ON_HIT_FILTER.FILTER_ALL_NEGATIVE_ON_HIT
        },
        [ON_HIT_FILTER.FILTER_ALL_NEUTRAL_ON_HIT]: {
            filterFunction: filterAllNeutralOnHit,
            filterLabel: 'Neutral On Hit',
            filterType: ON_HIT_FILTER.FILTER_ALL_NEUTRAL_ON_HIT
        }
    }
};

// speed filters
const filter10FrameAttacks = moves => moves.filter(move => parseInt(move.speed) === 10);
const filter11FrameAttacks = moves => moves.filter(move => parseInt(move.speed) === 11);
const filter12FrameAttacks = moves => moves.filter(move => parseInt(move.speed) === 12);
const filter13FrameAttacks = moves => moves.filter(move => parseInt(move.speed) === 13);
export const filter14FrameAttacks = moves => moves.filter(move => parseInt(move.speed) === 14);
const filter15FrameAttacks = moves => moves.filter(move => parseInt(move.speed) === 15);
const filter16FrameAttacks = moves => moves.filter(move => parseInt(move.speed) === 16);

export const speed = {
    label: 'Speed',
    filterProperty: 'speed',
    filters: {
        [SPEED_FILTER.FILTER_10_FRAME_ATTACKS]: {
            filterFunction: filter10FrameAttacks,
            filterLabel: '10 Frame Attacks',
            filterType: SPEED_FILTER.FILTER_10_FRAME_ATTACKS
        },
        [SPEED_FILTER.FILTER_11_FRAME_ATTACKS]: {
            filterFunction: filter11FrameAttacks,
            filterLabel: '11 Frame Attacks',
            filterType: SPEED_FILTER.FILTER_11_FRAME_ATTACKS
        },
        [SPEED_FILTER.FILTER_12_FRAME_ATTACKS]: {
            filterFunction: filter12FrameAttacks,
            filterLabel: '12 Frame Attacks',
            filterType: SPEED_FILTER.FILTER_12_FRAME_ATTACKS
        },
        [SPEED_FILTER.FILTER_13_FRAME_ATTACKS]: {
            filterFunction: filter13FrameAttacks,
            filterLabel: '13 Frame Attacks',
            filterType: SPEED_FILTER.FILTER_13_FRAME_ATTACKS
        },
        [SPEED_FILTER.FILTER_14_FRAME_ATTACKS]: {
            filterFunction: filter14FrameAttacks,
            filterLabel: '14 Frame Attacks',
            filterType: SPEED_FILTER.FILTER_14_FRAME_ATTACKS
        },
        [SPEED_FILTER.FILTER_15_FRAME_ATTACKS]: {
            filterFunction: filter15FrameAttacks,
            filterLabel: '15 Frame Attacks',
            filterType: SPEED_FILTER.FILTER_15_FRAME_ATTACKS
        },
        [SPEED_FILTER.FILTER_16_FRAME_ATTACKS]: {
            filterFunction: filter16FrameAttacks,
            filterLabel: '16 Frame Attacks',
            filterType: SPEED_FILTER.FILTER_16_FRAME_ATTACKS
        },
    }
};

//gif filters
const filterGifs = moves => moves.filter(move => move.preview_url);
const filterNoGifs = moves => moves.filter(move => !move.preview_url);

export const preview_url = {
    label: 'Has Gif',
    filterProperty: 'preview_url',
    filters: {
        [GIF_FILTER.HAS_GIF]: {
            filterFunction: filterGifs,
            filterLabel: 'Has Gif',
            filterType: GIF_FILTER.HAS_GIF,
        },
        [GIF_FILTER.HAS_NO_GIF]: {
            filterFunction: filterNoGifs,
            filterLabel: 'Doesn\'t have Gif',
            filterType: GIF_FILTER.HAS_NO_GIF,
        },
    }
};

const filters = [
    speed,
    on_block,
    on_hit,
    hit_level,
    crush,
    preview_url
];

export default filters;