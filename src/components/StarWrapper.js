import React from 'react';
import { TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import FontAwesome, { Icons } from 'react-native-fontawesome';

const StarIcon = styled(FontAwesome)`
    color: red;
    font-size: 30;
    margin-right: 15;
    margin-top: 10;
`;

const StarWrapper = ({ onStarPress, favorite }) => (
    <TouchableHighlight onPress={onStarPress}>
        <StarIcon >{favorite ? Icons.star : Icons.starO}</StarIcon>
    </TouchableHighlight>
);

export default StarWrapper;