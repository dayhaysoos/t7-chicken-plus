import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const StarIcon = styled(FontAwesomeIcon)`
    color: #FF412C
    font-size: 30;
    margin-right: 15;
    margin-top: 10;
`;

const StarWrapper = ({ onStarPress, favorite }) => (
    <TouchableHighlight onPress={onStarPress}>
        {/* <StarIcon color='#FF412C'  icon={ favorite ? ['fas', 'fa-star'] : ['far', 'fa-star']} /> */}
        <FontAwesomeIcon size={36} color='#FF412C' icon={favorite ? 'star' : ['far', 'star']} />
    </TouchableHighlight>
);

StarWrapper.propTypes = {
    onStarPress: PropTypes.func,
    favorite: PropTypes.bool
};

export default StarWrapper;