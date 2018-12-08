const filterHighs = (moves) => moves.filter(move => move.hit_level.includes('h'));
const filterLows = (moves) => moves.filter(move => move.hit_level.includes('l'));
const filterMids = (moves) => moves.filter(move => move.hit_level.includes('m'));

export default (moves, filters) => {
    const {hitLevel: {high, mid, low}} = filters;
    const {onBlock} = filters;


    let final = [...moves];

    if(high)
        final = filterHighs(final);

    if(mid)
        final = filterMids(final);


    if (low)
        final = filterLows(final);

    if (onBlock.active) {
        if (onBlock.operator === '<') {
            final = final.filter(move => Number(move.on_block) <= Number( filters.onBlock.value));
        }
        else if (onBlock.operator === '>') {
            final = final.filter(move => Number(move.on_block) >= Number(filters.onBlock.value));
        }
        else
            final = final.filter(move => Number(move.on_block) === Number(filters.onBlock.value));
    }

    return final;
};
