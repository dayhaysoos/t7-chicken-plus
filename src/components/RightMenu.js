import React from 'react';
import FilterMenu from './FilterMenu';
import Legend from './Legend';


const RightMenu = ({activeItemKey}) => (
    activeItemKey === 'CharacterProfile' ? <FilterMenu /> : <Legend />
);

export default RightMenu;

