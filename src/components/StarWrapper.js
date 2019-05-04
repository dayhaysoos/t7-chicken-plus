import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import FontAwesome, { Icons } from 'react-native-fontawesome';

const StarIcon = styled(FontAwesome)`
    color: #FF412C
    font-size: 30;
    margin-right: 15;
    margin-top: 10;
`;

const StarWrapper = ({ onStarPress, favorite }) => (
    <TouchableHighlight onPress={onStarPress}>
        <StarIcon >{favorite ? Icons.star : Icons.starO}</StarIcon>
    </TouchableHighlight>
);

StarWrapper.propTypes = {
    onStarPress: PropTypes.func,
    favorite: PropTypes.bool
};

export default StarWrapper;